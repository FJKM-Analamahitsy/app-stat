const { object, string } = require("yup");
const { Member } = require("../models/member.model");
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
    return res.send(newMember);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const deleteMember = async (req, res) => {
  try {
    const { id } = await idSchema.validate(req.body);
    const member = await Member.findOneAndDelete({ _id: id });
    return res.send(member);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const updateMember = async (req, res) => {
  try {
    const { id, ...body } = await idSchema.validate(req.body);
    await Member.findOneAndUpdate({ _id: id }, { ...body });
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

const exportMembersToCsv = async (req, res) => {
  const data = await Member.find().select("-_id");
  const raw = [];
  data.map((el) => {
    raw.push({
      Anarana: el.name,
      Fanampiny: el.forname,
      "L/V": el.gender,
      Karatra: el.mpandrayN,
      "taona nahaterahana": el.birthday,
      "toerana nahaterahana": el.birthplace,
      adiresy: el.home,
      tanana: el.city,
      faritra: el.place,
      asa: el.job,
      talenta: el.talent,
      telephone: el.phone,
      email: el.mail,
      fb: el.fb,
      fialamboly: el.hobby,
      batisa: el.baptism,
      "taona batisa": el.baptismYear,
      mpandray: el.mpandray,
      "mpandray andiany": el.mpandrayAndiany,
    });
  });
  const prep = new parser();
  const csv = prep.parse(raw);
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
};
