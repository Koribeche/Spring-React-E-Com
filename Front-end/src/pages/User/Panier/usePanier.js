import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { removePanier } from "../../../features/user/panier/panierSlice";
import axios from "axios";

const usePanier = () => {
  const listPanier = useSelector((state) => state.panier);
  const [isLoading, setisLoading] = useState(false);
  const [isError, setisError] = useState(false);

  const [userInfo, setuserInfo] = useState({
    email: "",
    password: "",
  });

  const [errorInput, seterrorInput] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // calcul du total
  const total = listPanier
    .filter((produit) => produit.statusPanier === "en cours")
    .reduce((acc, cur) => {
      return acc + cur.caracteristique.prix * cur.quantiteAchat;
    }, 0);

  const confirmLogin = () => {
    setisError(false);
    const error = validate();

    if (Object.keys(error).length !== 0) {
      return;
    }

    setisLoading(true);
    setisError((e) => false);
    axios
      .post("/api/login", userInfo)
      .then(() => checkout())
      .catch((e) => {
        setisError((e) => "Email ou mot de passe incorrect");
        setisLoading(false);
      });
  };

  // redirect vers la page de payement en ligne
  const checkout = () => {
    if (listPanier.length === 0) return setisError("Votre panier est vide");

    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    axios
      .get("/api/commande/checkout", config)
      .then((res) => (window.location = res.data))
      .catch((err) => console.log(err.response))
      .finally(() => setisLoading(false));
  };

  // Supprime l'annonce du panier
  const deleteFromPanier = (id) => {
    setisLoading(true);
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    axios
      .delete(`/api/panier/${id}`, config)
      .then(() => {
        dispatch(removePanier(id));
      })
      .catch((err) => console.log(err.response))
      .finally(() => setisLoading(false));
  };

  // nous envoie vers la page de détails d'une annonce pour mettre à jours la Qte
  const updateInPanier = (url) => navigate(url);

  // handle le changement des inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setuserInfo((userInfo) => ({ ...userInfo, [name]: value }));
  };

  // valide le formulaire de connexion
  const validate = () => {
    //validate input
    let error = {};

    if (userInfo.email === "") {
      //validate email
      error.email = "Email is required";
    }
    if (userInfo.password === "") {
      //validate password
      error.password = "Password is required";
    }
    seterrorInput(error);
    return error;
  };

  return {
    listPanier,
    isLoading,
    isError,
    total,
    userInfo,
    errorInput,
    checkout,
    confirmLogin,
    deleteFromPanier,
    updateInPanier,
    handleChange,
  };
};
export default usePanier;
