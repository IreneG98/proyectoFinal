import { Link } from 'react-router-dom';
import { Auth } from './Auth';
import { SearchBar } from './SearchBar';

export const Header = () => {
  return (
    <header>
      <h1>
        <Link to="/publications">Viajes Recomendados</Link>
      </h1>
      <nav>
        <Auth />
      </nav>
      <nav>
        <SearchBar />
      </nav>
    </header>
  );
};
