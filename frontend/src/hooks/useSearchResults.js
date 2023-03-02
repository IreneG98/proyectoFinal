import { useContext, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { searchResultsService } from '../services';

const usePublications = () => {
  const [publications, setPublications] = useState([]);
  const [error, setError] = useState('');
  const [searchParams] = useSearchParams();

  const { token } = useContext(AuthContext);

  useEffect(() => {
    const loadPublications = async () => {
      try {
        const data = await searchResultsService({
          search: searchParams.toString(),
          token
        });
        setPublications(data);
      } catch (error) {
        setError(error.message);
      }
    };

    loadPublications();
  }, [searchParams]);

  const addPublication = (publication) => {
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
    error,
    addPublication,
    removePublication,
    likePublication,
    unlikePublication
  };
};

export default usePublications;
