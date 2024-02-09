const { object, string } = require("yup");
const { Member } = require("../models/member.model");
const { log } = require("./log.controller");
const parser = require("json2csv").Parser;

const memberInput = object({
  name: string().required(),
});

const idSchema = object({
  id: string().required(),
});

const createMember = async (req, res) => {
  try {
    const input = await memberInput.validate(req.body);
    const newMember = new Member({ ...input });
    await newMember.save();
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
    const { id, ...body } = await idSchema.validate(req.body);
    await Member.findOneAndUpdate(
      { _id: id },
      { ...body, last_update: new Date() }
    );
    log(req.requester, `update member ${id}`);
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
  const { page = 1, limit = 10 } = req.query;
  const member = await Member.find()
    .limit(limit * 1)
    .skip((page - 1) * limit);
  const totalRow = await Member.countDocuments();
  return res.send({ member, totalRow });
};

const searchMember = async (req, res) => {
  const { q } = req.query;
  if (q === "") return res.send([]);
  const result = await Member.find({
    $or: [
      { name: { $regex: new RegExp(q, "i") } },
      { forname: { $regex: new RegExp(q, "i") } },
      { mpandrayN: { $regex: new RegExp(q, "i") } },
    ],
  }).limit(5);
  return res.send(result);
};

const statistics = async (req, res) => {
  const total = await Member.countDocuments();
  const lehilahy = await Member.find({ gender: "lehilahy" }).countDocuments();
  const vehivavy = await Member.find({ gender: "vehivavy" }).countDocuments();
  const mpandray = await Member.find({ mpandray: "eny" }).countDocuments();
  const batisa = await Member.find({ batisa: "eny" }).countDocuments();
  const avaratra = await Member.find({ place: "avaratra" }).countDocuments();
  const atsimo = await Member.find({ place: "atsimo" }).countDocuments();
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
  };
  res.send(stast);
};

const exportMembersToCsv = async (req, res) => {
  const data = await Member.find().select("-_id");
  const { filter } = req.query;
  const fields = [
    {
      label: "Anarana",
      value: "name",
    },
    {
      label: "Fanampiny",
      value: "forname",
    },
    {
      label: "L/V",
      value: "gender",
    },
    {
      label: "Karatra",
      value: "mpandrayN",
    },
    {
      label: "Taona nahaterahana",
      value: "birthday",
    },
    {
      label: "Toerana nahaterahana",
      value: "birthplace",
    },
    {
      label: "Adiresy",
      value: "home",
    },
    {
      label: "Tanana",
      value: "city",
    },
    {
      label: "Faritra",
      value: "place",
    },
    {
      label: "Asa",
      value: "job",
    },
    {
      label: "Talenta",
      value: "talent",
    },
    {
      label: "Telephone",
      value: "phone",
    },
    {
      label: "Email",
      value: "mail",
    },
    {
      label: "Facebook",
      value: "fb",
    },
    {
      label: "Fialamboly",
      value: "hobby",
    },
    {
      label: "Batisa",
      value: "batisa",
    },
    {
      label: "Taona batisa",
      value: "baptismYear",
    },
    {
      label: "Mpandray",
      value: "mpandray",
    },
    {
      label: "Mpandray andiany",
      value: "mpandrayAndiany",
    },
  ];
  const opt = {
    fields: fields.filter((el) => filter.includes(el.value)),
    excelString: true,
    withBOM: true,
  };
  const prep = new parser(opt);
  const csv = prep.parse(data);
  res.header("Content-Type", "text/csv");
  res.attachment("liste.csv");
  return res.send(csv);
};

module.exports = {
  createMember,
  deleteMember,
  updateMember,
  getMember,
  listMember,
  searchMember,
  exportMembersToCsv,
  statistics,
};
