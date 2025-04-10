const escpos = require("escpos");
const { PrintReceipt } = require("../service/print.service");
escpos.Network = require("escpos-network");

const Print = async (req, res) => {
  try {
    const { data, printer } = req.body;
    const print = PrintReceipt(data, printer);
    if (print === 1) return res.status(404).send("printer not found");
    return res.send("success");
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports = { Print };
