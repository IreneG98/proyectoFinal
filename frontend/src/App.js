import './App.css';
import { Routes, Route } from 'react-router-dom';

import { Footer } from './components/Footer';
import { Header } from './components/Header';

import { HomePage } from './pages/HomePage';
import { RegisterPage } from './pages/RegisterPage';
import { LoginPage } from './pages/LoginPage';
import { PublicationPage } from './pages/PublicationPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { SearchPage } from './pages/SearchPage';

function App() {
  return (
    <main>
      <Header />
      <Routes>
        <Route path="/publications" element={<HomePage />} />
        <Route path="/publications/:id" element={<PublicationPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </main>
  );
}

export default App;
