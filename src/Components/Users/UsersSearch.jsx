import { useEffect, useState } from "react";
import { useDebounce } from "../../Hooks"
import { getData } from "../../Services/privateApiService";


export const UsersSearch = ({ setUsers }) => {
    const [search, setSearch] = useState('');
    const debouncedSearch = useDebounce(search, 500);

    const handleChange = (e) => {
        setSearch(e.target.value);
    }

    useEffect(() => {
        let data = [];
        debouncedSearch.length >= 3 
            ? getData(`/users?search=${debouncedSearch}`).then(res => {
                data = res.data.map( user =>
                    user = {
                        key: user.id,
                        name: user.name,
                        email: user.email,
                    }
                )
                setUsers(data)
            })
            : getData("/users").then(res => {
                data = res.data.map( user =>
                    user = {
                        key: user.id,
                        name: user.name,
                        email: user.email,
                    }
                )
                setUsers(data)
            })
    }, [debouncedSearch, setUsers]);

  return (
    <input value={search} onChange={handleChange} type="text" placeholder="Buscar" className="users-search-bar" />
  )
}
