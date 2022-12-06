import axios from "axios";
import { useEffect, useState } from "react";
import { NewsList } from "../../Components/News/NewsList";
import { Title } from "../../Components/Title/Title";
import { useDebounce } from "../../Hooks";


export function News() {
    
    const [news, setNews] = useState([]);
    const [search, setSearch] = useState('');

    const API = "https://ongapi.alkemy.org/api/";
    const debouncedSearch = useDebounce(search, 500);

    const handleChange = (e) => {
        setSearch(e.target.value);
    }

    useEffect(() => {
        async function fetchData() {

            let { data } = await axios.get(API + "news"); 
            debouncedSearch.length >= 3 ? { data } = await axios.get(API + `news?search=${debouncedSearch}`) : { data } = await axios.get(API + "news"); 

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
    }, [debouncedSearch]);

    return (
        <>
            <div className="news-title">
                <Title title="Novedades" />
            </div>

            <div className="news-search">
                <input value={search} onChange={handleChange} type="text" placeholder="Search" className="news-search-bar" />
            </div>

            <div className="listado">
                <NewsList latestNews={news} />
            </div>
        </>
    )
}