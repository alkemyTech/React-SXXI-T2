import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert';
import './Activities.scss';

function Detail() {
  const [actividad, setActividad] = useState();
  const { id } = useParams();
  const endPoint = `https://ongapi.alkemy.org/public/api/activities/${id}`;

  useEffect(() => {
    axios
      .get(endPoint)
      .then((response) => {
        setActividad(response.data.data);
      })
      .catch((err) => Swal.fire("Error al cargar la Actividad seleccionada"));
  }, [endPoint]);

  return (
    <>
      <div className="container">
        <h1 className="cardH1">Actividades</h1>
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

export default Detail;
