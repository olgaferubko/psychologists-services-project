import { useSelector } from "react-redux";
import s from "./UserMenu.module.css";
import { selectUser } from "../../redux/auth/selectors";
import { useDispatch } from "react-redux";
import { logOut } from "../../redux/auth/operations";
import { MdPerson } from "react-icons/md";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

export default function UserMenu() {
    const user = useSelector(selectUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    return (
        <div className={s.wrapper}>
            <MdPerson />
            <p className={s.username}>{user.name}</p>
            <button
                className={s.logOutBtn}
                type="button"
                onClick={() =>
                    dispatch(logOut())
                        .unwrap()
                        .then(() => {
                            toast("See you soon!)");
                            navigate("/");
                        })
                }
            >
                Logout
            </button>
        </div>
    );
}