import s from './AuthNav.module.css';

export default function AuthNav({ onLoginOpen, onRegisterOpen }) {
  return (
    <div className={s.linksContainer}>
      <button className={s.login} onClick={onLoginOpen}>
        Log In
      </button>
      <button className={s.register} onClick={onRegisterOpen}>
        Registration
      </button>
    </div>
  );
}
