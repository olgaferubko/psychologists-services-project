import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { MdClose } from "react-icons/md";
import { toast } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logIn } from '../../redux/auth/operations'; 

import s from './AuthModal.module.css';

const schema = Yup.object().shape({
  email: Yup.string().email('Invalid email format').required('Email is required'),
  password: Yup.string().min(6, 'At least 6 symbols').required('Password is required'),
});

const AuthModal = ({ onClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };

  const onSubmit = values => {
    dispatch(logIn(values))
      .unwrap()
      .then(() => {
        toast.success("Logged in");
        onClose();
        navigate("/psychologists", { replace: true });
      })
      .catch(() => {
        toast.error("Oops! Something went wrong. Check your data.");
      });
  };

  const handleBackdropClick = e => {
    if (e.target.classList.contains(s.backdrop)) {
      onClose();
    }
  };

  useEffect(() => {
    const handleKeyDown = e => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return ReactDOM.createPortal(
    <div className={s.backdrop} onClick={handleBackdropClick}>
      <div className={s.modal}>
        <button className={s.closeBtn} onClick={onClose}><MdClose /></button>
        <h2 className={s.heading}>Log In</h2>
        <p className={s.text}>
          Welcome back! Please enter your credentials to access your account and continue your search for a psychologist.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} noValidate className={s.form}>
          <label className={s.label}>
            <input type="email" {...register('email')} placeholder='Email' className={s.input} />
          </label>
          <p className={s.error}>{errors.email?.message}</p>

          <label className={s.label}>
            <input
              type={showPassword ? 'text' : 'password'}
              {...register('password')}
              placeholder='Password'
              className={s.input}
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className={s.togglePasswordBtn}
            >
              {showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
            </button>
          </label>
          <p className={s.error}>{errors.password?.message}</p>

          <button type="submit" className={s.submitBtn}>Log In</button>
        </form>
      </div>
    </div>,
    document.getElementById('modal-root')
  );
};

export default AuthModal;
