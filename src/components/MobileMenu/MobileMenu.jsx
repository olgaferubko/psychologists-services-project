import { NavLink } from "react-router-dom";
import { MdClose } from "react-icons/md";
import clsx from "clsx";
import UserMenu from "../UserMenu/UserMenu";
import AuthNav from "../AuthNav/AuthNav";
import s from './MobileMenu.module.css';

const linkBuilder = ({ isActive }) => clsx(s.link, isActive && s.active);

const MobileMenu = ({ isLoggedIn, onClose, onLoginOpen, onRegisterOpen }) => {
  return (
    <div className={s.backdrop} onClick={onClose}>
      <div className={s.menu} onClick={(e) => e.stopPropagation()}>
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

         <div className={s.authMobile}>
            {isLoggedIn ? (
              <UserMenu />
            ) : (
              <AuthNav onLoginOpen={onLoginOpen} onRegisterOpen={onRegisterOpen} />
            )}
        </div>
      </div>


    </div>
  );
};

export default MobileMenu;
