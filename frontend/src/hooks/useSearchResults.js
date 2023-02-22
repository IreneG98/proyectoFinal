import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { searchResultsService } from '../services';

const usePublications = () => {
  const [publications, setPublications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchParams] = useSearchParams();
  useEffect(() => {
    const loadPublications = async () => {
      try {
        setLoading(true);

        const data = await searchResultsService({
          search: searchParams.toString()
        });

        setPublications(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
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

  return { publications, loading, error, addPublication, removePublication };
};

export default usePublications;
