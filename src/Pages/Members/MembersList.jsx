import { Link, useNavigate } from "react-router-dom"
import { Table, Space, Popconfirm, Button } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import axios from "axios";
import  "./MembersList.css";
import { useDebounce } from "../../Hooks/useDebounce";
 
export function MembersList() {
    
    const API_URL = 'https://ongapi.alkemy.org/api';

    const [ members, setMembers ] = useState([]);
    
    const navigate = useNavigate();
    const [ search, setSearch ] = useState('');
    const debouncedSearch = useDebounce(search, 500);

    const handleChangeSearch = (e) => {
        setSearch(e.target.value);
    }

    useEffect(() => {
        let URL = 'https://ongapi.alkemy.org/api/';
        if (debouncedSearch.length >= 3) {
            URL = `/members?search=${debouncedSearch}`
        } else {
            URL = `/members`
        }
        axios.get(API_URL + URL)
            .then((res) =>{
                let results = res.data.data.map((value) => {
                    return {
                        id: value.id,
                        name: value.name,
                        image: value.image,
                        key: value.id
                    }
                })
                setMembers(results);
            })
    }, [debouncedSearch])

    const columns = [
        {
            title: 'Nombre',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Imagen',
            dataIndex: 'image',
            key: 'image',
            render: imageURL => <img src={imageURL} alt={imageURL} className='table-new-img' />,
        },
        {
            title: 'Acciones',
            dataIndex: 'actions',
            key: 'actions',
            fixed: 'right',
            render: (_, record) => {
                return(
                    <Space size='middle'>
                        <EditOutlined onClick={() => handleEdit(record)} style={{ color: '#77B5FE' }}/>
                        <Popconfirm 
                            title= '¿Está seguro que desea Eliminar el Miembro?'
                            onConfirm={() => {
                                handleDelete(record)
                            }}
                            okText='Yes'
                            cancelText='No' 
                            value={record}
                        >
                            <DeleteOutlined  style={{ color: 'red' }}/>
                        </Popconfirm>
                    </Space>
                )
            },
        },
    ]


    const handleDelete = (record) => {
        axios.delete(API_URL + '/members/' + record.id)
            .then((res) =>{
                console.log('Se borro Miembro ID:' + record.id );
            })
            .catch((error) => {
                console.log(error);
            })
            setMembers((pre) => {
                return pre.filter((item) => item.id !== record.id);
            });
    }

    const handleEdit = (record) => {
        navigate("/backoffice/edit-member/" + record.id );
    }



    return(
        <div className="new-backoffice-container">

            <div className="new-table-container">

                <div className="create-new-btn">
                    <Link to='/backoffice/create-member'>
                        <Button>Crear un Miembro</Button>
                    </Link>
                </div>
                <div className="members-search">
                    <h1>Miembros</h1>
                    <input value={search} onChange={handleChangeSearch} type="text" placeholder="Buscar" className="members-search-bar" />
                </div>
                <Table 
                    dataSource={members}
                    columns={columns}
                    scroll={{
                        x: 400,
                    }}
                    className="new-table"
                />
            </div>
        </div>
    )
}