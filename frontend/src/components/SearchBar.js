import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

export const SearchBar = () => {
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get('search') || '');

  return (
    <form>
      <fieldset>
        <label htmlFor="search">Barra de busqueda</label>
        <input
          type="text"
          id="search"
          name="search"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
      </fieldset>
      <Link to={`/search?search=${search}`}>Buscar</Link>
    </form>
  );
};
