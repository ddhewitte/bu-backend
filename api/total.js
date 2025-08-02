const fs = require("fs");
const path = require("path");

module.exports = async (req, res) => {
  // CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  const filePath = path.join(process.cwd(), "dataTotal.json");

  try {
    const data = await fs.promises.readFile(filePath, "utf8");
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
  } catch (err) {
    res.status(500).json({ error: "Gagal fetch." });
  }
};