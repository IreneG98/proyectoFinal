import { useEffect, useState } from 'react';
import { getSinglePublicationService } from '../services';

const usePublication = (id) => {
  const [publication, setPublication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadPublication = async () => {
      try {
        setLoading(true);
        const data = await getSinglePublicationService(id);
        setPublication(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    loadPublication();
  }, [id]);

  return { publication, loading, error };
};
export default usePublication;
