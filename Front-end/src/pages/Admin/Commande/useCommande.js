import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  reset,
  setFiltre,
  setCommande,
  removeCommande,
  updateCommande,
} from "../../../features/admin/commande/commandeSlice";
import axios from "axios";

const useProduit = () => {
  const dispatch = useDispatch();
  const { commandes, filtre, nbrPages } = useSelector(
    (state) => state.commandeAdmin
  );
  const [isLoading, setisLoading] = useState(false);
  const [isError, setisError] = useState(false);
  const [name, setname] = useState(filtre.name);
  const [orderBy, setorderBy] = useState(filtre.orderBy);
  const [sortBy, setsortBy] = useState(filtre.sortBy);
  const btn = useRef(null);

  const [commandeInfo, setcommandeInfo] = useState({
    idCommande: "",
    statusCommande: "",
    prixTotal: "",
  });

  const [errorInput, seterrorInput] = useState({
    idCommande: "",
    statusCommande: "",
    prixTotal: "",
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
      .get(`/api/commande/all?${urlFiltre}`, config)
      .then((res) => dispatch(setCommande(res.data)))
      .catch((err) => console.log(err))
      .finally(() => setisLoading(false));
  }, [dispatch, filtre]);

  // filtre les produits
  const searchProduit = () => dispatch(setFiltre({ name, orderBy, sortBy }));

  // reset les filtres de recherche
  const resetSearch = () => {
    dispatch(reset());
    setname("");
    setorderBy("idCommande");
    setsortBy("DESC");
  };

  // mets a jours la page de l'affichage
  const updatePage = (i) => dispatch(setFiltre({ page: i + 1 }));

  // handle le changement des inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setcommandeInfo((commandeInfo) => ({
      ...commandeInfo,
      [name]: value,
    }));
  };

  // valide le formulaire
  const validate = () => {
    //validate input
    let error = {};

    if (commandeInfo.statusCommande === "") {
      //validate statusCommande
      error.statusCommande = "statusCommande is required";
    }
    seterrorInput(error);
    return error;
  };

  // update une commande
  const updateCommandes = () => {
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
      .put(`/api/commande/${commandeInfo.idCommande}`, commandeInfo, config)
      .then((res) => {
        dispatch(updateCommande(res.data));
        btn.current.click();
        resetId();
      })
      .catch((err) => console.log(err))
      .finally(() => setisLoading(false));
  };

  // supprime une commande
  const deleteCommande = (id) => {
    setisLoading(true);
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    axios
      .delete(`/api/commande/${id}`, config)
      .then(() => dispatch(removeCommande(id)))
      .catch((err) => console.log(err))
      .finally(() => setisLoading(false));
  };

  // mettre a jours le formulaire avant la mise a jours
  const updateForm = (commande) => {
    setcommandeInfo(commande);
  };

  // vider le formulaire
  const resetId = () => {
    setcommandeInfo(() => ({
      idCommande: "",
      statusCommande: "",
      prixTotal: "",
    }));
  };

  const rembourser = () => {};

  return {
    commandes,
    filtre,
    nbrPages,
    isLoading,
    isError,
    name,
    orderBy,
    sortBy,
    commandeInfo,
    btn,
    errorInput,
    searchProduit,
    resetSearch,
    updatePage,
    setname,
    setorderBy,
    setsortBy,
    handleChange,
    deleteCommande,
    updateForm,
    resetId,
    updateCommandes,
    rembourser,
  };
};

export default useProduit;
