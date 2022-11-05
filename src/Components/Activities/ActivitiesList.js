import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import './activitiesCard.css'

const ActivitiesList = () => {

    const [actividades, setActividades] = useState();
    const activitiesMock = [
        {id: 2, name: 'Titulo de prueba', description: 'Descripcion de prueba'},
        {id: 1, name: 'Titulo de prueba', description: 'Descripcion de prueba'},
        {id: 3, name: 'Titulo de prueba', description: 'Descripcion de prueba'}
    ];

    const listaActividad = () => {
        setActividades(actividades);
    };

    return (
        <div className='card'>
            <h1 className='card'>Listado Actividades</h1>
            <ul className="list-container">
                {activitiesMock.length > 0 ?
                    activitiesMock.map((activity) => {
                        return(
                            <div className='cardAct'>
                            <img className='imgCard' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlC3ls_7r6adL6nuGOlsh-FM-HABIgIwJkCA&usqp=CAU" alt="" />
                            <li className="card-info" key={activity.id}>
                                <h3 className='title'>{activity.name}</h3>
                                <p className='description'>{activity.description}</p>
                                <Link to={`/detalle/${activity.id}`}>
                                <button className='verMas' onClick={listaActividad}>Ver detalle</button>
                                </Link>
                            </li>
                            </div>
                        )
                    })
                :
                    <p>No hay actividades</p>
                }
            </ul>
        </div>
    );
}
 
export default ActivitiesList;