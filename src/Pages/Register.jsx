import '../Components/FormStyles.css';
import { RegisterForm } from '../Components/Auth/RegisterForm'
import logo from '../Assets/logo-somos.png';
import img1 from '../Assets/img1.jpg';

export const Register = () => {

    return (
        <div className='container'>
            <img src={logo} alt='logo' id='logo' />
            <div id='register'>
                <div id='register-form'>
                    <div id='welcome-text' className='no-display-mobile'>
                        <p>Bienvenido</p>
                        <h2>¡Registra una cuenta!</h2>
                    </div>
                    <RegisterForm />
                    <p id='go-to-login'>¿Ya tenés una cuenta? <a href='/login'>¡Ingresa!</a></p>
                </div>
                <img src={img1} alt='img-register' className='no-display-mobile' id='img-register' />
            </div>
        </div>
    )
}