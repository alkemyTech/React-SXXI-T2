import { useEffect, useState } from "react";
import { useDebounce } from "../../Hooks"
import { publicGetData } from "../../Services/publicApiService";


export const UsersSearch = () => {
    const [search, setSearch] = useState('');
    const debouncedSearch = useDebounce(search, 500);

    const handleChange = (e) => {
        setSearch(e.target.value);
    }

    useEffect(() => {
        let data = [];
        debouncedSearch.length >= 3 
            ? data = publicGetData(`/users?search=${debouncedSearch}`)
            : data = publicGetData("/users"); 

        const results = data.data.map( user =>
            user = {
                key: user.id,
                name: user.name,
                email: user.email,
            }
        );

        // setUsers(results)
    }, [debouncedSearch]);

  return (
    <div className="news-search">
        <input value={search} onChange={handleChange} type="text" placeholder="Search" className="news-search-bar" />
    </div>
  )
}
