import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { LazyImage } from '../LazyImage/LazyImage';
import { Title } from '../Title/Title';
import axios from 'axios';

import './News.scss';

export function NewsDetail() {
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
        <Title title='Novedades' />
        <LazyImage imgClass="imgCard2" imgSrc={oneNews?.image} imgAlt="" />
        <div className="card-info2" key={oneNews?.id}>
          <Title title={oneNews?.name} />
          <p className='description'>{oneNews?.content}</p>
        </div>
        <Link to={`/`}>
          <button className="home">Home</button>
        </Link>
      </div>
    </>
  );
}