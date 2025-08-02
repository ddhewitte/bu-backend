const express = require("express");
const cors = require("cors");
const fs = require("fs");
const app = express();
const PORT = 5300;

app.use(cors());

app.get("/api/total", (req, res) => {
  fs.readFile("dataTotal.json", "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Gagal fetch." });
    }

    const parsedData = JSON.parse(data);

    res.json({
      totalDeposit: {
        label: "Total Deposit",
        amount: `IDR ${parsedData.totalDeposit.amount.toLocaleString("id-ID")}`,
        count: `${parsedData.totalDeposit.count} Deposit(s)`
      },
      totalRegistration: {
        label: "Total Registration",
        count: `${parsedData.totalRegistration.count} Registration`
      }
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
