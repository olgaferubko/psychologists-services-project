import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { MdClose } from "react-icons/md";
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { register as registerUser } from '../../redux/auth/operations';
import s from '../AuthModal/AuthModal.module.css';

const schema = Yup.object().shape({
  displayName: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email format').required('Email is required'),
  password: Yup.string().min(6, 'Password is required, at least 6 symbols').required('Password is required'),
});

const RegistrationModal = ({ onClose }) => {

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

    useEffect(() => {
        const handleKeyDown = e => {
        if (e.key === 'Escape') {
            onClose();
        }
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [onClose]);

    const handleBackdropClick = e => {
        if (e.target.classList.contains('backdrop')) {
        onClose();
        }
    };

    const onSubmit = values => {
        dispatch(registerUser(values))
        .unwrap()
        .then(() => {
            toast.success("Registered");
            onClose();
            navigate("/psychologists", { replace: true });
        })
        .catch((error) => {
            if (error.includes('auth/email-already-in-use')) {
              toast.error('This email is already registered');
            } else {
              toast.error("Oops! Something went wrong");
            }
          });

    };

  return ReactDOM.createPortal(
    <div className={s.backdrop} onClick={handleBackdropClick}>
      <div className={s.modal}>
        <button className={s.closeBtn} onClick={onClose}><MdClose /></button>
        <h2 className={s.heading}>Registration</h2>
        <p className={s.text}>Thank you for your interest in our platform! In order to register, we need some information. Please provide us with the following information.</p>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <label className={s.label}>
            <input type="text" {...register('displayName')} placeholder='Name' className={s.input} />
          </label>
            <p className={s.error}>{errors.displayName?.message}</p>

          <label className={s.label}>
            <input type="email" {...register('email')} placeholder='Email' className={s.input} />
          </label>
            <p className={s.error}>{errors.email?.message}</p>

          <label className={s.label}>
            <input type={showPassword ? "text" : "password"} 
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

          <button type="submit" className={s.submitBtn}>Sign Up</button>
        </form>
      </div>
    </div>,
    document.getElementById('modal-root')
  );
};

export default RegistrationModal;