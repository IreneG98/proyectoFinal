import { Publication } from './Publication';

export const PublicationList = ({
  publications,
  removePublication,
  likePublication,
  unlikePublication
}) => {
  return publications.length ? (
    <ul>
      {publications.map((publication) => (
        <li key={publication.id}>
          <Publication
            publication={publication}
            removePublication={removePublication}
            likePublication={likePublication}
            unlikePublication={unlikePublication}
          />
        </li>
      ))}
    </ul>
  ) : (
    <p>No hay publicaciones todavia...</p>
  );
};
