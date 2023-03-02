import { useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

export const SearchBar = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="box">
      <form
        name="search"
        onSubmit={(e) => {
          e.preventDefault();
          if (location.pathname !== '/search') {
            navigate(`/search?search=${search}`);
          } else {
            setSearchParams(new URLSearchParams({ search }));
          }
        }}
      >
        <label htmlFor="search" id="buscar">
          buscar:
        </label>
        <input
          placeholder="¿Qué deseas encontrar?"
          className="input"
          type="text"
          id="search"
          name="search"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
      </form>
      <i className="fas fa-search"></i>
    </div>
  );
};
