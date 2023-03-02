import { useContext } from 'react';
import { ErrorMessage } from '../components/ErrorMessage';
import { PublicationList } from '../components/PublicationList';
import usePublications from '../hooks/usePublications';
import { AuthContext } from '../context/AuthContext';
import { NewPublication } from '../components/NewPublication';

export const HomePage = () => {
  const {
    publications,
    error,
    addPublication,
    removePublication,
    likePublication,
    unlikePublication
  } = usePublications();
  const { user } = useContext(AuthContext);

  if (error) return <ErrorMessage message={error} />;

  return (
    <section>
      {user ? <NewPublication addPublication={addPublication} /> : null}

      <PublicationList
        publications={publications}
        removePublication={removePublication}
        likePublication={likePublication}
        unlikePublication={unlikePublication}
      />
    </section>
  );
};
