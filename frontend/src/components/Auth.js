import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export const Auth = () => {
  const { user, logout } = useContext(AuthContext);

  return user ? (
    <p className="useremail">
      {user.email}
      <button className="closesesion" onClick={logout}>
        Cerrar sesión
      </button>
    </p>
  ) : (
    <ul className="nav">
      <li>
        <Link to="/register" className="navText">
          Register
        </Link>
      </li>
      <li>
        <Link to="/login" className="navText">
          Login
        </Link>
      </li>
    </ul>
  );
};
