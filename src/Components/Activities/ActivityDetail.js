import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
<<<<<<< HEAD:src/Components/Activities/ActivitieDetail.js
import { errorAlert } from '../../Services/alertService';
=======
>>>>>>> 0d4f4f85eb213f48f45e1d454fe4edc535751b04:src/Components/Activities/ActivityDetail.js
import './Activities.scss';

export function ActivityDetail() {
  const [actividad, setActividad] = useState();
  const { id } = useParams();
  const endPoint = `https://ongapi.alkemy.org/public/api/activities/${id}`;

  useEffect(() => {
    axios
      .get(endPoint)
      .then((response) => {
        setActividad(response.data.data);
      })
      .catch((err) => errorAlert("Error", "Error al cargar la Actividad seleccionada", "Aceptar"));
  }, [endPoint]);

  return (
    <>
      <div>
        <h1 className="cardH1">Actividad</h1>
        <div className="list-container">
          <div className="cardAct1">
          <img
                  className="imgCard"
                  src={actividad?.image}
                  alt=""
                />
            <div className="card-info" key={actividad?.id}>
              <h3 className='titleH3'>{actividad?.name}</h3>
              <p className='description'>{actividad?.description}</p>
            </div>
          </div>
        </div>
        <Link to={`/`}>
          <button className="home">Home</button>
        </Link>
        </div>
    </>
  );
}