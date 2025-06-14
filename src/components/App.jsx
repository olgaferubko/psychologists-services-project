import { Routes, Route } from "react-router-dom";
import { lazy, Suspense, useState } from "react";
import Header from "../components/Header/Header";
import AuthModal from "../components/AuthModal/AuthModal";
import RegistrationModal from "../components/RegistrationModal/RegistrationModal";
import Loader from "../components/Loader/Loader";

const HomePage = lazy(() => import("../pages/HomePage/HomePage"));
const PsychologistsPage = lazy(() => import("../pages/PsychologistsPage/PsychologistsPage"));
const FavouritesPage = lazy(() => import("../pages/FavouritesPage/FavouritesPage"));
const ErrorPage = lazy(() => import("../pages/ErrorPage/ErrorPage"));

function App() {
  const [isLoginOpen, setLoginOpen] = useState(false);
  const [isRegisterOpen, setRegisterOpen] = useState(false);

  const handleLoginOpen = () => setLoginOpen(true);
  const handleRegisterOpen = () => setRegisterOpen(true);
  const handleModalClose = () => {
    setLoginOpen(false);
    setRegisterOpen(false);
  };

  return (
    <Suspense fallback={<Loader />}>
      <Header
        onLoginOpen={handleLoginOpen}
        onRegisterOpen={handleRegisterOpen}
      />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/psychologists" element={<PsychologistsPage />} />
        <Route path="/favourites" element={<FavouritesPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>

      {isLoginOpen && <AuthModal onClose={handleModalClose} />}
      {isRegisterOpen && <RegistrationModal onClose={handleModalClose} />}
    </Suspense>
  );
}

export default App;
