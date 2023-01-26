import React from "react";
import { Link } from "react-router-dom";
import {
  FaSignOutAlt,
  FaUser,
  FaCartArrowDown,
  FaConciergeBell,
} from "react-icons/fa";

export default function NavbarL({ user, panier, commandes, onLogout }) {
  return (
    <div className="d-none d-md-flex">
      <li className="nav-item">
        <Link to="/panier" className="nav-link">
          <FaCartArrowDown /> Panier {panier.length}
        </Link>
      </li>

      <li className="nav-item dropdown">
        <span role="button" className="nav-link" data-bs-toggle="dropdown">
          {user.nomUser} {user.prenom}
        </span>
        <ul className="dropdown-menu dropdown-menu-dark">
          <li>
            <Link to="/profile" className="dropdown-item">
              <FaUser /> Profile
            </Link>
          </li>
          <li>
            <Link to="/commande" className="dropdown-item">
              <FaConciergeBell /> Commande {commandes.length}
            </Link>
          </li>
          <li onClick={() => onLogout()}>
            <Link to="/" className="dropdown-item">
              <FaSignOutAlt /> Logout
            </Link>
          </li>
        </ul>
      </li>
    </div>
  );
}
