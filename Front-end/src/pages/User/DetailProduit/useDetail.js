import { useEffect, useState, useMemo } from "react";
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

  return {
    setcap,
    setcolor,
    qteDispo,
    prix,
    addToPanier,
    produit,
    isLoading,
    isError,
    qteAchat,
    setqteAchat,
  };
};
export default useDetail;
