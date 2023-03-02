import { useContext, useState } from 'react';
import { loginUserService } from '../services';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleForm = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const data = await loginUserService({ email, password });
      login(data);
      navigate('/publications');
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
            <div className="welcome">Iniciar sesión</div>
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
                <label htmlFor="password"></label>
                <input
                  placeholder="Contraseña"
                  className="input-line full-width"
                  type="password"
                  id="password"
                  name="password"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button className="ghost-round full-width">Login</button>
                {error ? <p>{error}</p> : null}
              </div>
            </form>
            <div className="missyou">Te hemos echado de menos...</div>
          </div>
        </div>
      </div>
    </section>
  );
};
