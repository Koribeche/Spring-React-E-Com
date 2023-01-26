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

export default function NavbarLAdmin({ user, onLogout }) {
  return (
    <div className="d-none d-md-flex">
      <li className="nav-item dropdown">
        <span role="button" className="nav-link" data-bs-toggle="dropdown">
          {user.nomUser} {user.prenom}
        </span>
        <ul className="dropdown-menu dropdown-menu-dark">
          <li>
            <Link to="/admin" className="dropdown-item">
              <FaShopify /> Offre
            </Link>
          </li>
          <li>
            <Link to="/admin/produits" className="dropdown-item">
              <FaBox /> Produit
            </Link>
          </li>
          <li>
            <Link to="/admin/caracteristiques" className="dropdown-item">
              <FaRegListAlt /> Caracteristique
            </Link>
          </li>
          <li>
            <Link to="/admin/commandes" className="dropdown-item">
              <FaShippingFast /> Commande
            </Link>
          </li>
          <li>
            <Link to="/admin/users" className="dropdown-item">
              <FaUser /> Users
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
