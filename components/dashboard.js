import React from "react";

function Dashboard() {
  const walletBalance = 5000;

  return (
    <div>
      <h2>Dashboard</h2>
      <p>Wallet Balance: ₹{walletBalance}</p>
      <button>Recharge</button>
      <button>Pay</button>
    </div>
  );
}

export default Dashboard;
