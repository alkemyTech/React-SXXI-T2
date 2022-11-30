import axios from "axios";
import { useEffect, useState } from "react";
import { NewsList } from "../../Components/News/NewsList";
import Title from "../../Components/Title/Title";



export function News() {

    const [news, setNews] = useState([]);
    const API = "https://ongapi.alkemy.org/api/";

    useEffect(() => {
        async function fetchData() {

            const { data } = await axios.get(API + "news?limit=6");
            const results = data.data.map((value) => {
                return {
                    id: value.id,
                    name: value.name,
                    image: value.image,
                    content: value.content,
                    categoryId: value.categoryId
                };
            });


            setNews(results)
        }
        fetchData();
    }, []);

    return (
        <>
            <div className="news-title">
                <Title title="Novedades" />
            </div>

            <div className="listado">
                <NewsList latestNews={news} />
            </div>
        </>
    )
}