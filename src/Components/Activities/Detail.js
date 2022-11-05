import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

function Detail( {actividades} ) {
    const [actividad, setActividad] = useState();
    const {id} = useParams();

    console.log(id);

    useEffect(() => {

           fetch('http://localhost:3000/actividades/actividades.id')
             .then((response) => response.json())
             .then((data) => setActividad(data))
             .catch((err) => console.log(err));
         // eslint-disable-next-line react-hooks/exhaustive-deps
         }, [id]);


  return (
    <>
        <div className="container">
            <h2 className="text-center">{actividad.name}</h2>
                <div className="row mt-4">
                    <div className="col-8">
        </div>
        <div>
            <li className="card-info" key={actividad.id}>
                <h3>{actividad.name}</h3>
                <p>{actividad.description}</p>
            </li>
        </div>
        </div>
        </div>
</>
  )
}

export default Detail