const { object, string } = require("yup");
const { Member } = require("../models/member.model");

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
  const member = await Member.find();
  return res.send(member);
};

module.exports = {
  createMember,
  deleteMember,
  updateMember,
  getMember,
  listMember,
};
