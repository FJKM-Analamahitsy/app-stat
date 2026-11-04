const { Group } = require("../models/group.model");
const { object, string } = require("yup");

const Input = object({
  name: string().required(),
});

const createGroup = async (req, res) => {
  try {
    const input = await Input.validate(req.body);
    const newData = new Group({
      ...input,
    });
    await newData.save();
    return res.send(newData);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getAllGroup = async (req, res) => {
  const result = await Group.find();
  return res.send(result);
};

const updateGroup = async (req, res) => {
  try {
    const input = await Input.validate(req.body);
    await Group.findOneAndUpdate({ _id: req.params.id }, input);
    return res.sendStatus(204);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const deleteGroup = async (req, res) => {
  try {
    const { id } = await idSchema.validate(req.params);
    const result = await Group.findOneAndDelete({ _id: id });
    return res.send(result);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = {
  createGroup,
  getAllGroup,
  updateGroup,
  deleteGroup,
};
