import { Routes, Route } from "react-router-dom";
import { lazy, Suspense, useState } from "react";
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


  const handleModalClose = () => {
    setLoginOpen(false);
    setRegisterOpen(false);
  };

  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<HomePage onLoginOpen={() => setLoginOpen(true)} onRegisterOpen={() => setRegisterOpen(true)} />} />
<Route path="/psychologists" element={<PsychologistsPage onLoginOpen={() => setLoginOpen(true)} onRegisterOpen={() => setRegisterOpen(true)} />} />
        <Route path="/favourites" element={<FavouritesPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>

      {isLoginOpen && <AuthModal onClose={handleModalClose} />}
      {isRegisterOpen && <RegistrationModal onClose={handleModalClose} />}
    </Suspense>
  );
}

export default App;
