import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUserService } from '../services';

export const RegisterPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [username, setUserName] = useState('');
  const [pass1, setPass1] = useState('');
  const [pass2, setPass2] = useState('');
  const [error, setError] = useState('');

  const handleForm = async (e) => {
    e.preventDefault();
    setError('');
    if (pass1 !== pass2) {
      setError('Passwords do not match');
      return;
    }
    try {
      await registerUserService({ email, username, password: pass1 });

      navigate('/login');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <section>
      <div className="bold-line"></div>
      <div className="container">
        <div className="window">
          <div className="overlay"></div>
          <div className="content">
            <div className="welcome">Bienvenid@!</div>
            <form onSubmit={handleForm}>
              <div className="input-fields">
                <label htmlFor="email"></label>
                <input
                  placeholder="Email"
                  className="input-line full-width"
                  type="email"
                  id="email"
                  name="email"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
                <label htmlFor="username"></label>
                <input
                  placeholder="Username"
                  className="input-line full-width"
                  type="username"
                  id="username"
                  name="username"
                  required
                  onChange={(e) => setUserName(e.target.value)}
                />
                <label htmlFor="pass1"></label>
                <input
                  placeholder="Contraseña"
                  className="input-line full-width"
                  type="password"
                  id="pass1"
                  name="pass1"
                  required
                  onChange={(e) => setPass1(e.target.value)}
                />
                <label htmlFor="pass2"></label>
                <input
                  placeholder="Repetir contraseña"
                  className="input-line full-width"
                  type="password"
                  id="pass2"
                  name="pass2"
                  required
                  onChange={(e) => setPass2(e.target.value)}
                />
                <button className="ghost-round full-width">Crear cuenta</button>
                {error ? <p>{error}</p> : null}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
