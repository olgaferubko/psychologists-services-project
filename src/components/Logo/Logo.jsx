import { Link } from 'react-router-dom';
import s from './Logo.module.css';

const Logo = () => {
    return (
        <>
            <Link className={s.logo} to="/">
                psychologists<span className={s.point}>.</span><span className={s.logoSpan}>services</span>
            </Link>
        </>
    );
};

export default Logo;