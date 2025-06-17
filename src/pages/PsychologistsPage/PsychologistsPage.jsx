import { useEffect, useState } from 'react';
import { getDatabase, ref, onValue } from 'firebase/database';
import PsychologistsList from '../../components/PsychologistsList/PsychologistsList';
import s from './PsychologistsPage.module.css';
import Loader from '../../components/Loader/Loader';
import Header from "../../components/Header/Header";

const PsychologistsPage = ({ onLoginOpen, onRegisterOpen }) => {
  const [allPsychologists, setAllPsychologists] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const db = getDatabase();
    const rootRef = ref(db, '/');

    onValue(rootRef, snapshot => {
      const data = snapshot.val();
      if (data) {
        const result = Object.values(data);
        setAllPsychologists(result);
      }
      setLoading(false);
    });
  }, []);

  return (
    <>
      <Header onLoginOpen={onLoginOpen} onRegisterOpen={onRegisterOpen} />
      <div className={s.container}>
        {loading ? (
          <Loader />
        ) : (
          <PsychologistsList psychologists={allPsychologists} />
        )}
      </div>
    </>
  );
};

export default PsychologistsPage;
