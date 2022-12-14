import { useNavigate } from 'react-router-dom';

export const Donations = () => {
  const navigate = useNavigate();
  
  return (
    <div id='contribuir' >
      <h1>¿Quieres contribuir?</h1>
      <a 
        id='donate-btn'
        onClick={() => navigate("/thanks")}
        href='https://mpago.la/1S5hkjd'
        target="_blank"
        rel="noopener noreferrer">
          Contribuir
        </a>
    </div>
  )
}


