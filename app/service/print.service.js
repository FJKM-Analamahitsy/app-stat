const escpos = require("escpos");
escpos.Network = require("escpos-network");

const MONTHS = [
  "Janvier",
  "Février",
  "Mars",
  "Avril",
  "Mai",
  "Juin",
  "Juillet",
  "Août",
  "Septembre",
  "Octobre",
  "Novembre",
  "Décembre",
];

const Receipt = (printer, data) => {
  printer
    .align("ct")
    .style("b")
    .font("a")
    .text("FIANGONAN'I JESOA KRISTY ETO MADAGASIKARA")
    .text("ANALAMAHITSY SPIA19")
    .newLine()
    .style("i")
    .text(`"Aoka ny olona rehetra samy hanao`)
    .text(`araka izay inian'ny fony avy..." Oha. 22. 8`)
    .newLine()
    .align("lt")
    .tableCustom([
      {
        text: "Nom:",
        align: "LEFT",
        width: 0.3,
      },
      {
        text:
          `${data.mpandray.name}`.toUpperCase() + " " + data.mpandray.forname,
        align: "RIGHT",
        width: 0.8,
      },
    ])
    .newLine()
    .tableCustom([
      { text: "Karatra Lah.", align: "LEFT", width: 0.3 },
      { text: data.mpandray.mpandrayN, align: "RIGHT", width: 0.8 },
    ])
    .newLine()
    .tableCustom([
      { text: "Date:", align: "LEFT", width: 0.3 },
      {
        text: new Date(data.date).toLocaleString(),
        align: "RIGHT",
        width: 0.8,
      },
    ])
    .newLine()
    .tableCustom(
      [
        {
          text: "Libellé:",
          align: "LEFT",
          width: 0.3,
        },
        {
          text: `${data.type.name} ${
            data.month.length > 1
              ? MONTHS[data.month[0]] +
                " - " +
                MONTHS[data.month[data.month.length - 1]]
              : MONTHS[data.month[0]]
          } ${data.year}`,
          align: "RIGHT",
          width: 0.8,
        },
      ],
      { encoding: "cp857" }
    )
    .newLine()
    .tableCustom([
      { text: "Montant:", align: "LEFT", width: 0.3 },
      { text: data.mtt + " MGA", align: "RIGHT", width: 0.8 },
    ])
    .newLine()
    .newLine()
    .align("ct")
    .text("Misaotra tompoko!")
    .text(data.createBy)
    .text(`Laharana ${data.number}`)
    .control("lf")
    .cut();
};

const PrintReceipt = (data, printer) => {
  const device = new escpos.Network(printer.adress, printer.port);
  const xprinter = new escpos.Printer(device);
  device.open((err) => {
    if (err) {
      return 1;
    }
    for (let i = 0; i < +printer.copy; i++) {
      Receipt(xprinter, data);
    }
    xprinter.close();
    return 0;
  });
};

module.exports = { PrintReceipt };
