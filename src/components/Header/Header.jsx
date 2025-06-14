import { useSelector } from "react-redux";
import { useLocation } from 'react-router-dom';
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import Logo from '../Logo/Logo';
import Navigation from '../Navigation/Navigation';
import UserMenu from "../UserMenu/UserMenu";
import AuthNav from "../AuthNav/AuthNav";


import s from './Header.module.css';


const Header = ({ onLoginOpen, onRegisterOpen }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const location = useLocation();

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
        <Navigation />
      </div>
      {isLoggedIn ? (
        <UserMenu />
      ) : (
        <AuthNav onLoginOpen={onLoginOpen} onRegisterOpen={onRegisterOpen} />
      )}
    </header>
  );
};
export default Header;