import { useContext, useEffect, useState } from 'react';
import { getSinglePublicationService } from '../services';
import { AuthContext } from '../context/AuthContext';
const usePublication = (id) => {
  const [publication, setPublication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { token } = useContext(AuthContext);

  useEffect(() => {
    const loadPublication = async () => {
      try {
        setLoading(true);
        const data = await getSinglePublicationService(id, token);
        setPublication(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    loadPublication();
  }, [id]);

  const likePublication = () => {
    publication.likes++;
    publication.loggedUserLiked = true;
    setPublication({ ...publication });
  };

  const unlikePublication = () => {
    publication.likes--;
    publication.loggedUserLiked = false;
    setPublication({ ...publication });
  };
  return { publication, loading, error, likePublication, unlikePublication };
};
export default usePublication;
