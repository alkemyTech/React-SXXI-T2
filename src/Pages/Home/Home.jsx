import { useEffect, useState } from 'react'
import { ListMembers, NewsList, Slider, TestimonialsList, WelcomeText } from '../../Components'
import { getNews } from '../../Services/newsService';

export function Home() {

    const [news, setNews] = useState([]);
  
    useEffect(() => {

      getNews("?limit=5").then((res) => {
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
    }, []);

    return (
        <>
            <WelcomeText />
            <Slider />
            <ListMembers />
            <TestimonialsList />
            <NewsList latestNews={news} />
        </>
    )
}