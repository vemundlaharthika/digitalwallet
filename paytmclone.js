// BACKEND: Express.js (server.js)
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/digital_wallet', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).catch(error => console.error("Error connecting to MongoDB:", error));

const walletSchema = new mongoose.Schema({
  balance: { type: Number, required: true, default: 0 },
});
const Wallet = mongoose.model('Wallet', walletSchema);

// Routes
app.get('/api/balance', async (req, res) => {
  try {
    let wallet = await Wallet.findOne();
    if (!wallet) {
      wallet = new Wallet();
      await wallet.save();
    }
    res.json({ balance: wallet.balance });
  } catch (error) {
    console.error("Error fetching balance:", error);
    res.status(500).json({ message: "Server error" });
  }
});

app.post('/api/add-money', async (req, res) => {
  const { amount } = req.body;
  if (amount <= 0) {
    return res.status(400).json({ message: "Amount must be greater than zero" });
  }
  try {
    let wallet = await Wallet.findOne();
    if (!wallet) wallet = new Wallet();
    wallet.balance += amount;
    await wallet.save();
    res.json({ balance: wallet.balance });
  } catch (error) {
    console.error("Error adding money:", error);
    res.status(500).json({ message: "Server error" });
  }
});

app.post('/api/pay', async (req, res) => {
  const { amount } = req.body;
  if (amount <= 0) {
    return res.status(400).json({ message: "Amount must be greater than zero" });
  }
  try {
    let wallet = await Wallet.findOne();
    if (!wallet) wallet = new Wallet();
    if (wallet.balance >= amount) {
      wallet.balance -= amount;
      await wallet.save();
      res.json({ balance: wallet.balance });
    } else {
      res.status(400).json({ message: "Insufficient balance" });
    }
  } catch (error) {
    console.error("Error processing payment:", error);
    res.status(500).json({ message: "Server error" });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
