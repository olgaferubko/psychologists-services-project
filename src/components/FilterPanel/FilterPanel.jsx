import { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import { FaChevronUp } from "react-icons/fa";
import s from './FilterPanel.module.css';

const options = [
    { value: 'az', label: 'A to Z' },
    { value: 'za', label: 'Z to A' },
    { value: 'priceLow', label: 'Price: Low to high' },
    { value: 'priceHigh', label: 'Price: High to low' },
    { value: 'ratingHigh', label: 'Popular' },
    { value: 'ratingLow', label: 'Not popular' },
    { value: 'all', label: 'Show all' },
];

export default function FilterPanel({ onFilterChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);


  const toggleDropdown = () => {
    setIsOpen(prev => !prev);
  };

  const handleOptionClick = option => {
    setSelectedOption(option);
    setIsOpen(false);
    onFilterChange(option.value);
  };

  return (
    <div className={s.wrapper}>
      <p className={s.label}>Filters</p>
      <div className={s.dropdown}>
        <button onClick={toggleDropdown} className={s.button}>
            {selectedOption ? selectedOption.label : 'Choose filter'} {isOpen ? <FaChevronUp /> : <FaChevronDown />}
        </button>
        {isOpen && (
          <ul className={s.menu}>
            {options.map(option => (
              <li
                key={option.value}
                onClick={() => handleOptionClick(option)}
                className={s.option}
              >
                {option.label}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
