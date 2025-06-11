import s from "./Navigation.module.css";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import { NavLink } from "react-router-dom";
import clsx from "clsx";

const linkBuilder = ({ isActive }) => {
    return clsx(s.link, isActive && s.active);
};

const Navigation = () => {
const isLoggedIn = useSelector(selectIsLoggedIn);

    return (
      <nav className={s.navList}>
        <NavLink to="/" className={linkBuilder}>
          Home
        </NavLink>
        <NavLink to="/psychologists" className={linkBuilder}>
          Psychologists
        </NavLink>
        {isLoggedIn && (
          <NavLink to="/favourites" className={linkBuilder}>
            Favorites
          </NavLink>
        )}
      </nav>
    );
}

export default Navigation;