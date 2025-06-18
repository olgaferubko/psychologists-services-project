import { useEffect, useState } from 'react';
import PsychologistsList from '../../components/PsychologistsList/PsychologistsList';
import Loader from '../../components/Loader/Loader';
import Header from '../../components/Header/Header';
import s from '../PsychologistsPage/PsychologistsPage.module.css';

const FavoritesPage = ({ onLoginOpen, onRegisterOpen }) => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
    setLoading(false);
  }, []);

  return (
    <>
      <Header onLoginOpen={onLoginOpen} onRegisterOpen={onRegisterOpen} />
      <div className={s.container}>
        {loading ? (
          <Loader />
        ) : favorites.length > 0 ? (
          <PsychologistsList psychologists={favorites} />
        ) : (
          <p className={s.emptyMessage}>
            You don't have any favorite psychologists yet. Start exploring and add some to your list!
          </p>
        )}
      </div>
    </>
  );
};

export default FavoritesPage;
