import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { MdClose } from "react-icons/md";
import s from './AppointmentModal.module.css';
import TimePicker from '../TimePicker/TimePicker';

const schema = yup.object().shape({
  userName: yup.string().required('Name is required'),
  userPhone: yup
    .string()
    .required('Phone number is required')
    .matches(/^\d{9}$/, 'Phone must have 9 digits after +380'),
  preferredTime: yup.string().required('Meeting time is required'),
  userEmail: yup.string().email('Invalid email').required('Email is required'),
  comment: yup.string().notRequired(),
});

export default function AppointmentModal({ onClose, avatar_url, psychologist }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
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
      <div className={`${s.modalWrapper} ${s.modal}`} onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className={s.closeButton} aria-label="Close modal">
          <MdClose className={s.close} />
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
              <p className={s.textPsych}>Your psychologist</p>
              <p className={s.psyName}>{psychologist}</p>
            </div>
          </div>

          <label className={s.label}>
            <input className={s.input} type="text" {...register('userName')} placeholder='Name' />
          </label>
          {errors.userName && <p className={s.error}>{errors.userName.message}</p>}

            <div className={s.telWrapper}>
              <label className={s.labelTel}>
                +380
                <input className={s.inputTel} type="tel" {...register('userPhone')} />
              </label>

              <label className={s.label}>
                <Controller
                  name="preferredTime"
                  control={control}
                  render={({ field }) => <TimePicker {...field} />}
                />  
              </label>
            </div>
            <div className={s.errorWrapper}>
            {errors.userPhone && <p className={s.error}>{errors.userPhone.message}</p>}
            {errors.preferredTime && <p className={s.error}>{errors.preferredTime.message}</p>}
            </div>

          <label className={s.label}>
            <input className={s.input} type="email" {...register('userEmail')} placeholder='Email' />
          </label>
          {errors.userEmail && <p className={s.error}>{errors.userEmail.message}</p>}

          <label className={s.label}>
            <textarea className={s.text} {...register('comment')} placeholder='Comment' />
          </label>

          <button className={s.sendBtn} type="submit">Send</button>
        </form>
      </div>
    </div>
  );
}
