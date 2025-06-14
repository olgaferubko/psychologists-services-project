import { useEffect, useState } from 'react';
import { getDatabase, ref, onValue } from 'firebase/database';
import s from './PsychologistsList.module.css';
import PsychologistsCard from "../PsychologistsCard/PsychologistsCard";
import Loader from '../Loader/Loader';

export default function PsychologistsList() {
  const [allPsychologists, setAllPsychologists] = useState([]);
  const [visibleCount, setVisibleCount] = useState(3);
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

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 3);
  };

  const visiblePsychologists = allPsychologists.slice(0, visibleCount);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className={s.containerList}>
      {visiblePsychologists.map((psych, idx) => (
        <PsychologistsCard key={idx} data={psych} />
      ))}

      {visibleCount < allPsychologists.length && (
        <button onClick={handleLoadMore} className={s.loadMoreBtn}>
          Load more
        </button>
      )}
    </div>
  );
}
