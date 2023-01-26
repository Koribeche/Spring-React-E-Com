import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const useReset = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setisLoading] = useState(false);
  const [isError, setisError] = useState(false);

  const btn = useRef(null);

  const navigate = useNavigate();

  // submit de formulaire pour la connexion
  const onSubmit = (e) => {
    e.preventDefault();
    setError("");
    if (email === "") {
      //validate newPassword
      setError("Veuillez saisir l'adresse email");
    } else {
      reset();
    }
  };

  // login user and get his data
  const reset = async () => {
    setisLoading(true);
    axios
      .post("/api/user/reset", { email })
      .then(() => btn.current.click())
      .catch((err) => setisError(err.response.data.message))
      .finally(() => setisLoading(false));
  };

  return { email, error, btn, isLoading, isError, onSubmit, setEmail };
};

export default useReset;
