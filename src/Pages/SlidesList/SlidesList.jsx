import { Link, useNavigate } from "react-router-dom"
import { Table, Space, Popconfirm, Button } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import axios from "axios";
import  "./SlidesList.css";
import { useDebounce } from "../../Hooks";
 
function SlidesList() {
    
    const API_URL = 'https://ongapi.alkemy.org/api';
    
    const [ slides, setSlides ] = useState([]);
    const [ search, setSearch ] = useState('');
    const navigate = useNavigate();

    const debouncedSearch = useDebounce(search, 500);

    const handleChangeSearch = (e) => {
        setSearch(e.target.value);
    }

    useEffect(() => {
        let URL = 'https://ongapi.alkemy.org/api/';
        if (debouncedSearch.length >= 3) {
            URL = `/slides?search=${debouncedSearch}`
        } else {
            URL = `/slides`
        }
        axios.get(API_URL + URL)
            .then((res) =>{
                let results = res.data.data.map((value) => {
                    return {
                        id: value.id,
                        name: value.name,
                        image: value.image,
                        order: value.order,
                        key: value.id
                    }
                })
                setSlides(results);
            })
    }, [debouncedSearch])


    const columns = [
        {
            title: 'Código',
            dataIndex: 'id',
            key: 'id',
            fixed: 'left',
        },
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
            title: 'Orden',
            dataIndex: 'order',
            key: 'order',
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
                            title= 'Are you sure you want to delete this Slide?'
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
        axios.delete(API_URL + '/slides/' + record.id)
            .then((res) =>{
                console.log('Se borro Slide ID:' + record.id );
            })
            .catch((error) => {
                console.log(error);
            })
            setSlides((pre) => {
                return pre.filter((item) => item.id !== record.id);
            });
    }

    const handleEdit = (record) => {
        navigate("/backoffice/edit-slide/" + record.id );
    }



    return(
        <div className="new-backoffice-container">
            
            <div className="new-table-container">
                
                <div className="create-new-btn">
                    <Link to='/backoffice/create-slide'>
                        <Button>Crear un Slide</Button>
                    </Link>
                </div>
                <div className="slides-search">
                    <h1>Slides</h1>
                    <input value={search} onChange={handleChangeSearch} type="text" placeholder="Buscar" className="slide-search-bar" />
                </div>

                <Table 
                    dataSource={slides}
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

export default SlidesList