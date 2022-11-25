import { WelcomeHomeForm } from './WelcomeHomeForm';
import { SlidesHomeForm } from './SlidesHomeForm';
import { useNavigate } from 'react-router-dom';
import '../../FormStyles.css';

export const HomeForm = () => {
    const navigate = useNavigate();

    return (
        <div className='container'>
            <h1 style={{ textAlign: "center" }}>Modificar inicio</h1>
            <WelcomeHomeForm />
            <SlidesHomeForm />
            <div id='home-goback-btn'>
                <button
                    className='goback-btn'
                    onClick={() => navigate("/backoffice")}
                > Volver </button>
            </div>
        </div>
    );
}