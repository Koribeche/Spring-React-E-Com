import { useEffect, useState, useMemo, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addPanier } from "../../../features/user/panier/panierSlice";
import axios from "axios";

const useDetail = () => {
  const { id } = useParams();
  const [produit, setproduit] = useState(null);
  const [isLoading, setisLoading] = useState(false);
  const [isError, setisError] = useState(false);
  const [qteAchat, setqteAchat] = useState(1);
  const [cap, setcap] = useState("");
  const [color, setcolor] = useState("");
  const [qteDispo, setqteDispo] = useState("Select vos options");
  const [prix, setprix] = useState("Select vos options");
  const [idCar, setidCar] = useState("");

  const [caracteristiqueInfo, setcaracteristiqueInfo] = useState({
    idCaracteristique: "",
    capacite: "",
    color: "",
    description: "",
    prix: "",
    quantiteDispo: "",
  });

  const [errorInput, seterrorInput] = useState({
    capacite: "",
    color: "",
    description: "",
    prix: "",
    quantiteDispo: "",
  });

  const btn = useRef(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth);

  // définit le prix et la quantité disponible
  useMemo(() => {
    const res = produit?.caracteristiques.find(
      (carac) => carac.color === color && carac.capacite === cap
    );
    if (res) {
      setqteDispo(res.quantiteDispo);
      setprix(res.prix);
      setidCar(res.idCaracteristique);
    } else {
      setqteDispo("Non disponible");
      setprix("Non disponible");
    }
  }, [cap, color]);

  // Récuperer l'produit avec son id
  useEffect(() => {
    setisLoading(true);
    axios
      .get(`/api/produit/${id}`)
      .then((res) => {
        setproduit(res.data);
      })
      .catch(() => setisError("erreur lors de chargement de l'produit"))
      .finally(() => setisLoading(false));
  }, [id]);

  // ajoute un élement au panier
  const addToPanier = () => {
    setisError("");
    if (!user)
      return setisError(
        () => "Vous devez être connecter pour ajouter un élement a votre panier"
      );

    const data = { quantiteAchat: qteAchat, idCaracteristique: idCar };
    setisLoading(true);
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    axios
      .post("/api/panier?idCaracteristique=" + idCar, data, config)
      .then((res) => {
        const resultat = {
          idProduitPanier: res.data.idProduitPanier,
          nomProduit: produit.nomProduit,
          photoProduit: produit.photoProduit,
          quantiteAchat: qteAchat,
          statusPanier: "en cours",
          caracteristique: {
            prix: prix,
            color: color,
            capacite: cap,
            idProduit: id,
          },
        };
        dispatch(addPanier(resultat));
        navigate("/panier");
      })
      .catch((err) => console.log(err.response))
      .finally(() => setisLoading(false));
  };

  // handle le changement des inputs
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setcaracteristiqueInfo((caracteristiqueInfo) => ({
      ...caracteristiqueInfo,
      [name]: value,
    }));
  };

  // valide le formulaire de connexion
  const validate = () => {
    //validate input
    let error = {};

    if (caracteristiqueInfo.capacite === "") {
      //validate capacite
      error.capacite = "capacite is required";
    }
    if (caracteristiqueInfo.description === "") {
      //validate description
      error.description = "description is required";
    }
    if (caracteristiqueInfo.color === "") {
      //validate color
      error.color = "color is required";
    }
    if (caracteristiqueInfo.prix === "") {
      //validate prix
      error.prix = "prix is required";
    }
    if (caracteristiqueInfo.quantiteDispo === "") {
      //validate prix
      error.quantiteDispo = "quantiteDispo is required";
    }
    seterrorInput(error);
    return error;
  };

  // Créer une nouvelle caracteristique
  const createCaracteristique = () => {
    setisError(false);
    const error = validate();
    seterrorInput(error);

    if (Object.keys(error).length !== 0) {
      return;
    }

    if (caracteristiqueInfo.idCaracteristique) {
      updateCaracteristique();
      return;
    }

    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    setisLoading(true);
    axios
      .post(`/api/caracteristique?idProduit=${id}`, caracteristiqueInfo, config)
      .then((res) => {
        setproduit((produit) => ({
          ...produit,
          caracteristiques: [...produit.caracteristiques, res.data],
        }));
        setcaracteristiqueInfo({
          id: "",
          capacite: "",
          color: "",
          description: "",
          prix: "",
          quantiteDispo: "",
        });
        btn.current.click();
      })
      .catch((err) => setisError("Erreur lors de la création"))
      .finally(() => setisLoading(false));
  };

  const updateCaracteristique = () => {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    setisLoading(true);
    axios
      .put(
        `/api/caracteristique/${caracteristiqueInfo.idCaracteristique}`,
        caracteristiqueInfo,
        config
      )
      .then((res) => {
        setproduit((produit) => ({
          ...produit,
          caracteristiques: produit.caracteristiques.filter(
            (carac) =>
              carac.idCaracteristique !== caracteristiqueInfo.idCaracteristique
          ),
        }));
        setproduit((produit) => ({
          ...produit,
          caracteristiques: [...produit.caracteristiques, res.data],
        }));
        setcaracteristiqueInfo({
          id: "",
          capacite: "",
          color: "",
          description: "",
          prix: "",
          quantiteDispo: "",
        });
        btn.current.click();
      })
      .catch((err) => setisError("Erreur lors de la mise a jours"))
      .finally(() => setisLoading(false));
  };

  const deleteCaracteristique = (id) => {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    setisLoading(true);
    axios
      .delete(`/api/caracteristique/${id}`, config)
      .then((res) => {
        setproduit((produit) => ({
          ...produit,
          caracteristiques: produit.caracteristiques.filter(
            (carac) => carac.idCaracteristique !== id
          ),
        }));
      })
      .catch((err) => setisError("Erreur lors de la suppression"))
      .finally(() => setisLoading(false));
  };

  const updateForm = (carac) => {
    setcaracteristiqueInfo(carac);
  };

  const resetId = () => {
    setcaracteristiqueInfo((prev) => ({
      idCaracteristique: "",
      capacite: "",
      color: "",
      description: "",
      prix: "",
      quantiteDispo: "",
    }));
  };

  return {
    qteDispo,
    prix,
    btn,
    produit,
    isLoading,
    isError,
    qteAchat,
    caracteristiqueInfo,
    errorInput,
    setqteAchat,
    setcap,
    setcolor,
    addToPanier,
    handleChange,
    createCaracteristique,
    deleteCaracteristique,
    updateForm,
    resetId,
  };
};
export default useDetail;
