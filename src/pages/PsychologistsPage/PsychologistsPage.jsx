import { useEffect, useState } from 'react';
import { getDatabase, ref, onValue } from 'firebase/database';
import PsychologistCard from '../../components/PsychologistsCard/PsychologistsCard';
import Header from '../../components/Header/Header';
import s from './PsychologistsPage.module.css';

const PsychologistsPage = () => {
  const [allPsychologists, setAllPsychologists] = useState([]);
  const [visibleCount, setVisibleCount] = useState(3);

  useEffect(() => {
    const db = getDatabase();
    const rootRef = ref(db, '/');

    onValue(rootRef, snapshot => {
      const data = snapshot.val();
      if (data) {
        const result = Object.values(data);
        setAllPsychologists(result);
      }
    });
  }, []);

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 3);
  };

  const visiblePsychologists = allPsychologists.slice(0, visibleCount);

  return (
    <div className={s.container}>
      <title>PsychologistsPage</title>
      <Header />

      {visiblePsychologists.map((psych, idx) => (
        <PsychologistCard key={idx} data={psych} />
      ))}

      {visibleCount < allPsychologists.length && (
        <button onClick={handleLoadMore} className={s.loadMoreBtn}>
          Load more
        </button>
      )}
    </div>
  );
};

export default PsychologistsPage;
