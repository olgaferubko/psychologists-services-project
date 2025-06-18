import { Routes, Route } from "react-router-dom";
import { lazy, Suspense, useState } from "react";
import AuthModal from "../components/AuthModal/AuthModal";
import RegistrationModal from "../components/RegistrationModal/RegistrationModal";
import Loader from "../components/Loader/Loader";
import PrivateRoute from "./PrivateRoute";
import RestrictedRoute from "./RestrictedRoute";

const HomePage = lazy(() => import("../pages/HomePage/HomePage"));
const PsychologistsPage = lazy(() => import("../pages/PsychologistsPage/PsychologistsPage"));
const FavoritesPage = lazy(() => import("../pages/FavoritesPage/FavoritesPage"));
const ErrorPage = lazy(() => import("../pages/ErrorPage/ErrorPage"));

const LoginPage = ({ onLoginOpen }) => {
  onLoginOpen();
  return null;
};

const RegisterPage = ({ onRegisterOpen }) => {
  onRegisterOpen();
  return null;
};

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
        <Route
          path="/"
          element={
            <HomePage
              onLoginOpen={() => setLoginOpen(true)}
              onRegisterOpen={() => setRegisterOpen(true)}
            />
          }
        />

        <Route
          path="/psychologists"
          element={
            <PsychologistsPage
              onLoginOpen={() => setLoginOpen(true)}
              onRegisterOpen={() => setRegisterOpen(true)}
            />
          }
        />

        <Route
          path="/favorites"
          element={
            <PrivateRoute>
              <FavoritesPage
                onLoginOpen={() => setLoginOpen(true)}
                onRegisterOpen={() => setRegisterOpen(true)}
              />
            </PrivateRoute>
          }
        />

         <Route
          path="/login"
          element={
            <RestrictedRoute>
              <LoginPage onLoginOpen={() => setLoginOpen(true)} />
            </RestrictedRoute>
          }
        />

        <Route
          path="/register"
          element={
            <RestrictedRoute>
              <RegisterPage onRegisterOpen={() => setRegisterOpen(true)} />
            </RestrictedRoute>
          }
        />

        <Route path="*" element={<ErrorPage />} />
      </Routes>

      {isLoginOpen && <AuthModal onClose={handleModalClose} />}
      {isRegisterOpen && <RegistrationModal onClose={handleModalClose} />}
    </Suspense>
  );
}

export default App;
