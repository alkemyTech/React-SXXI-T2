import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

function DetailNews( {novedades} ) {
    const {id} = useParams();
    const [news, setNews] = useState();

    useEffect(() => {
        fetch('http://localhost:3000/novedades/novedades.id')
             .then((response) => response.json())
             .then((data) => setNews(data))
             .catch((err) => console.log(err));
         // eslint-disable-next-line react-hooks/exhaustive-deps
         }, [id]);


  return (
    <>
        <div className="container">
            <h2 className="text-center">{news.name}</h2>
                <div className="row mt-4">
                    <div className="col-8">
        </div>
        <div>
            <li className="card-info" key={news.id}>
                <h3>{news.name}</h3>
                <p>{news.description}</p>
            </li>
        </div>
        </div>
        </div>
</>
  )
}

export default DetailNews;