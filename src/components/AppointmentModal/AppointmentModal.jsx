import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { MdClose } from "react-icons/md";
import s from './AppointmentModal.module.css';

const schema = yup.object().shape({
  userName: yup.string().required('Name is required'),
  userPhone: yup
    .string()
    .required('Phone number is required')
    .matches(/^\+380\d{9}$/, 'Phone must be in format +380XXXXXXXXX'),
  preferredTime: yup.string().required('Meeting time is required'),
  userEmail: yup.string().email('Invalid email').required('Email is required'),
  comment: yup.string().notRequired(),
});

export default function AppointmentModal({ onClose, avatar_url, psychologist }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log('Appointment Data:', data);
    alert(`Appointment made with ${psychologist}`);
    onClose();
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

  return (
    <div className={s.modalBackdrop} onClick={onClose} role="dialog" aria-modal="true">
      <div className={s.modal} onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className={s.closeButton} aria-label="Close modal">
          <MdClose />
        </button>
        <h2 className={s.header}>Make an appointment with a psychologist</h2>
        <p className={s.paragraph}>
          You are on the verge of changing your life for the better. Fill out the short form below
          to book your personal appointment with a professional psychologist. We guarantee
          confidentiality and respect for your privacy.
        </p>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className={s.psychologistsWrapper}>
            {avatar_url && (
              <img src={avatar_url} alt={`Photo of ${psychologist}`} className={s.photo} />
            )}
            <div className={s.nameWrapper}>
              <p>Your psychologist</p>
              <p>{psychologist}</p>
            </div>
          </div>

          <label className={s.label}>
            Name
            <input className={s.input} type="text" {...register('userName')} />
            {errors.userName && <span className={s.error}>{errors.userName.message}</span>}
          </label>

            <div className={s.telWrapper}>
              <label className={s.label}>
                +380
                <input className={s.input} type="tel" {...register('userPhone')} />
                {errors.userPhone && <span className={s.error}>{errors.userPhone.message}</span>}
              </label>

              <label className={s.label}>
                <input className={s.input} type="time" {...register('preferredTime')} />
                {errors.preferredTime && <span className={s.error}>{errors.preferredTime.message}</span>}
              </label>
            </div>

          <label className={s.label}>
            Email
            <input className={s.input} type="email" {...register('userEmail')} />
            {errors.userEmail && <span className={s.error}>{errors.userEmail.message}</span>}
          </label>

          <label className={s.label}>
            Comment
            <textarea className={s.text} {...register('comment')} />
          </label>

          <button className={s.sendBtn} type="submit">Send</button>
        </form>
      </div>
    </div>
  );
}
