import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/User/Login";
import Register from "./pages/User/Register";
import Accueil from "./pages/User/Accueil";
import Navbar from "./Components/Navbar";
import Panier from "./pages/User/Panier";
import Commande from "./pages/User/Commande";
import AccountValidation from "./pages/User/AccountValidation";
import DetailOffre from "./pages/User/DetailOffre";
import DetailProduit from "./pages/User/DetailProduit";
import ResetPassword from "./pages/User/ResetPassword";
import ProtectedRoute from "./Components/ProtectedRoute";

import useInit from "./hooks/useInit";
import Spinner from "./Components/Spinner";

import ProtectedAdminRoute from "./Components/ProtectedAdminRoute";
import OffreAdmin from "./pages/Admin/Offre";
import ProduitAdmin from "./pages/Admin/Produit";
import CommandeAdmin from "./pages/Admin/Commande";
import CaracAdmin from "./pages/Admin/Caracteristique";
import DetailOffreAdmin from "./pages/Admin/DetailOffre";
import DetailProduitAdmin from "./pages/Admin/DetailProduit";
import LoginAdmin from "./pages/Admin/LoginAdmin";
import UsersAdmin from "./pages/Admin/Users";

export default function App() {
  const { isLoading } = useInit();

  if (isLoading) return <Spinner />;

  return (
    <Router>
      <Navbar />
      <div className="container pb-2">
        <Routes>
          <Route path="/" element={<Accueil />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/resetPassword" element={<ResetPassword />} />
          <Route path="/admin/login" element={<LoginAdmin />} />
          <Route path="/offre/:id" element={<DetailOffre />} />
          <Route path="/produit/:id" element={<DetailProduit />} />
          <Route
            path="/accountVerification/:email"
            element={<AccountValidation />}
          />

          {/* Protected routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/panier" element={<Panier />} />
            <Route path="/commande" element={<Commande />} />
          </Route>

          {/* Admin routes */}
          <Route element={<ProtectedAdminRoute />}>
            <Route path="/admin" element={<OffreAdmin />} />
            <Route path="/admin/produits" element={<ProduitAdmin />} />
            <Route path="/admin/caracteristiques" element={<CaracAdmin />} />
            <Route path="/admin/users" element={<UsersAdmin />} />
            <Route path="/admin/commandes" element={<CommandeAdmin />} />
            <Route path="/admin/offre/:id" element={<DetailOffreAdmin />} />
            <Route path="/admin/produit/:id" element={<DetailProduitAdmin />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}
