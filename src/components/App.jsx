import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";

const HomePage = lazy(() => import("../pages/HomePage/HomePage"));
const PsychologistsPage = lazy(() => import("../pages/PsychologistsPage/PsychologistsPage"));
const FavouritesPage = lazy(() => import("../pages/FavouritesPage/FavouritesPage"));
const ErrorPage = lazy(() => import("../pages/ErrorPage/ErrorPage"));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/psychologists" element={<PsychologistsPage />} />
          <Route path="/favourites" element={<FavouritesPage />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
    </Suspense>
  );
}

export default App;
