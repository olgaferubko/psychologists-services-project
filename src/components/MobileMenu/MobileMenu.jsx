import { NavLink } from "react-router-dom";
import { MdClose, MdPeopleAlt, MdOutlineQuestionMark } from "react-icons/md";
import clsx from "clsx";

import s from './MobileMenu.module.css';

const linkBuilder = ({ isActive }) => clsx(s.link, isActive && s.active);

const MobileMenu = ({ isLoggedIn, onClose }) => {
  return (
    <div className={s.backdrop} onClick={onClose}>
      <div className={s.menu} onClick={(e) => e.stopPropagation()}>
        <span className={s.peopleWrapper}><MdPeopleAlt /></span>

        <button className={s.closeBtn} onClick={onClose}>
          <MdClose size={24} />
        </button>

        <nav className={s.nav}>
          <NavLink to="/" onClick={onClose} className={linkBuilder}>
            Home
          </NavLink>
          <NavLink to="/psychologists" onClick={onClose} className={linkBuilder}>
            Psychologists
          </NavLink>
          {isLoggedIn && (
            <NavLink to="/favorites" onClick={onClose} className={linkBuilder}>
              Favorites
            </NavLink>
          )}
        </nav>
        
        <span className={s.questionWrapper}><MdOutlineQuestionMark /></span>
      </div>
    </div>
  );
};

export default MobileMenu;
