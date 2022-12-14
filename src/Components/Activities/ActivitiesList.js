import axios from 'axios';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Spinner from '../../Common/Loader/Spinner/Spinner';
import { errorAlert } from '../../Services/alertService';
import './Activities.scss';

function ActivitiesList() {
  const [actividades, setActividades] = useState([]);

  const endPoint = `https://ongapi.alkemy.org/public/api/activities`;

  useEffect(() => {
    axios
      .get(endPoint)
      .then((response) => {
        setActividades(response.data.data);
      })
      .catch((error) => errorAlert("Error", "A ocurrido un error. Intente nuevamente", "Aceptar"));
  }, [endPoint]);

  return (
    <div className="card">
      <h1 className="cardH1">Actividades</h1>
      <div className="list-container">
        {actividades.length > 0 ? (
          actividades.map((activity) => {
            return (
              <div className="cardAct" key={activity.id}>
                <img
                  className="imgCard"
                  src={activity.image}
                  alt=""
                />
                <div className="card-info">
                  <h3 className="titleH3">{activity.name}</h3>
                  <p className="description">{activity?.description?.substring(0, 150)}...</p>
                  <Link to={`/activities/${activity.id}`}>
                    <button className="verMas">Ver detalle</button>
                  </Link>
                </div>
              </div>
            );
          })
        ) : (
						<div className="flex justify-center">
							<Spinner />
						</div>
					)}
      </div>
    </div>
  );
}

export default ActivitiesList;
