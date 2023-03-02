import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export const Publication = ({
  publication,
  likePublication,
  unlikePublication
}) => {
  const navigate = useNavigate();
  const { user, token } = useContext(AuthContext);
  const [error, setError] = useState('');

  return (
    <article>
      <p>
        <Link to={`/publications/${publication.id}`} className="welcome">
          {publication.title}
        </Link>
      </p>
      <p className="input-line full-width">Categoría: {publication.category}</p>
      <p className="input-line full-width">Lugar: {publication.place}</p>
      <p className="input-line full-width">
        Descripción: {publication.description}
      </p>
      {publication.text && (
        <p className="input-line full-width">{publication.text}</p>
      )}
      {publication.photos.length
        ? publication.photos.map((photo) => (
            <img
              className="photo"
              key={photo.id}
              src={`${process.env.REACT_APP_BACKEND}/static/publication/${photo.name}`}
              alt={publication.place}
            />
          ))
        : null}

      {token && (
        <button
          id="heart"
          className={!publication.loggedUserLiked ? 'like' : 'liked'}
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
        ></button>
      )}
      {token && <p id="nheart">{publication.likes} </p>}
    </article>
  );
};
