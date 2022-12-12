import { Table, Space, Button } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { confirmAlert } from "../../../Services/alertService";
import { deleteNews, getNews } from "../../../Services/newsService";

export function NewsTable() {

    const API_URL = "https://ongapi.alkemy.org/api/";
    const [news, setNews] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getNews().then( res => {
            const data = res.data.map( value => 
                value = {
                    key: value.id,
                    name: value.name,
                    image: value.image,
                    createdAt: value.created_at,
                } 
            )
            setNews(data)
        })
        
    }, []);

    const columns = [
        {
            title: 'ID',
            dataIndex: 'key',
            key: 'key',
            fixed: 'left',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Image',
            dataIndex: 'image',
            key: 'image',
            render: imageURL => <img src={imageURL} alt={imageURL} className='table-new-img' />,
        },
        {
            title: 'Created At',
            dataIndex: 'createdAt',
            key: 'createdAt',
        },
        {
            title: 'Actions',
            dataIndex: 'actions',
            key: 'actions',
            fixed: 'right',
            render: (_, record) => {
                return (
                    <Space size="middle">
                        <EditOutlined onClick={() => handleEdit(record)} style={{ color: '#77B5FE' }} />
                        <DeleteOutlined onClick={() => handleDelete(record)} style={{ color: 'red' }} />
                    </Space>
                )
            },
        },
    ]

    const delNew = (record) => {
        deleteNews(record.key)
        setNews(news.filter( item => item.key !== record.key ))
    }

    const handleDelete = (record) => {
        confirmAlert("¡Eliminar!", "¿Estás seguro de querer eliminar la novedad?", "Sí", delNew, record);
    };

    const handleEdit = (record) => {
        navigate('/backoffice/news/create/' + record.key);
    }

    return (
        <div className="new-backoffice-container">
            <div className="create-back-btn">
                <Link to='/backoffice'>
                    <Button>Volver</Button>
                </Link>
                <Link to='/backoffice/news/create'>
                    <Button>Crear una novedad</Button>
                </Link>
            </div>
            <div className="new-table-container">
                <Table
                    dataSource={news}
                    columns={columns}
                    scroll={{
                        x: 400,
                    }}
                    className="new-table" />
            </div>
        </div>
    );
}