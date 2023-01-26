import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setOffres,
  setFiltre,
  reset,
} from "../../../features/user/accueil/accueilSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const useAccueil = () => {
  const [isLoading, setisLoading] = useState(false);
  const dispatch = useDispatch();

  const { offres, filtre, nbrPages } = useSelector((state) => state.accueil);
  const [name, setname] = useState(filtre.name);
  const [marque, setcategory] = useState(filtre.marque);
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth);

  useEffect(() => {
    if (user?.roles?.some((e) => e.name === "ROLE_ADMIN")) navigate("/admin");
  }, []);

  // Récupere les offres à l'ouverture du site et au changement du filtre
  useEffect(() => {
    setisLoading(true);
    let urlFiltre = `name=${filtre.name}&marque=${filtre.marque}&page=${filtre.page}`;
    axios
      .get(`/api/offre?${urlFiltre}`)
      .then((res) => dispatch(setOffres(res.data)))
      .catch((err) => console.log(err))
      .finally(() => setisLoading(false));
  }, [dispatch, filtre]);

  // filtre les offres
  const searchProduit = () => dispatch(setFiltre({ name, marque }));

  // reset les filtres de recherche
  const resetSearch = () => {
    dispatch(reset());
    setname("");
    setcategory("");
  };

  // mets a jours la page de l'affichage
  const updatePage = (i) => dispatch(setFiltre({ page: i + 1 }));

  return {
    offres,
    filtre,
    nbrPages,
    isLoading,
    name,
    marque,
    searchProduit,
    resetSearch,
    updatePage,
    setname,
    setcategory,
  };
};

export default useAccueil;
