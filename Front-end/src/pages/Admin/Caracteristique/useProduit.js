import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  reset,
  setFiltre,
  setCaracteristique,
  removeCaracteristique,
  updateCaracteristique,
} from "../../../features/admin/caracteristique/caracteristiqueSlice";
import axios from "axios";

const useProduit = () => {
  const dispatch = useDispatch();
  const { caracteristiques, filtre, nbrPages } = useSelector(
    (state) => state.caracteristique
  );
  const [isLoading, setisLoading] = useState(false);
  const [isError, setisError] = useState(false);
  const [name, setname] = useState(filtre.name);
  const [orderBy, setorderBy] = useState(filtre.orderBy);
  const [sortBy, setsortBy] = useState(filtre.sortBy);
  const btn = useRef(null);

  const [caracteristiqueInfo, setcaracteristiqueInfo] = useState({
    idCaracteristique: "",
    color: "",
    capacite: "",
    description: "",
    prix: "",
    quantiteDispo: "",
  });

  const [errorInput, seterrorInput] = useState({
    idCaracteristique: "",
    color: "",
    capacite: "",
    description: "",
    prix: "",
    quantiteDispo: "",
  });

  // Récupere les produits à l'ouverture du site et au changement du filtre
  useEffect(() => {
    setisLoading(true);
    let urlFiltre = `name=${filtre.name}&page=${filtre.page}&orderBy=${filtre.orderBy}&sortBy=${filtre.sortBy}`;

    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };

    axios
      .get(`/api/caracteristique/all?${urlFiltre}`, config)
      .then((res) => dispatch(setCaracteristique(res.data)))
      .catch((err) => console.log(err))
      .finally(() => setisLoading(false));
  }, [dispatch, filtre]);

  // filtre les produits
  const searchProduit = () => dispatch(setFiltre({ name, orderBy, sortBy }));

  // reset les filtres de recherche
  const resetSearch = () => {
    dispatch(reset());
    setname("");
    setorderBy("idCaracteristique");
    setsortBy("DESC");
  };

  // mets a jours la page de l'affichage
  const updatePage = (i) => dispatch(setFiltre({ page: i + 1 }));

  // handle le changement des inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setcaracteristiqueInfo((caracteristiqueInfo) => ({
      ...caracteristiqueInfo,
      [name]: value,
    }));
  };

  // valide le formulaire de connexion
  const validate = () => {
    //validate input
    let error = {};

    if (caracteristiqueInfo.color === "") {
      //validate color
      error.color = "color is required";
    }
    if (caracteristiqueInfo.description === "") {
      //validate description
      error.description = "description is required";
    }
    if (caracteristiqueInfo.capacite === "") {
      //validate capacite
      error.capacite = "capacite is required";
    }
    if (caracteristiqueInfo.prix === "") {
      //validate prix
      error.prix = "prix is required";
    }
    if (caracteristiqueInfo.quantiteDispo === "") {
      //validate quantiteDispo
      error.quantiteDispo = "quantiteDispo is required";
    }
    seterrorInput(error);
    return error;
  };

  // update une caracteristique
  const updateCaracteristiques = () => {
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
      .put(
        `/api/caracteristique/${caracteristiqueInfo.idCaracteristique}`,
        caracteristiqueInfo,
        config
      )
      .then((res) => {
        dispatch(updateCaracteristique(res.data));
        btn.current.click();
        resetId();
      })
      .catch((err) => console.log(err))
      .finally(() => setisLoading(false));
  };

  // supprime une caracteristique
  const deleteCaracteristique = (id) => {
    setisLoading(true);
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    axios
      .delete(`/api/caracteristique/${id}`, config)
      .then(() => dispatch(removeCaracteristique(id)))
      .catch((err) => console.log(err.response))
      .finally(() => setisLoading(false));
  };

  // mettre a jours le formulaire avant la mise a jours
  const updateForm = (caracteristique) => {
    setcaracteristiqueInfo(caracteristique);
  };

  // vider le formulaire
  const resetId = () => {
    setcaracteristiqueInfo(() => ({
      idCaracteristique: "",
      color: "",
      capacite: "",
      description: "",
      prix: "",
      quantiteDispo: "",
    }));
  };

  return {
    caracteristiques,
    filtre,
    nbrPages,
    isLoading,
    isError,
    name,
    orderBy,
    sortBy,
    caracteristiqueInfo,
    btn,
    errorInput,
    searchProduit,
    resetSearch,
    updatePage,
    setname,
    setorderBy,
    setsortBy,
    handleChange,
    deleteCaracteristique,
    updateForm,
    resetId,
    updateCaracteristiques,
  };
};

export default useProduit;
