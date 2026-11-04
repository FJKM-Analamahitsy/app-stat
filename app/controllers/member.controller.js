const { object, string } = require("yup");
const { Member } = require("../models/member.model");
const { log } = require("./log.controller");
const parser = require("json2csv").Parser;
const path = require("path");
const fs = require("fs");
const csv2json = require("csvtojson");
const jwt = require("jsonwebtoken");

const memberInput = object({
  name: string().required(),
});

const idSchema = object({
  id: string().required(),
});

const createMember = async (req, res) => {
  try {
    const input = await memberInput.validate(req.body);
    const newMember = new Member({
      ...input,
      fullname: `${input.name}${input.forname ? ` ${input.forname}` : ""}`,
    });
    await newMember.save();
    if (input.familyId) {
      if (input.famHead) {
        await Member.updateMany(
          { familyId: input.familyId },
          { home: input.home, zone: input.zone, place: input.place },
        );
      } else {
        const adress = await Member.findOne({
          familyId: input.familyId,
          famHead: true,
        }).select("-_id home place");
        await Member.findOneAndUpdate({ _id: newMember._id }, { ...adress });
      }
    }
    log(req.requester, `creation member ${newMember._id}`);
    return res.send(newMember);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const deleteMember = async (req, res) => {
  try {
    const { id } = await idSchema.validate(req.body);
    const member = await Member.findOneAndDelete({ _id: id });
    log(req.requester, `delete member ${id}`);
    return res.send(member);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const updateMember = async (req, res) => {
  try {
    let input = req.body;
    if (input.name || input.forname) {
      input = {
        ...input,
        fullname: `${input.name}${input.forname ? ` ${input.forname}` : ""}`,
      };
    }
    await Member.findOneAndUpdate(
      { _id: req.params.id },
      {
        ...input,
        last_update: new Date(),
      },
    );
    if (input.familyId) {
      if (input.famHead) {
        await Member.updateMany(
          { familyId: input.familyId },
          { home: input.home, zone: input.zone, place: input.place },
        );
      } else {
        const adress = await Member.findOne({
          familyId: input.familyId,
          famHead: true,
        }).select("-_id home place");
        console.log(adress);
        await Member.findOneAndUpdate({ _id: req.params.id }, { ...adress });
      }
    }
    log(req.requester, `update member ${req.params.id}`);
    return res.send("sucess");
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getMember = async (req, res) => {
  try {
    const { id } = await idSchema.validate(req.params);
    const member = await Member.findOne({ _id: id });
    return res.send(member);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const listMember = async (req, res) => {
  const {
    page = 1,
    limit = 100,
    karatra,
    anarana,
    sampana,
    search,
    searchField,
    ankohonana,
    ondry,
    other,
    ...cfil
  } = req.query;
  let sort = {};
  if (karatra) {
    sort = { ...sort, mpandrayN: karatra };
  }

  if (ankohonana) {
    sort = { ...sort, familyId: ankohonana };
  }

  if (anarana) {
    sort = { ...sort, name: anarana };
  }
  let filter = { ...cfil };
  if (sampana) {
    filter = { ...filter, sampana: { $regex: new RegExp(sampana, "i") } };
  }

  if (other) {
    filter = { ...filter, other: { $exists: true } };
  }

  if (ondry) {
    filter = {
      ...filter,
      mpandray: "eny",
      sampana: { $not: new RegExp("DIAKONA|FLD", "i") },
    };
    sort = { ...sort, familyId: "asc" };
  }

  if (search) {
    if (searchField === "home") {
      filter = {
        ...filter,
        familyId: search,
      };
      sort = { familyId: "asc" };
    } else {
      filter = {
        ...filter,
        $or: [
          { fullname: { $regex: new RegExp(search, "i") } },
          { mpandrayN: { $regex: new RegExp(search, "i") } },
          { home: { $regex: new RegExp(search, "i") } },
          { phone: { $regex: new RegExp(search, "i") } },
        ],
      };
      sort = { mpandrayN: "asc" };
    }
  }
  const member = await Member.find()
    .sort({ ...sort })
    .collation({ locale: "en_US", numericOrdering: true })
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .where({ ...filter });
  const totalRow = await Member.where({ ...filter }).countDocuments();
  const tokatrano = await Member.distinct("familyId", {
    familyId: { $exists: true },
    ...filter,
  });
  return res.send({ member, totalRow, tokatrano: tokatrano.length });
};

const exportMembers = async (req, res) => {
  const { filter, fields, fileType } = req.body;
  let where = {};
  Object.entries(filter).forEach(([k, val]) => {
    if (val || val !== "") {
      if (k === "sampana") {
        where = { ...where, sampana: { $regex: new RegExp(val, "i") } };
      } else {
        where = { ...where, [k]: val };
      }
    }
  });
  const data = await Member.find().where({ ...where });

  if (fileType === "csv") {
    const opt = {
      fields,
      excelString: true,
      withBOM: true,
    };
    const prep = new parser(opt);
    const csv = prep.parse(data);
    res.header("Content-Type", "text/csv");
    return res.send(csv);
  } else {
    res.setHeader("Content-Type", "application/json");
    res.json(data);
  }
};

const importMembers = async (req, res) => {
  const file = req.file;
  if (!file) {
    return res.status(400).send("No file uploaded.");
  }
  try {
    const { action } = req.body;
    const filePath = path.join(__dirname, "../", file.path);
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const members =
      file.mimetype === "application/json"
        ? JSON.parse(fileContent)
        : await csv2json({
            ignoreEmpty: true,
            delimiter: [",", ";", "|"],
            colParser: {
              _id: "string",
              mpandrayN: "string",
              phone: "string",
              mpandrayAndiany: "string",
            },
            checkType: true,
          }).fromFile(filePath);
    if (action === "insert") {
      await Member.insertMany(members);
    } else {
      const bulkOps = members.map((member) => ({
        updateOne: {
          filter: { _id: member._id },
          update: { $set: { ...member } },
        },
      }));

      await Member.bulkWrite(bulkOps);
    }
    fs.unlinkSync(filePath);
    res.send();
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

const getFamily = async (req, res) => {
  const { id } = req.params;
  const result = await Member.find({ familyId: id })
    .sort("familyRank")
    .select("name fullname familyRank famHead");
  return res.send(result);
};

const getLastKaratra = async (req, res) => {
  const result = await Member.find()
    .sort({ mpandrayN: "desc" })
    .collation({ locale: "en_US", numericOrdering: true })
    .limit(1)
    .select("-_id mpandrayN");
  return res.json(result[0] ? +result[0].mpandrayN + 1 : 1);
};

const checkKaratra = async (req, res) => {
  const { num } = req.params;
  const result = await Member.where({ mpandrayN: num }).countDocuments();
  return res.json(result > 0);
};

// generate token for the qr code

const generateUserToken = async (req, res) => {
  const id = req.params.id;
  const member = await Member.where({ _id: id }).findOne();
  const token = jwt.sign(
    { username: member.fullname, id: member._id },
    process.env.PRIVATE_KEY,
  );
  return res.send({
    token,
  });
};

const getAllMemberToken = async (req, res) => {
  let filter = {
    sampana: { $regex: new RegExp("KATEKOMENA", "i") },
  };

  const result = [];
  const data = await Member.where({ ...filter })
    .collation({ locale: "en_US", numericOrdering: true })
    .sort({ mpandrayN: "asc" })
    .find();

  data.forEach((member) => {
    const token = jwt.sign(
      { username: member.fullname, id: member._id },
      process.env.PRIVATE_KEY,
    );
    result.push({
      token,
      fullname: member.fullname,
      mpandrayN: member.mpandrayN,
    });
  });
  res.send(result);
};

const getPhoneNumber = async (req, res) => {
  const { filter } = req.query;
  const filterArray = filter.split(" ");
  let filters = {};
  if (filter !== "" && filterArray.length > 0) {
    filters = { ...filters, sampana: new RegExp(filterArray.join("|"), "i") };
  }

  const result = await Member.where({
    ...filters,
    phone: { $exists: true, $ne: "" },
    status: true,
  })
    .find()
    .distinct("phone");
  return res.json(result);
};

module.exports = {
  createMember,
  deleteMember,
  updateMember,
  getMember,
  listMember,
  exportMembers,
  importMembers,
  getFamily,
  checkKaratra,
  getLastKaratra,
  generateUserToken,
  getAllMemberToken,
  getPhoneNumber,
};
