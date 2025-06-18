import { useState, useRef, useEffect } from 'react';
import { FaRegClock } from 'react-icons/fa';
import s from './TimePicker.module.css';

const timeOptions = [
  '09 : 00', '09 : 30', '10 : 00', '10 : 30', '11 : 00',
  '11 : 30', '12 : 00', '12 : 30', '13 : 00', '13 : 30',
  '14 : 00', '14 : 30', '15 : 00', '15 : 30', '16 : 00',
  '16 : 30', '17 : 00', '17 : 30', '18 : 00',
];

export default function TimePicker({ value, onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={s.wrapper} ref={ref}>
      <div className={s.inputWrapper} onClick={() => setIsOpen(!isOpen)}>
        <span className={s.value}>{value || '00:00'}</span>
        <FaRegClock className={s.icon} />
      </div>

      {isOpen && (
        <div className={s.dropdown}>
          <p className={s.title}>Meeting time</p>
          <ul className={s.list}>
            {timeOptions.map((time) => (
                <li
                  key={time}
                  className={`${s.option} ${value === time ? s.active : ''}`}
                  onClick={() => {
                    onChange(time);
                    setIsOpen(false);
                  }}
                >
                  {(() => {
                    const [hours, minutes] = time.split(' : ');
                    return (
                      <span className={s.timeRow}>
                        <span className={s.time}>{hours}</span>
                        <span className={s.separator}>:</span>
                        <span className={s.time}>{minutes}</span>
                      </span>
                    );
                  })()}
                </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
