import { Link } from 'react-router-dom';
export const NotFoundPage = () => {
  return (
    <section>
      <h1>Not found</h1>
      <Link to="/">Go to Home Page</Link>
    </section>
  );
};
