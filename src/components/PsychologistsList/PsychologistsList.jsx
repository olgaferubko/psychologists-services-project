import { useState } from 'react';
import s from './PsychologistsList.module.css';
import PsychologistsCard from '../PsychologistsCard/PsychologistsCard';
import FilterPanel from '../FilterPanel/FilterPanel';

export default function PsychologistsList({ psychologists }) {
  const [visibleCount, setVisibleCount] = useState(3);
  const [filteredList, setFilteredList] = useState(psychologists);

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 3);
  };

  const handleFilterChange = (value) => {
    const sorted = [...psychologists];

    switch (value) {
      case 'az':
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'za':
        sorted.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'priceLow':
        sorted.sort((a, b) => a.price_per_hour - b.price_per_hour);
        break;
      case 'priceHigh':
        sorted.sort((a, b) => b.price_per_hour - a.price_per_hour);
        break;
      case 'ratingHigh':
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      case 'ratingLow':
        sorted.sort((a, b) => a.rating - b.rating);
        break;
      default:
        return setFilteredList(psychologists);
    }

    setFilteredList(sorted);
    setVisibleCount(3);
  };

  const visiblePsychologists = filteredList.slice(0, visibleCount);

  return (
    <div className={s.containerList}>
      <FilterPanel onFilterChange={handleFilterChange} />

      {visiblePsychologists.map((psych, idx) => (
        <PsychologistsCard key={idx} data={psych} />
      ))}

      {visibleCount < filteredList.length && (
        <div className={s.containerButton}>
          <button onClick={handleLoadMore} className={s.loadMoreBtn}>
          Load more
        </button>
        </div>
      )}
    </div>
  );
}
