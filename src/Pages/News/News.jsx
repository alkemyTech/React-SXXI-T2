import { Skeleton } from "../../Components/Skeleton/Skeleton";
import { useEffect, useState } from "react";
import { NewsList } from "../../Components/News/NewsList";
import { Title } from "../../Components/Title/Title";
import { useDebounce } from "../../Hooks";
import { getNews } from "../../Services/newsService";

export function News() {

    const [news, setNews] = useState([]);
    const [search, setSearch] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    const debouncedSearch = useDebounce(search, 500);

    const handleChange = (e) => {
        setSearch(e.target.value);
    }

    useEffect(() => {

        let finalURL = '';
        debouncedSearch.length >= 3 ? finalURL = `?search=${debouncedSearch}` : finalURL = '';

        getNews(finalURL).then((res) => {
            const results = res.data.map((value) => {
                return {
                    id: value.id,
                    name: value.name,
                    image: value.image,
                    content: value.content,
                    categoryId: value.categoryId
                };
            });
            setNews(results)
            setIsLoading(false);
        });

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
                <Skeleton active={true} loading={isLoading}>
                    <NewsList latestNews={news} />
                </Skeleton>
            </div>
        </>
    )
}