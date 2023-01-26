import React from "react";
import { Link } from "react-router-dom";
import {
  FaSignOutAlt,
  FaUser,
  FaCartArrowDown,
  FaConciergeBell,
} from "react-icons/fa";

export default function NavbarS({ user, panier, commandes, onLogout }) {
  return (
    <div className="d-md-none">
      <li className="nav-item">
        <Link to="/profile" className="nav-link">
          <FaUser /> Profile
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/panier" className="nav-link">
          <FaCartArrowDown /> Panier {panier.length}
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/commande" className="nav-link">
          <FaConciergeBell /> Commande {commandes.length}
        </Link>
      </li>
      <li className="nav-item" onClick={() => onLogout()}>
        <Link to="/" className="nav-link">
          <FaSignOutAlt /> Logout
        </Link>
      </li>
    </div>
  );
}
