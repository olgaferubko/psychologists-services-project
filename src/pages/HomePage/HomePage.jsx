import { Link } from "react-router-dom";
import React, { useState } from "react";
import s from "./HomePage.module.css"
import Header from "../../components/Header/Header";
import { GoArrowUpRight } from "react-icons/go";
import { FaCheck } from "react-icons/fa";
import { MdOutlineQuestionMark } from "react-icons/md";
import { MdPeopleAlt } from "react-icons/md";
import AuthModal from "../../components/AuthModal/AuthModal";
import RegistrationModal from "../../components/RegistrationModal/RegistrationModal";



export default function HomePage() {

    const [modalType, setModalType] = useState(null);
    const closeModal = () => setModalType(null);
    
    return (
        <>

            {modalType === 'login' && <AuthModal onClose={closeModal} />}
            {modalType === 'register' && <RegistrationModal onClose={closeModal} />}

            <title>Home</title>
            <div className={s.container}>
                <div className={s.textWrapper}>
                <h1 className={s.heading}>The road to the <span className={s.span}>depths</span> of the human soul</h1>
                <p className={s.text}>We help you to reveal your potential, overcome challenges and find a guide in your own life with the help of our experienced psychologists.</p>
                <Link to="/psychologists" className={s.start}>
                    Get started <GoArrowUpRight className={s.arrow} />
                </Link>
                </div>

                <div className={s.rightBlock}>
                    <img src="/images/home.jpg" alt="Psychologist" className={s.img} />
                    <span className={s.questionWrapper}><MdOutlineQuestionMark className={s.question} /></span>
                    <span className={s.peopleWrapper}><MdPeopleAlt /></span>
                    <div className={s.wrapper}>
                        <span className={s.iconWrapper}><FaCheck className={s.check} /></span>
                        <div className={s.experience}>
                            <p className={s.experienceText}>Experienced psychologists</p>
                            <p className={s.experienceNumber}>15,000</p>
                        </div>
                    </div>
                </div>
                 
            </div>
        </>
    );
}