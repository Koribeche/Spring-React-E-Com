import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { updateCommande } from "../../../features/user/commandeUser/commandeSlice";
import axios from "axios";

const useCommande = () => {
  const listCommande = useSelector((state) => state.commande);
  const [isLoading, setisLoading] = useState(false);
  const [isError, setisError] = useState(false);

  const dispatch = useDispatch();

  // rembourse une commande effectuer
  const rembourser = (id_payment) => {
    setisLoading(true);
    axios
      .post("/api/commande/refund", { id_payment })
      .then((res) => dispatch(updateCommande(res.data)))
      .catch(() => setisError("erreur lors du remboursement"))
      .finally(() => setisLoading(false));
  };

  return { listCommande, rembourser, isLoading, isError };
};
export default useCommande;
