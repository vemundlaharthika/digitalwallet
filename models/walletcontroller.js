const User = require("../models/User");
const Transaction = require("../models/Transaction");

exports.getWalletBalance = async (req, res) => {
  const userId = req.userId;

  try {
    const user = await User.findById(userId);
    res.json({ walletBalance: user.walletBalance });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch wallet balance" });
  }
};

exports.getTransactions = async (req, res) => {
  const userId = req.userId;

  try {
    const transactions = await Transaction.find({ userId });
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch transactions" });
  }
};
