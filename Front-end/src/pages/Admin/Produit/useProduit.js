import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  reset,
  setFiltre,
  setProduit,
  removeProduit,
  updateProduit,
} from "../../../features/admin/produit/produitSlice";
import axios from "axios";

const useProduit = () => {
  const dispatch = useDispatch();
  const { produits, filtre, nbrPages } = useSelector((state) => state.produit);
  const [isLoading, setisLoading] = useState(false);
  const [isError, setisError] = useState(false);
  const [name, setname] = useState(filtre.name);
  const [orderBy, setorderBy] = useState(filtre.orderBy);
  const [sortBy, setsortBy] = useState(filtre.sortBy);
  const btn = useRef(null);

  const [produitInfo, setproduitInfo] = useState({
    id: "",
    nomProduit: "",
    description: "",
    file: "",
  });

  const [errorInput, seterrorInput] = useState({
    id: "",
    nomProduit: "",
    description: "",
    file: "",
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
      .get(`/api/produit/all?${urlFiltre}`, config)
      .then((res) => dispatch(setProduit(res.data)))
      .catch((err) => console.log(err))
      .finally(() => setisLoading(false));
  }, [dispatch, filtre]);

  // filtre les produits
  const searchProduit = () => dispatch(setFiltre({ name, orderBy, sortBy }));

  // reset les filtres de recherche
  const resetSearch = () => {
    dispatch(reset());
    setname("");
    setorderBy("idProduit");
    setsortBy("DESC");
  };

  // mets a jours la page de l'affichage
  const updatePage = (i) => dispatch(setFiltre({ page: i + 1 }));

  // handle le changement des inputs
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "file") {
      console.log(files[0]);
      setproduitInfo((produitInfo) => ({ ...produitInfo, [name]: files[0] }));
    } else {
      setproduitInfo((produitInfo) => ({ ...produitInfo, [name]: value }));
    }
  };

  // valide le formulaire de connexion
  const validate = () => {
    //validate input
    let error = {};

    if (produitInfo.nomProduit === "") {
      //validate nomProduit
      error.nomProduit = "nomProduit is required";
    }
    if (produitInfo.description === "") {
      //validate description
      error.description = "description is required";
    }
    if (produitInfo.file === "") {
      //validate file
      error.file = "file is required";
    }
    seterrorInput(error);
    return error;
  };

  // update une produit
  const updateProduits = () => {
    setisError(false);
    const error = validate();
    seterrorInput(error);

    if (Object.keys(error).length !== 0) {
      return;
    }

    setisLoading(true);
    const formData = new FormData();
    formData.append("nomProduit", produitInfo.nomProduit);
    formData.append("description", produitInfo.description);
    formData.append("file", produitInfo.file);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };

    axios
      .put(`/api/produit/${produitInfo.id}`, formData, config)
      .then((res) => {
        dispatch(updateProduit(res.data));
        btn.current.click();
        resetId();
      })
      .catch((err) => console.log(err))
      .finally(() => setisLoading(false));
  };

  // supprime une produit
  const deleteProduit = (id) => {
    setisLoading(true);
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    axios
      .delete(`/api/produit/${id}`, config)
      .then(() => dispatch(removeProduit(id)))
      .catch((err) => console.log(err.response))
      .finally(() => setisLoading(false));
  };

  // mettre a jours le formulaire avant la mise a jours
  const updateForm = (produit) => {
    setproduitInfo(produit);
  };

  // vider le formulaire
  const resetId = () => {
    setproduitInfo(() => ({
      id: "",
      nomProduit: "",
      description: "",
      file: "",
    }));
  };

  return {
    produits,
    filtre,
    nbrPages,
    isLoading,
    isError,
    name,
    orderBy,
    sortBy,
    produitInfo,
    btn,
    errorInput,
    searchProduit,
    resetSearch,
    updatePage,
    setname,
    setorderBy,
    setsortBy,
    handleChange,
    deleteProduit,
    updateForm,
    resetId,
    updateProduits,
  };
};

export default useProduit;
