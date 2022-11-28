import { HeartOutlined } from '@ant-design/icons';
import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';
import background from '../../Assets/img1.png'

export const Thanks = () => {
  const navigate = useNavigate();

  return (
    <div id='container-thanks'>
      <img src={background} alt='img-bg-thanks' />
      <div id='thanks'>
        <Result
          icon={<HeartOutlined />}
          title="¡Muchas gracias!"
          subTitle="Con su contribución está apoyando el desarrollo de muchas personas que lo necesitan , agradecemos su donativo. Cada aporte que recibimos nos permite continuar con nuestro trabajo por un mundo mejor. Gracias por ayudarnos."
          extra={<Button key="buy" onClick={() => navigate("/donate")}>Volver a donar</Button>}
        />
      </div>
    </div>
  )
}
