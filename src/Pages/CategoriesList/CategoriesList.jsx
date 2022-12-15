import { Link, useNavigate } from "react-router-dom"
import { Table, Space, Button } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import  "./CategoriesList.css";
import { deleteCategory, getCategories } from "../../Services/categoriesService";
import { confirmAlert } from "../../Services/alertService";
 
function CategoriesList() {
    
    const [ categories, setCategories ] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getCategories()
            .then( res => {
                const results = res.data.map((value) => {
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
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            fixed: 'left',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Created at:',
            dataIndex: 'created_at',
            key: 'created_at',
        },
        {
            title: 'Actions',
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