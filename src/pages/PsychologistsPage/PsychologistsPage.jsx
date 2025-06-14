import PsychologistList from '../../components/PsychologistsList/PsychologistsList';
import s from './PsychologistsPage.module.css';

const PsychologistsPage = () => {
  return (
    <div className={s.container}>
      <title>PsychologistsPage</title>
      <PsychologistList />
    </div>
  );
};

export default PsychologistsPage;
