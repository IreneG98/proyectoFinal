import { useEffect, useState, useContext } from 'react';
import { getAllPublicationsService } from '../services';
import { AuthContext } from '../context/AuthContext';

const usePublications = () => {
  const [publications, setPublications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const { token } = useContext(AuthContext);

  useEffect(() => {
    const loadPublications = async () => {
      try {
        setLoading(true);

        const data = await getAllPublicationsService(token);

        setPublications(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadPublications();
  }, []);

  const addPublication = (publication) => {
    console.log(publication, publications);
    setPublications([publication, ...publications]);
  };

  const removePublication = (id) => {
    setPublications(
      publications.filter((publication) => publication.id !== id)
    );
  };

  const likePublication = (id) => {
    const publicationIndex = publications.findIndex(
      (publication) => publication.id === id
    );
    publications[publicationIndex].likes++;
    publications[publicationIndex].loggedUserLiked = true;
    setPublications([...publications]);
  };

  const unlikePublication = (id) => {
    const publicationIndex = publications.findIndex(
      (publication) => publication.id === id
    );
    publications[publicationIndex].likes--;
    publications[publicationIndex].loggedUserLiked = false;
    setPublications([...publications]);
  };

  return {
    publications,
    loading,
    error,
    addPublication,
    removePublication,
    likePublication,
    unlikePublication
  };
};

export default usePublications;
