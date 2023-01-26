import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const useRegister = () => {
  const [userInfo, setuserInfo] = useState({
    nom: "",
    prenom: "",
    email: "",
    line1: "",
    line2: "",
    city: "",
    pays: "",
    codePostal: "",
  });
  const [errorInput, seterrorInput] = useState({
    nom: "",
    prenom: "",
    email: "",
    line1: "",
    line2: "",
    city: "",
    pays: "",
    codePostal: "",
  });

  const btn = useRef(null);

  const [loading, setloading] = useState(false);
  const [error, seterror] = useState(false);

  const navigate = useNavigate();
  const user = useSelector((state) => state.auth);

  // si l'utilisateur est déja connecté, il est redirecter vers la page d'accueil
  useEffect(() => {
    if (user) navigate("/");
  }, [user, navigate]);

  // valide le formulaire d'inscription
  const validate = () => {
    //validate input
    let error = {};
    if (userInfo.nom === "") {
      //validate fullname
      error.nom = "nom is required";
    }
    if (userInfo.email === "") {
      //validate email
      error.email = "Email is required";
    }
    if (userInfo.prenom === "") {
      //validate confirm prenom
      error.prenom = "prenom is required";
    }

    if (userInfo.line1 === "") {
      //validate line1
      error.line1 = "Adresse is required";
    }

    if (userInfo.city === "") {
      //validate city
      error.city = "Ville is required";
    }

    if (userInfo.pays === "") {
      //validate pays
      error.pays = "pays is required";
    }

    if (userInfo.codePostal === "") {
      //validate codePostal
      error.codePostal = "Code postal is required";
    }

    seterrorInput(error);
    return error;
  };

  // submit de formulaire pour l'inscription
  const onSubmit = (e) => {
    e.preventDefault();
    seterror(false);
    const error = validate();
    if (Object.keys(error).length !== 0) {
      return;
    }

    setloading(true);
    axios
      .post("/api/user/signup", userInfo)
      .then(() => btn.current.click())
      .catch((err) => seterror("l'adresse email existe déja"))
      .finally(() => setloading(false));
  };

  // handle le changement des inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setuserInfo((userInfo) => ({ ...userInfo, [name]: value }));
  };

  return {
    userInfo,
    errorInput,
    loading,
    error,
    btn,
    onSubmit,
    handleChange,
  };
};
export default useRegister;
