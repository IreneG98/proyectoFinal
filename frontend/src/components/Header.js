import { Link } from 'react-router-dom';
import { Auth } from './Auth';
import { SearchBar } from './SearchBar';

export const Header = () => {
  return (
    <header className="flex-container">
      <h1 className="flex-items">
        <Link to="/publications" className="title">
          Viajes Recomendados
        </Link>
      </h1>
      <nav className="flex-items">
        <Auth />
      </nav>
      <nav className="flex-items">
        <SearchBar />
      </nav>
    </header>
  );
};
