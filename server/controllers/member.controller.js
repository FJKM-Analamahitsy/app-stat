const { object, string } = require("yup");
const { Member } = require("../models/member.model");
const { log } = require("./log.controller");
const parser = require("json2csv").Parser;
const path = require("path");
const fs = require("fs");
const csv2json = require("csvtojson");

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
    if (input.famHead && input.familyId) {
      await Member.updateMany(
        { familyId: input.familyId },
        { home: input.home, zone: input.zone, place: input.place }
      );
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
    const input = req.body;
    await Member.findOneAndUpdate(
      { _id: req.params.id },
      {
        ...input,
        fullname: `${input.name}${input.forname ? ` ${input.forname}` : ""}`,
        last_update: new Date(),
      }
    );
    if (input.famHead && input.familyId) {
      await Member.updateMany(
        { familyId: input.familyId },
        { home: input.home, zone: input.zone, place: input.place }
      );
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

const statistics = async (req, res) => {
  const total = await Member.countDocuments();
  const lehilahy = await Member.find({ gender: "lehilahy" }).countDocuments();
  const vehivavy = await Member.find({ gender: "vehivavy" }).countDocuments();
  const mpandray = await Member.find({ mpandray: "eny" }).countDocuments();
  const batisa = await Member.find({ baptism: "eny" }).countDocuments();
  const avaratra = await Member.find({ place: "avaratra" }).countDocuments();
  const atsimo = await Member.find({ place: "atsimo" }).countDocuments();
  const tokatrano = await Member.distinct("familyId", {
    familyId: { $exists: true },
  });
  const atsinanana = await Member.find({
    place: "atsinanana",
  }).countDocuments();
  const andrefana = await Member.find({ place: "andrefana" }).countDocuments();
  const stast = {
    lehilahy: {
      n: lehilahy,
      p: ((lehilahy / total) * 100).toFixed(0),
    },
    vehivavy: {
      n: vehivavy,
      p: ((vehivavy / total) * 100).toFixed(0),
    },
    mpandray: {
      n: mpandray,
      p: ((mpandray / total) * 100).toFixed(0),
    },
    batisa: {
      n: batisa,
      p: ((batisa / total) * 100).toFixed(0),
    },
    atsimo: {
      n: atsimo,
      p: ((atsimo / total) * 100).toFixed(0),
    },
    andrefana: {
      n: andrefana,
      p: ((andrefana / total) * 100).toFixed(0),
    },
    avaratra: {
      n: avaratra,
      p: ((avaratra / total) * 100).toFixed(0),
    },
    atsinanana: {
      n: atsinanana,
      p: ((atsinanana / total) * 100).toFixed(0),
    },
    tokatrano: tokatrano.length,
    total,
  };
  res.send(stast);
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

const statPerBirthMonth = async (req, res) => {
  const month = [
    "Janvier",
    "Fevrier",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Aout",
    "Septembre",
    "Octobre",
    "Novembre",
    "Decembre",
  ];
  let result = {};
  for (let i = 0; i < month.length; i++) {
    const m = month[i];
    const count = await Member.where({ birthday: m }).countDocuments();
    result = { ...result, [m]: count };
  }

  return res.json(result);
};

const statPerSampana = async (req, res) => {
  const sampana = [
    "AFA",
    "SAFIF",
    "AMA",
    "ANTEMA",
    "VODROM-BAVAKA",
    "MAINTIMOLALY",
    "SEKOLY_ALAHADY",
    "SFS",
    "SAMPATI",
    "SVM",
    "VFL",
    "AFF",
    "CENTRE_MEDICAL",
    "SLK",
    "STK_MOZIKA",
    "ENGLISH_CLUB",
    "VSMAM",
    "DORKASY",
    "FLD",
    "KATEKOMENA",
    "DIAKONA",
    "STK",
    "GMMC",
  ].sort();
  let result = {};
  for (let i = 0; i < sampana.length; i++) {
    const m = sampana[i];
    const count = await Member.where({
      sampana: { $regex: new RegExp(m, "i") },
    }).countDocuments();
    result = { ...result, [m]: count };
  }

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
  statistics,
  getFamily,
  checkKaratra,
  getLastKaratra,
  statPerBirthMonth,
  statPerSampana,
};
