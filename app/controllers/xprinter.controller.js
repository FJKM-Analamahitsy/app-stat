const escpos = require("escpos");
const { PrintReceipt } = require("../service/print.service");
escpos.Network = require("escpos-network");

const Print = async (req, res) => {
  try {
    const { data, printer } = req.body;
    PrintReceipt(data, printer);
    res.status(200).send();
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports = { Print };
