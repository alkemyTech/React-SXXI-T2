import { Button } from 'antd'
import logo from '../../../assets/logo-somos.png'
import { useNavigate } from 'react-router-dom'

export function OrganizationData() {
    const navigate = useNavigate()

    const handleOnClick = () => {
        navigate('/backoffice/organizacion/edit')
    }
    return (
        <section className="organization-info">
            <h1>Somos Mas</h1>

            <div className='data'>
                <picture>
                    <img src={logo} alt="" />
                </picture>
                <p><span style={{fontWeight:'bold'}}>Nombre:</span> Somos mas</p> 
                <p><span style={{fontWeight:'bold'}}>Descripcion:</span> Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis vel ullam facere magnam nihil officia commodi, dolores sapiente dolorem inventore quia? Quibusdam quidem nisi sed fuga unde commodi, nemo quaerat.</p> 
            </div>

            <Button 
                className="button-primary"
                onClick={handleOnClick}
            >
                Editar informacion
            </Button>
        </section>
    )
}
