const express = require("express");
const { getWalletBalance, getTransactions } = require("../controllers/walletController");
const router = express.Router();

const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch {
    res.status(401).json({ error: "Invalid token" });
  }
};

router.get("/balance", authenticate, getWalletBalance);
router.get("/transactions", authenticate, getTransactions);

module.exports = router;
