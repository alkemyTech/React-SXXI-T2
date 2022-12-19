import { useEffect, useState } from "react";
import { useDebounce } from "../../Hooks"
import { getData } from "../../Services/privateApiService";


export const UsersSearch = ({ setUsers }) => {
    const [search, setSearch] = useState('');
    const [selectedRole, setSelectedRole] = useState('todos');
    const [roles, setRoles] = useState([]);
    const debouncedSearch = useDebounce(search, 500);

    const handleChange = (e) => {
        setSearch(e.target.value);
    }

    const handleSelectChange = (e) => {
        setSelectedRole(e.target.value);
    }

    useEffect(() => {
        getData('/roles', null).then(res => {
            const data = res.data.map(value =>
                value = {
                    id: value.id,
                    name: value.name,
                }
            )
            setRoles(data)
        })
    }, []);


    useEffect(() => {

        let finalURL = '/users';

        if (debouncedSearch.length >= 3) {
            finalURL = `/users?search=${debouncedSearch}`;
        }

        if (selectedRole !== 'todos') {
            finalURL = `/users?role=${selectedRole}`;
        }

        if (debouncedSearch.length >= 3 && selectedRole !== 'todos') {
            finalURL = `/users?search=${debouncedSearch}&role=${selectedRole}`;
        }

        let data = [];
        getData(finalURL).then(res => {
            console.log(res);
            data = res.data.map(user =>
                user = {
                    key: user.id,
                    name: user.name,
                    email: user.email,
                }
            )
            setUsers(data)
        })
    }, [debouncedSearch, selectedRole]);

    return (
        <>
            <input value={search} onChange={handleChange} type="text" placeholder="Buscar" className="users-search-bar" />
            <select onChange={handleSelectChange} className='users-select' >
                <option value='todos' className='news-option'>Todos</option>
                {roles.map((opt) => {
                    return (
                        <option key={opt.id} value={opt.id} className='news-option'>{opt.name}</option>
                    )
                })}
            </select>
        </>
    )
}
