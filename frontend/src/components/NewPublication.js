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
    <form onSubmit={handleForm}>
      <h1>Add new publication</h1>
      <fieldset>
        <label htmlFor="title">Titulo</label>
        <input type="text" id="title" name="title" required />
      </fieldset>
      <fieldset>
        <legend>Categoria</legend>
        <label htmlFor="nieve">Nieve</label>
        <input type="radio" id="nieve" name="category" value="nieve" />
        <label htmlFor="playa">Playa</label>
        <input type="radio" id="playa" name="category" value="playa" />
        <label htmlFor="ciudad">Ciudad</label>
        <input type="radio" id="ciudad" name="category" value="ciudad" />
        <label htmlFor="montaña">Montaña</label>
        <input type="radio" id="montaña" name="category" value="montaña" />
        <label htmlFor="crucero">Crucero</label>
        <input type="radio" id="crucero" name="category" value="crucero" />
        <label htmlFor="interrail">Interrail</label>
        <input type="radio" id="interrail" name="category" value="interrail" />
        <label htmlFor="senderismo">Senderismo</label>
        <input
          type="radio"
          id="senderismo"
          name="category"
          value="senderismo"
        />
        <label htmlFor="relax">Relax</label>
        <input type="radio" id="relax" name="category" value="relax" />
      </fieldset>
      <fieldset>
        <label htmlFor="place">Lugar</label>
        <input type="text" id="place" name="place" required />
      </fieldset>
      <fieldset>
        <label htmlFor="description">Descripcion</label>
        <input type="text" id="description" name="description" required />
      </fieldset>
      <fieldset>
        <label htmlFor="text">Text</label>
        <input type="text" id="text" name="text" required />
      </fieldset>
      <fieldset>
        <label htmlFor="image">Imagenes (optional)</label>
        <input type="file" id="image" multiple ref={photosInputRef} />
      </fieldset>
      <button>Send publication</button>
      {sending ? <p>Sending publication</p> : null}
      {error ? <p>{error}</p> : null}
    </form>
  );
};
