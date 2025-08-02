const fs = require("fs");
const path = require("path");

module.exports = (req, res) => {
  const filePath = path.join(__dirname, "..", "dataTotal.json");

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Gagal fetch." });
    }

    const parsedData = JSON.parse(data);

    res.status(200).json({
      totalDeposit: {
        label: "Total Deposit",
        amount: `IDR ${Number(parsedData.totalDeposit.amount).toLocaleString("id-ID")}`,
        count: `${parsedData.totalDeposit.count} Deposit(s)`
      },
      totalRegistration: {
        label: "Total Registration",
        count: `${parsedData.totalRegistration.count} Registration`
      }
    });
  });
};
