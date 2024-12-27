import React from "react";

function Transactions() {
  const transactions = [
    { id: 1, type: "Recharge", amount: 500, date: "2024-12-26" },
    { id: 2, type: "Pay", amount: 200, date: "2024-12-25" },
  ];

  return (
    <div>
      <h2>Transactions</h2>
      <ul>
        {transactions.map((tx) => (
          <li key={tx.id}>
            {tx.type} - ₹{tx.amount} on {tx.date}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Transactions;
