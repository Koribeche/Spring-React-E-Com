import { useEffect, useState, useRef, useCallback } from "react";
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";

const useDetailOffre = () => {
  const { id } = useParams();
  const [offre, setoffre] = useState({
    idOffre: "",
    nomOffre: "",
    categorie: "",
    marque: "",
    description: "",
    file: "",
    produits: [],
  });
  const [isLoading, setisLoading] = useState(false);
  const [isError, setisError] = useState(false);
  // const location = useLocation();

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

  const btn = useRef(null);
  useEffect(() => {
    console.log("new offres");
  }, [offre]);

  // Récuperer l'offre avec son id
  useEffect(() => {
    // if (location.state)  return setoffre((prev) => ({ ...prev, ...location.state }));

    setisLoading(true);
    axios
      .get(`/api/offre/${id}`)
      .then((res) => {
        setoffre(res.data);
      })
      .catch(() => setisError("erreur lors de chargement de l'offre"))
      .finally(() => setisLoading(false));
  }, []);

  // Ajouter un produit à l'offre
  const createProduit = () => {
    setisError(false);
    const error = validate();
    seterrorInput(error);

    if (Object.keys(error).length !== 0) {
      return;
    }

    if (produitInfo.id) {
      updateProduit();
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
      .post(`/api/produit?idOffre=${id}`, formData, config)
      .then((res) => {
        setoffre((prev) => ({
          ...prev,
          produits: [...prev.produits, res.data],
        }));
        btn.current.click();
        setproduitInfo({
          id: "",
          nomProduit: "",
          description: "",
          file: "",
        });
      })
      .catch((err) => console.log(err))
      .finally(() => setisLoading(false));
  };

  // update produit
  const updateProduit = () => {
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
        setoffre((prev) => ({
          ...prev,
          produits: prev.produits.filter((p) => p.id !== produitInfo.id),
        }));
        setoffre((prev) => ({
          ...prev,
          produits: [...prev.produits, res.data],
        }));
        btn.current.click();
        setproduitInfo({
          id: "",
          nomProduit: "",
          description: "",
          file: "",
        });
      })
      .catch((err) => console.log(err))
      .finally(() => setisLoading(false));
  };

  // supprimer un produit
  const deleteProduit = (id) => {
    setisLoading(true);
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };

    axios
      .delete(`/api/produit/${id}`, config)
      .then(() =>
        setoffre((prev) => ({
          ...prev,
          produits: prev.produits.filter((p) => p.id !== id),
        }))
      )
      .catch(() => setisError("erreur lors de la suppression du produit"))
      .finally(() => setisLoading(false));
  };

  // handle le changement des inputs
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "file") {
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
      //validate nomOffre
      error.nomProduit = "nomOffre is required";
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

  // mettre a jours le formulaire avant la mise a jours
  const updateForm = (produit) => {
    setproduitInfo(produit);
  };

  // vider le formulaire
  const resetId = () => {
    setproduitInfo((prev) => ({
      id: "",
      nomProduit: "",
      description: "",
      file: "",
    }));
  };

  return {
    offre,
    isLoading,
    isError,
    produitInfo,
    errorInput,
    btn,
    deleteProduit,
    handleChange,
    validate,
    createProduit,
    resetId,
    updateForm,
  };
};
export default useDetailOffre;
