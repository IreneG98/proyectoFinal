import { useParams } from 'react-router-dom';
import { ErrorMessage } from '../components/ErrorMessage';
import { Publication } from '../components/Publication';
import usePublication from '../hooks/usePublication';

export const PublicationPage = () => {
  const { id } = useParams();
  const { publication, loading, error, likePublication, unlikePublication } =
    usePublication(id);

  if (loading) return <p></p>;
  if (error) return <ErrorMessage message={error} />;

  return (
    <section>
      <div className="bold-line"></div>
      <div className="container">
        <div className="window3">
          <div className="overlay3"></div>
          <div className="content">
            <div className="input-fields"></div>
            <Publication
              publication={publication}
              likePublication={likePublication}
              unlikePublication={unlikePublication}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
