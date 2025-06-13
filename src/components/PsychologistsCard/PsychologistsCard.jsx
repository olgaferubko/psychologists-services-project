import { useState } from 'react';
import { TiStarFullOutline } from "react-icons/ti";
import { FaCircle } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import AppointmentModal from "../AppointmentModal/AppointmentModal";
import s from "./PsychologistsCard.module.css"

export default function PsychologistCard({ data }) {
  const {
    avatar_url,
    name,
    experience,
    license,
    specialization,
    initial_consultation,
    price_per_hour,
    rating,
    about,
    reviews = [],
  } = data;

  const [showMore, setShowMore] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
            <div className={s.card}>
                <div className={s.cardPhoto}>
                    <div className={s.photoWrapper}>
                    <img src={avatar_url} alt={name} className={s.photo} />
                    <FaCircle className={s.statusIcon} />
                    </div>
                <div className={s.wrapper}>

                    <div className={s.cardHeader}>
                    <p className={s.cardTitle}>Psychologist</p>

                    <div className={s.raiting}>
                    <TiStarFullOutline className={s.star} />
                    <span className={s.text}>Rating: {rating}</span>
                    <span className={s.divider}></span>
                    <span className={s.text}>
                        Price / 1 hour: <span className={s.price}>${price_per_hour}</span>
                    </span>
                    <FaRegHeart className={s.heart} />
                    </div>

                    </div>
                    <div className={s.mainText}>
                        <h3 className={s.name}>{name}</h3>
                        <div className={s.skillWrapper}>
                            <p className={s.skill}>Experience:  <span className={s.skillDecor}> {experience}</span> </p>
                            <p className={s.skill}>License:  <span className={s.skillDecor}> {license}</span> </p>
                            <p className={s.skill}>Specialization:  <span className={s.skillDecor}> {specialization}</span> </p>
                            <p className={s.skill}>Initial_consultation:  <span className={s.skillDecor}> {initial_consultation}</span> </p>
                        </div>
                        <p className={s.about}>{about}</p>
                        <button className={s.readMore} onClick={() => setShowMore((prev) => !prev)}>
                            {showMore ? 'Hide' : 'Read more'}
                        </button>
                    </div>
                </div>
            </div>

      {showMore && (

    <div className={s.reviews}>
      <h4>Reviews:</h4>
      {reviews.length === 0 ? (
        <p>No reviews yet.</p>
      ) : (
        <ul>
          {reviews.map((rev, index) => (
            <li key={index}>
              <strong>{rev.reviewer}</strong>: {rev.comment} ({rev.rating}★)
            </li>
          ))}
        </ul>
      )}


    <button onClick={() => setIsModalOpen(true)}>Make appointment</button>
  </div>
)}


     

      {isModalOpen && (
        <AppointmentModal onClose={() => setIsModalOpen(false)} psychologist={name} />
      )}
    </div>
  );
}
