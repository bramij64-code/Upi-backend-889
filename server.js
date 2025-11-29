const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ------------------------------
// Create Order
// ------------------------------
app.post("/create-order", async (req, res) => {
  try {
    const body = req.body;

    const response = await axios.post(
      "https://merchant.upigateway.com/api/create_order",
      {
        key: "6116deb5-bf12-4176-b569-6299e702e974", // YOUR KEY
        client_txn_id: "txn_" + Date.now(),
        amount: body.amount,
        p_info: "Coins Purchase",
        customer_name: body.name,
        customer_email: body.email,
        customer_mobile: body.mobile,
        redirect_url: "https://upi345.netlify.app/success"
      }
    );

    res.json(response.data);
  } catch (err) {
    console.log(err);
    res.json({ error: err.message, success: false });
  }
});

// ------------------------------
// Webhook Receiver
// ------------------------------
app.post("/webhook", (req, res) => {
  console.log("WEBHOOK RECEIVED:", req.body);

  if (req.body.status === "success") {
    console.log("PAYMENT SUCCESS:", req.body.upi_txn_id);
  } else {
    console.log("PAYMENT FAILED");
  }

  res.send("OK");
});

// ------------------------------
// START SERVER
// ------------------------------
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Backend running on port", port);
});    console.log(err);
    res.json({ error: err.message, success: false });
  }
});

// ------------------------------
// Webhook Receiver
// ------------------------------
app.post("/webhook", (req, res) => {
  console.log("WEBHOOK RECEIVED RAW BODY:", req.body);

  const status = req.body.status;
  const amount = req.body.amount;
  const utr = req.body.upi_txn_id;
  const orderId = req.body.id;

  if (status === "success") {
    console.log("PAYMENT SUCCESS 🎉", utr);
  } else {
    console.log("PAYMENT FAILED ❌");
  }

  res.send("OK");
});

// ------------------------------
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Backend running on port", port);
});
// ------------------------------
// 2) Webhook Receiver
// ------------------------------
app.post("/webhook", (req, res) => {
  console.log("WEBHOOK RECEIVED:", req.body);

  if (req.body.status === "success") {
    console.log("PAYMENT SUCCESS:", req.body.upi_txn_id);
  } else {
    console.log("PAYMENT FAILED");
  }

  res.send("OK");
});

// ------------------------------
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Backend running on port", port);
});
