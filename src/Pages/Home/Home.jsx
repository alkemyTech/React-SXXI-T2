import axios from 'axios';
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { ListMembers, NewsList, WelcomeText } from '../../Components'
import { getNews } from '../../Services/newsService';

export function Home() {

  const [news, setNews] = useState([]);
  const [members, setMembers] = useState([]);

  useEffect(() => {

    getNews("?limit=2").then((res) => {
      const results = res.data.map((value) => {
        return {
          id: value.id,
          name: value.name,
          image: value.image,
          content: value.content,
          categoryId: value.categoryId,
        };
      });
      setNews(results);
    });

    axios.get("https://ongapi.alkemy.org/api/members?limit=3").then((res) => {
      const results = res.data.data.map((value) => {
        return {
          id: value.id,
          name: value.name,
          image: value.image,
          description: value.description,
          facebookUrl: value.facebookUrl,
          linkedinUrl: value.linkedinUrl
        };
      });
      setMembers(results);
    })
  }, []);

  return (
    <div className='home-container'>
      <div className='welcome-home-container'>
        <WelcomeText className="welcome-text" />
      </div>

      <div className='members-home-container'>
        <div className='subtitle-header-home'>
          <h2 className='home-subtitle'>Nuestro staff</h2>
          <Link to="/members" className='to-more'>Ver más {'>'}</Link>
        </div>
        <ListMembers className="list-members-home" latestMembers={members} />
      </div>

      <div className='news-home-container'>
        <div className='subtitle-header-home'>
          <h2 className='home-subtitle'>Novedades</h2>
          <Link to="/news" className='to-more'>Ver más {'>'}</Link>
        </div>
        <NewsList latestNews={news} className="news-list-home" />
      </div>
    </div>
  )
}