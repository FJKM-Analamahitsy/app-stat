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
    const newMember = new Member({
      ...input,
      fullname: `${input.name}${input.forname ? ` ${input.forname}` : ""}`,
    });
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
    const input = await memberInput.validate(req.body);
    await Member.findOneAndUpdate(
      { _id: req.params.id },
      {
        ...input,
        fullname: `${input.name}${input.forname ? ` ${input.forname}` : ""}`,
        last_update: new Date(),
      }
    );
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
    let result = { ...member._doc };
    if (member.familyRank !== 1) {
      const adress = await Member.findOne({
        familyId: member.familyId,
        familyRank: 1,
      }).select("-_id home place");
      if (adress) {
        result = { ...result, ...adress._doc };
      }
    }
    return res.send(result);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const listMember = async (req, res) => {
  const {
    page = 1,
    limit = 10,
    karatra,
    anarana,
    sampana,
    search,
    ...cfil
  } = req.query;
  let sort = {};
  if (karatra) {
    sort = { ...sort, mpandrayN: karatra };
  }

  if (anarana) {
    sort = { ...sort, name: anarana };
  }
  let filter = { ...cfil };
  if (sampana) {
    filter = { ...filter, sampana: { $regex: new RegExp(sampana, "i") } };
  }
  if (search) {
    filter = {
      ...filter,
      $or: [
        { fullname: { $regex: new RegExp(search, "i") } },
        { mpandrayN: { $regex: new RegExp(search, "i") } },
      ],
    };
    sort = { mpandrayN: "asc" };
  }
  const member = await Member.find()
    .sort({ ...sort })
    .collation({ locale: "en_US", numericOrdering: true })
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .where({ ...filter });
  const totalRow = await Member.where({ ...filter }).countDocuments();
  return res.send({ member, totalRow });
};

const statistics = async (req, res) => {
  const total = await Member.countDocuments();
  const lehilahy = await Member.find({ gender: "lehilahy" }).countDocuments();
  const vehivavy = await Member.find({ gender: "vehivavy" }).countDocuments();
  const mpandray = await Member.find({ mpandray: "eny" }).countDocuments();
  const batisa = await Member.find({ baptism: "eny" }).countDocuments();
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
    total,
  };
  res.send(stast);
};

const exportMembersToCsv = async (req, res) => {
  const { filter, sampana } = req.query;
  const where = sampana
    ? { sampana: { $regex: new RegExp(sampana, "i") } }
    : {};
  const data = await Member.find()
    .where({ ...where })
    .select("-_id");
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
    {
      label: "Fanamarihana",
      value: "other",
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
    "january",
    "february",
    "march",
    "april",
    "may",
    "june",
    "july",
    "august",
    "september",
    "october",
    "november",
    "december",
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
  ];
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
  exportMembersToCsv,
  statistics,
  getFamily,
  checkKaratra,
  getLastKaratra,
  statPerBirthMonth,
  statPerSampana,
};
