import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  reset,
  setFiltre,
  setUsers,
  removeUsers,
  updateUsers,
} from "../../../features/admin/users/usersSlice";
import axios from "axios";

const useUsers = () => {
  const dispatch = useDispatch();
  const { users, filtre, nbrPages } = useSelector((state) => state.users);
  const [isLoading, setisLoading] = useState(false);
  const [isError, setisError] = useState(false);
  const [name, setname] = useState(filtre.name);
  const [role, setrole] = useState(filtre.role);
  const [orderBy, setorderBy] = useState(filtre.orderBy);
  const [sortBy, setsortBy] = useState(filtre.sortBy);
  const btn = useRef(null);

  const [userInfo, setuserInfo] = useState({
    idUser: "",
    color: "",
    capacite: "",
    description: "",
    prix: "",
    quantiteDispo: "",
  });

  const [errorInput, seterrorInput] = useState({
    idUser: "",
    color: "",
    capacite: "",
    description: "",
    prix: "",
    quantiteDispo: "",
  });

  // Récupere les produits à l'ouverture du site et au changement du filtre
  useEffect(() => {
    setisLoading(true);
    let urlFiltre = `name=${filtre.name}&role=${filtre.role}&page=${filtre.page}&orderBy=${filtre.orderBy}&sortBy=${filtre.sortBy}`;
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };

    console.log(urlFiltre);

    axios
      .get(`/api/user?${urlFiltre}`, config)
      .then((res) => dispatch(setUsers(res.data)))
      .catch((err) => console.log(err))
      .finally(() => setisLoading(false));
  }, [dispatch, filtre]);

  // filtre les produits
  const searchProduit = () =>
    dispatch(setFiltre({ name, role, orderBy, sortBy }));

  // reset les filtres de recherche
  const resetSearch = () => {
    dispatch(reset());
    setname("");
    setrole("");
    setorderBy("idUser");
    setsortBy("DESC");
  };

  // mets a jours la page de l'affichage
  const updatePage = (i) => dispatch(setFiltre({ page: i + 1 }));

  // handle le changement des inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setuserInfo((userInfo) => ({
      ...userInfo,
      [name]: value,
    }));
  };

  // valide le formulaire de connexion
  const validate = () => {
    //validate input
    let error = {};

    if (userInfo.color === "") {
      //validate color
      error.color = "color is required";
    }
    if (userInfo.description === "") {
      //validate description
      error.description = "description is required";
    }
    if (userInfo.capacite === "") {
      //validate capacite
      error.capacite = "capacite is required";
    }
    if (userInfo.prix === "") {
      //validate prix
      error.prix = "prix is required";
    }
    if (userInfo.quantiteDispo === "") {
      //validate quantiteDispo
      error.quantiteDispo = "quantiteDispo is required";
    }
    seterrorInput(error);
    return error;
  };

  // update une caracteristique
  const updateUser = () => {
    setisError(false);
    const error = validate();
    seterrorInput(error);

    if (Object.keys(error).length !== 0) {
      return;
    }

    setisLoading(true);
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };

    axios
      .put(`/api/user/${userInfo.idUser}`, userInfo, config)
      .then((res) => {
        dispatch(updateUsers(res.data));
        btn.current.click();
        resetId();
      })
      .catch((err) => console.log(err))
      .finally(() => setisLoading(false));
  };

  // supprime une caracteristique
  const deleteUser = (id) => {
    setisLoading(true);
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    axios
      .delete(`/api/user/${id}`, config)
      .then(() => dispatch(removeUsers(id)))
      .catch((err) => console.log(err.response))
      .finally(() => setisLoading(false));
  };

  // mettre a jours le formulaire avant la mise a jours
  const updateForm = (caracteristique) => {
    setuserInfo(caracteristique);
  };

  // vider le formulaire
  const resetId = () => {
    setuserInfo(() => ({
      idUser: "",
      color: "",
      capacite: "",
      description: "",
      prix: "",
      quantiteDispo: "",
    }));
  };

  return {
    users,
    filtre,
    nbrPages,
    isLoading,
    isError,
    name,
    role,
    orderBy,
    sortBy,
    userInfo,
    btn,
    errorInput,
    searchProduit,
    resetSearch,
    updatePage,
    setname,
    setrole,
    setorderBy,
    setsortBy,
    handleChange,
    deleteUser,
    updateForm,
    resetId,
    updateUser,
  };
};

export default useUsers;
