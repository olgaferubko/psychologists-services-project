import Header from "../../components/Header/Header";
import s from "./ErrorPage.module.css";

const ErrorPage = () => {
    return (
        <div>
                <title>Error</title>
            <Header />
            <h2 className={s.notFound}>Page not found!</h2>
            <p className={s.return}>Please return to the home page</p>
        </div>
    );
};

export default ErrorPage;