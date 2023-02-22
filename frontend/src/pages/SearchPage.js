import { useContext } from 'react';
import { ErrorMessage } from '../components/ErrorMessage';
import { PublicationList } from '../components/PublicationList';
import useSearchResults from '../hooks/useSearchResults';
import { AuthContext } from '../context/AuthContext';
import { NewPublication } from '../components/NewPublication';

export const SearchPage = () => {
  const { publications, loading, error, addPublication, removePublication } =
    useSearchResults();
  const { user } = useContext(AuthContext);

  if (loading) return <p>cargando publicaciones...</p>;
  if (error) return <ErrorMessage message={error} />;

  return (
    <section>
      {user ? <NewPublication addPublication={addPublication} /> : null}

      <h1>Ultimos viajes</h1>

      <PublicationList
        publications={publications}
        removePublication={removePublication}
      />
    </section>
  );
};
