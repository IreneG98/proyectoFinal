import { Publication } from './Publication';

export const PublicationList = ({
  publications,
  removePublication,
  likePublication,
  unlikePublication
}) => {
  return publications.length ? (
    <ul className="publicationlist">
      {publications.map((publication) => (
        <section key={publication.id}>
          <div className="bold-line"></div>
          <div className="container">
            <div className="window4">
              <div className="overlay4"></div>
              <div className="content">
                <li className="listed" key={publication.id}>
                  <Publication
                    publication={publication}
                    removePublication={removePublication}
                    likePublication={likePublication}
                    unlikePublication={unlikePublication}
                  />
                </li>
              </div>
            </div>
          </div>
        </section>
      ))}
    </ul>
  ) : (
    <section>
      <div className="bold-line"></div>
      <div className="container">
        <div className="window5">
          <div className="overlay5"></div>
          <div className="content">
            <p className="input-fields">No hay publicaciones todavía...</p>
          </div>
        </div>
      </div>
    </section>
  );
};
