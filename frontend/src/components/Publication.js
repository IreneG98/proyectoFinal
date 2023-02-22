import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { deletePublicationService } from '../services';

export const Publication = ({
  publication,
  removePublication,
  likePublication,
  unlikePublication
}) => {
  const navigate = useNavigate();
  const { user, token } = useContext(AuthContext);
  const [error, setError] = useState('');

  const deletePublication = async (id) => {
    try {
      await deletePublicationService({ id, token });
      if (removePublication) {
        removePublication(id);
      } else {
        navigate('/publications');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <article>
      <p>{publication.title}</p>
      <p>{publication.category}</p>
      <p>{publication.place}</p>
      <p>{publication.description}</p>
      {publication.photos.length
        ? publication.photos.map((photo) => (
            <img
              key={photo.id}
              src={`${process.env.REACT_APP_BACKEND}/static/publication/${photo.name}`}
              alt={publication.place}
            />
          ))
        : null}

      <p>{publication.likes} </p>
      {token && (
        <button
          className={!publication.loggedUserLiked ? '' : 'liked'}
          onClick={async () => {
            const res = await fetch(
              `${process.env.REACT_APP_BACKEND}/publications/${publication.id}/like`,
              {
                method: !publication.loggedUserLiked ? 'POST' : 'DELETE',
                headers: {
                  Authorization: token
                }
              }
            );
            if (res.ok) {
              if (!publication.loggedUserLiked) {
                likePublication(publication.id);
              } else {
                unlikePublication(publication.id);
              }
            }
          }}
        >
          Like
        </button>
      )}

      <p>
        {user && user.id === publication.user_id ? (
          <section>
            <button
              onClick={() => {
                if (window.confirm('Are you sure?'))
                  deletePublication(publication.id);
              }}
            >
              Delete publication
            </button>
            {error ? <p>{error}</p> : null}
          </section>
        ) : null}
      </p>
    </article>
  );
};
