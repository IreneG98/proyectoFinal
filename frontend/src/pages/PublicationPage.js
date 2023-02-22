import { useParams } from 'react-router-dom';
import { ErrorMessage } from '../components/ErrorMessage';
import { Publication } from '../components/Publication';
import usePublication from '../hooks/usePublication';

export const PublicationPage = () => {
  const { id } = useParams();
  const { publication, loading, error } = usePublication(id);

  if (loading) return <p>cargando publicacion...</p>;
  if (error) return <ErrorMessage message={error} />;

  return (
    <section>
      <h1>Publicacion</h1>
      <Publication publication={publication} />
      <p>{publication.text}</p>
      {publication.comments.length
        ? publication.comments.map((commenty) => (
            <p key={commenty.idUser}>{commenty.comment}</p>
          ))
        : null}
    </section>
  );
};
