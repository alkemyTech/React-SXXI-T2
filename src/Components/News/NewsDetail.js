import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import axios from 'axios';

import './News.scss';

function Detail() {
    const { id } = useParams();
    const [oneNews, setOneNews] = useState();

    const endPoint = `https://ongapi.alkemy.org/public/api/news/${id}`;

  useEffect(() => {
    axios
      .get(endPoint)
      .then((response) => {
        setOneNews(response.data.data);
      })
      .catch((err) => console.log(err));
  }, [endPoint]);

  return (
    <>
      <div className="container">
      <h1 className="cardH1">Novedades</h1>
      <LazyLoadImage className="imgCard2" src={oneNews?.image} alt="" />
            <div className="card-info2" key={oneNews?.id}>
              <h3 className='titleH3bis'>{oneNews?.name}</h3>
              <p className='description'>{oneNews?.description}</p>
            </div>
        <Link to={`/`}>
          <button className="home">Home</button>
        </Link>
        </div>
    </>
  );
}

export default Detail;
