import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import './newsCard.css'

const NewsList = () => {

    const [novedades, setNovedades] = useState();
    const newsMock = [
        {id: 2, name: 'Titulo de prueba', description: 'Descripcion de prueba'},
        {id: 1, name: 'Titulo de prueba', description: 'Descripcion de prueba'},
        {id: 3, name: 'Titulo de prueba', description: 'Descripcion de prueba'}
    ];

    const listaNovedades = () => {
        setNovedades(novedades);
    };

    return (
        <div className='card'>
            <h1 className='card'>Listado de Novedades</h1>
            <ul className="list-container">
                {newsMock.length > 0 ? 
                    newsMock.map((element) => {
                        return(
                            <div className='cardAct'>
                            <img className='imgCard' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlC3ls_7r6adL6nuGOlsh-FM-HABIgIwJkCA&usqp=CAU" alt="" />
                            <li className="card-info" key={element.id}>
                                <h3 className='title'>{element.name}</h3>
                                <p className='description'>{element.description}</p>
                                <Link to={`/novedad/${element.id}`}>
                                <button className='verMas' onClick={listaNovedades}>Ver detalle</button>
                                </Link>
                            </li>
                            </div>
                        )
                    })
                :
                    <p>No hay novedades</p>
                }
            </ul>
        </div>
    );
}
 
export default NewsList;