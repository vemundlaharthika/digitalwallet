import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <h2>Paytm Clone</h2>
      <ul>
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/transactions">Transactions</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;

