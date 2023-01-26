import { FaSignInAlt, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deconnexion } from "../../features/auth/authSlice";
import { resetCommande } from "../../features/user/commandeUser/commandeSlice";
import { resetPanier } from "../../features/user/panier/panierSlice";
import { useState } from "react";
import Spinner from "../Spinner";
import NavbarL from "./NavbarL";
import NavbarS from "./NavbarS";
import NavbarLAdmin from "./NavbarLAdmin";
import NavbarSAdmin from "./NavbarSAdmin";

function Header() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth);
  const panier = useSelector((state) => state.panier);
  const commandes = useSelector((state) => state.commande);
  const [isLoading, setisLoading] = useState(false);

  const onLogout = () => {
    setisLoading(true);
    localStorage.removeItem("token");
    localStorage.removeItem("refresh_token");
    dispatch(deconnexion());
    dispatch(resetCommande());
    dispatch(resetPanier());
    setisLoading(false);
  };

  return (
    <>
      {isLoading && <Spinner />}
      <nav className="navbar navbar-expand-md navbar-dark bg-dark py-3 mb-5">
        <div className="container">
          <Link
            to={
              user?.roles?.some((e) => e.name === "ROLE_ADMIN") ? "/admin" : "/"
            }
            className="navbar-brand"
          >
            <h1>
              {user?.roles?.some((e) => e.name === "ROLE_ADMIN")
                ? "Admin"
                : "Amir Shop"}
            </h1>
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navmenu"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navmenu">
            <ul className="navbar-nav ms-auto gap-3">
              {user ? (
                <>
                  {user.roles.some((e) => e.name === "ROLE_ADMIN") ? (
                    <>
                      <NavbarLAdmin user={user} onLogout={onLogout} />
                      <NavbarSAdmin user={user} onLogout={onLogout} />
                    </>
                  ) : (
                    <>
                      <NavbarL
                        user={user}
                        commandes={commandes}
                        panier={panier}
                        onLogout={onLogout}
                      />
                      <NavbarS
                        user={user}
                        commandes={commandes}
                        panier={panier}
                        onLogout={onLogout}
                      />
                    </>
                  )}
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link to="/login" className="nav-link">
                      <FaSignInAlt /> Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/register" className="nav-link">
                      <FaUser /> Register
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Header;
