import { Link } from 'react-router-dom';

export const ErrorMessage = ({ message }) => {
  return (
    <>
      <p>{message}</p>
      <Link to="/publications">Go back to home page</Link>
    </>
  );
};
