import axios from 'axios';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import './News.scss';

const NewsList = () => {
    const [news, setNews] = useState([]);

  const endPoint = `https://ongapi.alkemy.org/public/api/news`;

  useEffect(() => {
    axios
      .get(endPoint)
      .then((response) => {
        setNews(response.data.data);
      })
      .catch((err) => console.log(err));
  }, [endPoint]);


  return (
    <div className="card">
      <h1 className="cardH1">Novedades</h1>
      <div className="list-container">
        {news.length > 0 ? (
          news.map((novedad) => {
            return (
              <div className="cardAct" key={novedad.id}>
                <img
                  className="imgCard"
                  src={novedad.image}
                  alt=""
                />
                <div className="card-info">
                  <h3 className="titleH3">{novedad.name}</h3>
                  <p className="description">{novedad?.description?.substring(0, 150)}...</p>
                  <Link to={`/news/${novedad.id}`}>
                    <button className="verMas">Ver detalle</button>
                  </Link>
                </div>
              </div>
            );
          })
        ) : (
          <p>No hay actividades</p>
        )}
      </div>
    </div>
  );
}
 
export default NewsList;