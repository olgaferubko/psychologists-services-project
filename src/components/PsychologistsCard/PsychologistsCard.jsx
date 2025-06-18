import { useEffect, useState } from 'react';
import { TiStarFullOutline } from "react-icons/ti";
import { FaCircle } from "react-icons/fa";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import AppointmentModal from "../AppointmentModal/AppointmentModal";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/auth/selectors";

import s from "./PsychologistsCard.module.css";

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

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const [showMore, setShowMore] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const found = storedFavorites.some(ps => ps.name === name);
    setIsFavorite(found);
  }, [name]);

  const toggleFavorite = () => {
    if (!isLoggedIn) {
      toast.error("This feature is available only for authorized users");
      return;
    }

    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];

    if (isFavorite) {
      const updated = storedFavorites.filter(item => item.name !== name);
      localStorage.setItem('favorites', JSON.stringify(updated));
      setIsFavorite(false);
    } else {
      const updated = [...storedFavorites, data];
      localStorage.setItem('favorites', JSON.stringify(updated));
      setIsFavorite(true);
    }
  };

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
              <button className={s.favBtn} type="button" onClick={toggleFavorite}>
                {isFavorite ? (
                  <FaHeart className={`${s.heart} ${s.active}`} />
                ) : (
                  <FaRegHeart className={s.heart} />
                )}
              </button>
            </div>
          </div>

          <div className={s.mainText}>
            <h3 className={s.name}>{name}</h3>
            <div className={s.skillWrapper}>
              <p className={s.skill}>
                Experience: <span className={s.skillDecor}>{experience}</span>
              </p>
              <p className={s.skill}>
                License: <span className={s.skillDecor}>{license}</span>
              </p>
              <p className={s.skill}>
                Specialization: <span className={s.skillDecor}>{specialization}</span>
              </p>
              <p className={s.skill}>
                Initial_consultation: <span className={s.skillDecor}>{initial_consultation}</span>
              </p>
            </div>

            <p className={s.about}>{about}</p>

            <button className={s.readMore} onClick={() => setShowMore((prev) => !prev)}>
              {showMore ? 'Hide' : 'Read more'}
            </button>

            {showMore && (
              <>
                {reviews.length === 0 ? (
                  <p>No reviews yet.</p>
                ) : (
                  <ul className={s.list}>
                    {reviews.map((rev, index) => (
                      <li className={s.item} key={index}>
                        <div className={s.reviewsWrapper}>
                          <div className={s.avatarLetter}>
                            {rev.reviewer?.charAt(0).toUpperCase()}
                          </div>
                          <div className={s.nameWrapper}>
                            <p className={s.reviewer}>{rev.reviewer}</p>
                            <div className={s.wrapperScore}>
                              <TiStarFullOutline className={s.star} />
                              <p className={s.ratingScore}>{rev.rating}</p>
                            </div>
                          </div>
                        </div>
                        <p className={s.comment}>{rev.comment}</p>
                      </li>
                    ))}
                  </ul>
                )}

                <button className={s.appointmentBtn} onClick={() => setIsModalOpen(true)}>
                  Make appointment
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {isModalOpen && (
        <AppointmentModal
          onClose={() => setIsModalOpen(false)}
          psychologist={name}
          avatar_url={avatar_url}
          name={name}
        />
      )}
    </div>
  );
}
