import { useSelector } from "react-redux";
import { useLocation } from 'react-router-dom';
import { useState } from 'react';

import { selectIsLoggedIn } from "../../redux/auth/selectors";
import Logo from '../Logo/Logo';
import Navigation from '../Navigation/Navigation';
import UserMenu from "../UserMenu/UserMenu";
import AuthNav from "../AuthNav/AuthNav";
import MobileMenu from "../MobileMenu/MobileMenu";
import { IoIosMenu } from "react-icons/io";

import s from './Header.module.css';

const Header = ({ onLoginOpen, onRegisterOpen }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const location = useLocation();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMobileMenuOpen(prev => !prev);
  };

  const headerClass = `${s.header} ${
    location.pathname === '/' 
      ? s.home 
      : location.pathname === '/psychologists' 
      ? s.psychologists 
      : ''
  }`;

  return (
    <header className={headerClass}>
      <div className={s.nav}>
        <Logo />
        <nav className={s.desktopNav}>
          <Navigation />
        </nav>
      </div>

      <div className={s.auth}>
        <div className={s.authNav}>
          {isLoggedIn ? (
            <UserMenu />
          ) : (
            <AuthNav onLoginOpen={onLoginOpen} onRegisterOpen={onRegisterOpen} />
          )}
        </div>

        <button className={s.burger} onClick={toggleMenu} aria-label="Open menu">
          <IoIosMenu size={32} />
        </button>
      </div>

      {isMobileMenuOpen && (
        <MobileMenu
          isLoggedIn={isLoggedIn}
          onClose={() => setMobileMenuOpen(false)}
          onLoginOpen={onLoginOpen}
          onRegisterOpen={onRegisterOpen}
        />
      )}
    </header>
  );
};

export default Header;
