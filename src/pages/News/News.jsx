import axios from "axios";
import { useEffect, useState } from "react";
import NewsList from "../../Components/News/NewsList";
import '../../Components/News/news.css'


export function News() {

    const [news, setNews] = useState([]);

    useEffect(() => {
        async function fetchData() {

            const { data } = await axios.get("https://ongapi.alkemy.org/api/news");
            const results = [];

            data.data.map((value) => {
                results.push({
                    id: value.id,
                    name: value.name,
                    image: value.image,
                    content: value.content,
                    categoryId: value.categoryId
                });
            });
            setNews(results)
        }
        fetchData();
    }, []);

    return (
        <>
            <h1>Novedades</h1> {/* reemplazar por componente Titulo cuando éste se finalice */}
            <div className='listado'>
                <NewsList latestNews={news} />
            </div>
        </>
    )
}