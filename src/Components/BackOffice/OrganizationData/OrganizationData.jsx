import { Button } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useEffect } from 'react'
import { getOrganizationData } from '../../../Services/publicApiService'

export function OrganizationData() {
    const [organizationData, setOrganizationData] = useState('')

    useEffect(() => {
        getOrganizationData()
            .then(data => setOrganizationData(data))
    }, [])

    const navigate = useNavigate()

    const handleOnClick = () => {
        navigate('/backoffice/organization/edit/1')
    }
    return (
        <section className="organization-info">
            <h1>Somos Mas</h1>

            <div className='data'>
                <picture>
                    <img src={organizationData.logo} alt="" />
                </picture>
                <p><span style={{fontWeight:'bold'}}>Nombre:</span> {organizationData.name}</p> 
                <p><span style={{fontWeight:'bold'}}>Descripcion:</span> {organizationData.shortDescription}</p> 
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
