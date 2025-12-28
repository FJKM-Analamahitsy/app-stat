const { Attendance } = require("../models/attendance.model");
const { object, string } = require("yup");
const dayjs = require("dayjs");

const idSchema = object({
  id: string().required(),
});

const getAttendance = async (req, res) => {
  let match = {
    day: dayjs().format("YYYY-MM-DD"),
  };

  if (req.query.day) {
    match = {
      ...match,
      day: req.query.day,
    };
  }

  const pipeline = [
    {
      $project: {
        day: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
        member: "$member",
      },
    },
    {
      $match: { ...match },
    },
  ];
  let data = await Attendance.aggregate([...pipeline]);

  data = await Attendance.populate(data, { path: "member" });

  res.json(data);
};

const addAttendance = async (req, res) => {
  try {
    const { date } = req.body;
    const today = dayjs(date).format("YYYY-MM-DD");
    const { id } = await idSchema.validate(req.params);
    await Attendance.updateOne(
      { date: today, member: id },
      { $setOnInsert: { member: id, date: today } },
      { upsert: true }
    );
    return res.sendStatus(200);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const deleteAttendance = async (req, res) => {
  try {
    const { id } = await idSchema.validate(req.params);
    await Attendance.findOneAndDelete({ _id: id });
    return res.sendStatus(200);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = {
  getAttendance,
  addAttendance,
  deleteAttendance,
};
