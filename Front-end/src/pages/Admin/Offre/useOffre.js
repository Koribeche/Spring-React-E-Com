import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  reset,
  setFiltre,
  setOffre,
  addOffre,
  removeOffre,
  updateOffre,
} from "../../../features/admin/offre/offreSlice";
import axios from "axios";

const useOffre = () => {
  const dispatch = useDispatch();
  const { offres, filtre, nbrPages } = useSelector((state) => state.offre);
  const [isLoading, setisLoading] = useState(false);
  const [isError, setisError] = useState(false);
  const [name, setname] = useState(filtre.name);
  const [marque, setcategory] = useState(filtre.marque);
  const [orderBy, setorderBy] = useState(filtre.orderBy);
  const [sortBy, setsortBy] = useState(filtre.sortBy);
  const btn = useRef(null);

  const [offreInfo, setoffreInfo] = useState({
    idOffre: "",
    nomOffre: "",
    categorie: "",
    marque: "",
    description: "",
    file: "",
  });

  const [errorInput, seterrorInput] = useState({
    idOffre: "",
    nomOffre: "",
    categorie: "",
    marque: "",
    description: "",
    file: "",
  });

  // Récupere les offres à l'ouverture du site et au changement du filtre
  useEffect(() => {
    setisLoading(true);
    let urlFiltre = `name=${filtre.name}&marque=${filtre.marque}&page=${filtre.page}&orderBy=${filtre.orderBy}&sortBy=${filtre.sortBy}`;
    axios
      .get(`/api/offre?${urlFiltre}`)
      .then((res) => dispatch(setOffre(res.data)))
      .catch((err) => console.log(err))
      .finally(() => setisLoading(false));
  }, [dispatch, filtre]);

  // filtre les offres
  const searchProduit = () =>
    dispatch(setFiltre({ name, marque, orderBy, sortBy }));

  // reset les filtres de recherche
  const resetSearch = () => {
    dispatch(reset());
    setname("");
    setcategory("");
    setorderBy("idOffre");
    setsortBy("DESC");
  };

  // mets a jours la page de l'affichage
  const updatePage = (i) => dispatch(setFiltre({ page: i + 1 }));

  // handle le changement des inputs
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "file") {
      console.log(files[0]);
      setoffreInfo((offreInfo) => ({ ...offreInfo, [name]: files[0] }));
    } else {
      setoffreInfo((offreInfo) => ({ ...offreInfo, [name]: value }));
    }
  };

  // valide le formulaire de connexion
  const validate = () => {
    //validate input
    let error = {};

    if (offreInfo.nomOffre === "") {
      //validate nomOffre
      error.nomOffre = "nomOffre is required";
    }
    if (offreInfo.categorie === "") {
      //validate categorie
      error.categorie = "categorie is required";
    }
    if (offreInfo.marque === "") {
      //validate marque
      error.marque = "marque is required";
    }
    if (offreInfo.description === "") {
      //validate description
      error.description = "description is required";
    }
    if (offreInfo.file === "") {
      //validate file
      error.file = "file is required";
    }
    seterrorInput(error);
    return error;
  };

  // Créer une offre
  const createOffre = () => {
    setisError(false);
    const error = validate();
    seterrorInput(error);

    if (Object.keys(error).length !== 0) {
      return;
    }

    if (offreInfo.idOffre) {
      updateOffres();
      return;
    }

    setisLoading(true);
    const formData = new FormData();
    formData.append("nomOffre", offreInfo.nomOffre);
    formData.append("categorie", offreInfo.categorie);
    formData.append("marque", offreInfo.marque);
    formData.append("description", offreInfo.description);
    formData.append("file", offreInfo.file);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };

    axios
      .post("/api/offre", formData, config)
      .then((res) => {
        dispatch(addOffre(res.data));
        btn.current.click();
        resetId();
      })
      .catch((err) => console.log(err))
      .finally(() => setisLoading(false));
  };

  // update une offre
  const updateOffres = () => {
    setisLoading(true);
    const formData = new FormData();
    formData.append("nomOffre", offreInfo.nomOffre);
    formData.append("categorie", offreInfo.categorie);
    formData.append("marque", offreInfo.marque);
    formData.append("description", offreInfo.description);
    formData.append("file", offreInfo.file);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };

    axios
      .put(`/api/offre/${offreInfo.idOffre}`, formData, config)
      .then((res) => {
        dispatch(updateOffre(res.data));
        btn.current.click();
        resetId();
      })
      .catch((err) => console.log(err))
      .finally(() => setisLoading(false));
  };

  // supprime une offre
  const deleteOffre = (id) => {
    setisLoading(true);
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    axios
      .delete(`/api/offre/${id}`, config)
      .then(() => dispatch(removeOffre(id)))
      .catch((err) => console.log(err.response))
      .finally(() => setisLoading(false));
  };

  // mettre a jours le formulaire avant la mise a jours
  const updateForm = (offre) => {
    setoffreInfo(offre);
  };

  // vider le formulaire
  const resetId = () => {
    setoffreInfo(() => ({
      idOffre: "",
      nomOffre: "",
      categorie: "",
      marque: "",
      description: "",
      file: "",
    }));
  };

  return {
    offres,
    filtre,
    nbrPages,
    isLoading,
    isError,
    name,
    marque,
    orderBy,
    sortBy,
    offreInfo,
    btn,
    errorInput,
    searchProduit,
    resetSearch,
    updatePage,
    setname,
    setcategory,
    setorderBy,
    setsortBy,
    handleChange,
    createOffre,
    deleteOffre,
    updateForm,
    resetId,
  };
};

export default useOffre;
