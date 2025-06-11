import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import Logo from '../Logo/Logo';
import Navigation from '../Navigation/Navigation';
import UserMenu from "../UserMenu/UserMenu";
import AuthNav from "../AuthNav/AuthNav";

import s from './Header.module.css';


const Header = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
    return (
        <header className={s.header}>
            <div className={s.nav}>
                <Logo />
                <Navigation />
            </div>
                {isLoggedIn ? <UserMenu /> : <AuthNav />}
        </header>
    );
};

export default Header;