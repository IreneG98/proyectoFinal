import { useContext, useState, useRef } from 'react';
import { AuthContext } from '../context/AuthContext';
import {
  sendPublicationService,
  addPublicationPhotoService
} from '../services';

export const NewPublication = ({ addPublication }) => {
  const [error, setError] = useState('');
  const [sending, setSending] = useState(false);
  const { token } = useContext(AuthContext);
  const photosInputRef = useRef();

  const handleForm = async (e) => {
    e.preventDefault();

    try {
      setSending(true);
      const data = Object.fromEntries(new FormData(e.target));
      const publicationPhotos = photosInputRef.current.files;
      if (publicationPhotos.length > 5) {
        throw new Error('No se pueden añadir más de 5 fotos a la publicación');
      }
      const publication = await sendPublicationService({ data, token });
      for (const photo of publicationPhotos) {
        const photoData = new FormData();
        photoData.set('publicationPhoto', photo);
        const uploadedPhoto = await addPublicationPhotoService({
          id: publication.id,
          token,
          data: photoData
        });
        publication.photos.push(uploadedPhoto);
      }

      addPublication(publication);
      e.target.reset();
    } catch (error) {
      setError(error.message);
    } finally {
      setSending(false);
    }
  };

  return (
    <section>
      <div className="bold-line"></div>
      <div className="container">
        <div className="window2">
          <div className="overlay2"></div>
          <div className="content">
            <div className="welcome">Nueva publicación</div>
            <form onSubmit={handleForm}>
              <div className="input-fields">
                <label htmlFor="title"></label>
                <input
                  placeholder="Título"
                  className="input-line full-width"
                  type="text"
                  id="title"
                  name="title"
                  required
                />
                <legend className="category">Categoría:</legend>
                <label className="radio" htmlFor="nieve">
                  Nieve
                </label>
                <input type="radio" id="nieve" name="category" value="nieve" />
                <label className="radio" htmlFor="playa">
                  Playa
                </label>
                <input type="radio" id="playa" name="category" value="playa" />
                <label className="radio" htmlFor="ciudad">
                  Ciudad
                </label>
                <input
                  type="radio"
                  id="ciudad"
                  name="category"
                  value="ciudad"
                />
                <label className="radio" htmlFor="montaña">
                  Montaña
                </label>
                <input
                  type="radio"
                  id="montaña"
                  name="category"
                  value="montaña"
                />
                <label className="radio" htmlFor="crucero">
                  Crucero
                </label>
                <input
                  type="radio"
                  id="crucero"
                  name="category"
                  value="crucero"
                />
                <label className="radio" htmlFor="interrail">
                  Interrail
                </label>
                <input
                  type="radio"
                  id="interrail"
                  name="category"
                  value="interrail"
                />
                <label className="radio" htmlFor="senderismo">
                  Senderismo
                </label>
                <input
                  type="radio"
                  id="senderismo"
                  name="category"
                  value="senderismo"
                />
                <label className="radio" htmlFor="relax">
                  Relax
                </label>
                <input type="radio" id="relax" name="category" value="relax" />
                <label htmlFor="place"></label>
                <input
                  placeholder="Lugar"
                  className="input-line full-width"
                  type="text"
                  id="place"
                  name="place"
                  required
                />
                <label htmlFor="description"></label>
                <input
                  placeholder="Descripción"
                  className="input-line full-width"
                  type="text"
                  id="description"
                  name="description"
                  required
                />
                <label htmlFor="text"></label>
                <input
                  placeholder="Texto"
                  className="input-line full-width"
                  type="text"
                  id="text"
                  name="text"
                  required
                />
                <label htmlFor="image" id="photo">
                  Fotos
                </label>
                <input
                  style={{ display: 'none' }}
                  placeholder="Imagen (optional)"
                  className="input-line full-width"
                  type="file"
                  id="image"
                  multiple
                  ref={photosInputRef}
                />
                <button className="buttonpublication">Publicar</button>
                {sending ? <p>Sending publication</p> : null}
                {error ? <p>{error}</p> : null}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
