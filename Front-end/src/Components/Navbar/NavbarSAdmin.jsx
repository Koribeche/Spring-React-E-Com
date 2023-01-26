import React from "react";
import { Link } from "react-router-dom";
import {
  FaSignOutAlt,
  FaUser,
  FaShopify,
  FaBox,
  FaRegListAlt,
  FaShippingFast,
} from "react-icons/fa";

export default function NavbarSAdmin({ onLogout }) {
  return (
    <div className="d-md-none">
      <ul>
        <li className="nav-item">
          <Link to="/admin" className="nav-link">
            <FaShopify /> Offre
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/admin/produits" className="nav-link">
            <FaBox /> Produit
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/admin/caracteristiques" className="nav-link">
            <FaRegListAlt /> Caracteristique
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/admin/commandes" className="nav-link">
            <FaShippingFast /> Commande
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/admin/users" className="nav-link">
            <FaUser /> Users
          </Link>
        </li>
        <li className="nav-item" onClick={() => onLogout()}>
          <Link to="/" className="nav-link">
            <FaSignOutAlt /> Logout
          </Link>
        </li>
      </ul>
    </div>
  );
}
