import { Link, useNavigate } from "react-router-dom"
import { Table, Space, Button } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import  "./CategoriesList.css";
import { deleteCategory } from "../../Services/categoriesService";
import { confirmAlert } from "../../Services/alertService";
import axios from "axios";
 
function CategoriesList() {
    
    const API_URL = 'https://ongapi.alkemy.org/api';
    const [ categories, setCategories ] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(API_URL + '/categories')
            .then( res => {
                const results = res.data.data.map((value) => {
                    return {
                        id: value.id,
                        name: value.name,
                        created_at: value.created_at,
                        key: value.id
                    }
                })
                setCategories(results);
            })
    }, [])

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
            title: 'Creado',
            dataIndex: 'created_at',
            key: 'created_at',
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
                        <DeleteOutlined onClick={() => handleDelete(record)} style={{ color: 'red' }}/>
                    </Space>
                )
            },
        },
    ]

    const remove = (record) => {
        deleteCategory(record.id)
        setCategories((pre) => {
            return pre.filter((item) => item.id !== record.id);
        })
    }

    const handleDelete = (record) => {
        confirmAlert(
            'Eliminar categoria',
            `¿Desea eliminar la categoria ${record.name}?`,
            'Eliminar',
            remove,
            record)
    };

    const handleEdit = (record) => {
        navigate("/backoffice/edit-categories/" + record.id );
    }



    return(
        <div className="new-backoffice-container">
            <div className="create-new-btn">
                <Link to='/backoffice/create-categories'>
                    <Button>Create a New</Button>
                </Link>
            </div>
            <div className="new-table-container">
                <Table 
                    dataSource={categories}
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

export default CategoriesList;