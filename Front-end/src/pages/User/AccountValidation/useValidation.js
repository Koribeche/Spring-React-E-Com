import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const useLogin = () => {
  const [userInfo, setuserInfo] = useState({
    oldPassword: "",
    newPassword: "",
  });
  const [errorInput, seterrorInput] = useState({
    oldPassword: "",
    newPassword: "",
  });

  const { email } = useParams();
  const [isLoading, setisLoading] = useState(false);
  const [isError, setisError] = useState(false);

  const navigate = useNavigate();

  // valide le formulaire de connexion
  const validate = () => {
    //validate input
    let error = {};

    if (userInfo.newPassword === "") {
      //validate newPassword
      error.newPassword = "new Password is required";
    }
    if (userInfo.oldPassword === "") {
      //validate oldPassword
      error.oldPassword = "oldPassword is required";
    }
    seterrorInput(error);
    return error;
  };

  // submit de formulaire pour la connexion
  const onSubmit = (e) => {
    e.preventDefault();
    setisError(false);
    const error = validate();

    if (Object.keys(error).length !== 0) {
      return;
    }

    login();
  };

  // login user and get his data
  const login = async () => {
    const error = validate();

    if (Object.keys(error).length !== 0) {
      return;
    }

    setisLoading(true);
    try {
      await axios.post("/api/user/validateAccount", { ...userInfo, email });
      navigate("/login");
    } catch (err) {
      setisError(err.response.data.message);
    } finally {
      setisLoading(false);
    }
  };

  // handle le changement des inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setuserInfo((userInfo) => ({ ...userInfo, [name]: value }));
  };

  return { userInfo, errorInput, isLoading, isError, handleChange, onSubmit };
};

export default useLogin;
