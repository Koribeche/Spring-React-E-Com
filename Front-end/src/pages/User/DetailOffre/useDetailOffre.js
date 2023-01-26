import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";

const useDetailOffre = () => {
  const { id } = useParams();
  const [offre, setoffre] = useState(null);
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState(false);
  const location = useLocation();

  // Récuperer l'offre avec son id
  useEffect(() => {
    if (location.state) return setoffre(location.state);

    setloading(true);
    axios
      .get(`/api/offre/${id}`)
      .then((res) => {
        setoffre(res.data);
      })
      .catch(() => seterror("erreur lors de chargement de l'offre"))
      .finally(() => setloading(false));
  }, [id, location.state]);

  return { offre, loading, error };
};
export default useDetailOffre;
