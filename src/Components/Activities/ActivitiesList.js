import axios from 'axios';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDebounce } from "../../Hooks/useDebounce";
import './Activities.scss';

export function ActivitiesList() {
  const [actividades, setActividades] = useState([]);
  const [search, setSearch] = useState('');
  const endPoint = `https://ongapi.alkemy.org/public/api/`;
  const debouncedSearch = useDebounce(search, 1000);

  const handleChange = (e) => {
      setSearch(e.target.value);
  }

  useEffect(() => {
    async function fetchData() {
        let { data } = await axios.get(endPoint + "activities"); 
        debouncedSearch.length >= 3 ? { data } = await axios.get(endPoint + `activities?search=${debouncedSearch}`) : { data } = await axios.get(endPoint + "activities"); 

        const results = data.data.map((value) => {
            return {
                id: value.id,
                name: value.name,
                image: value.image,
                description: value.description,
            };
        });
        setActividades(results)
    }
    fetchData();
}, [endPoint, debouncedSearch]);

  return (
    <>
      <h1 className="cardH1">Actividades</h1>
      <div className="act-search">
                <input value={search} 
                onChange={handleChange} 
                type="text" 
                placeholder="Search activities" 
                className="act-search-bar" />
            </div>
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
          <p>No hay actividades</p>
        )}
      </div>
    </>
  );
}
