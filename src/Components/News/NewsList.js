import { Card } from 'antd';
import React from 'react';
import '../Lists.css';

const NewsList = (news) => {

    const { latestNews } = news;

    return (
        <div>
            <ul>
                {latestNews.length > 0 ?
                    latestNews.map((element) => {
                        return (
                            <li key={element.id} className='cards' >
                                <Card size="default" title={element.name} className="individual-card">
                                    <div className='card-content'>
                                        <img src={element.image} className="card-image" />
                                        <div className="info">
                                            <p>{element.content.replace(/<\/?[^>]+>/gi, '')}</p>
                                        </div>
                                    </div>
                                </Card>

                            </li>
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