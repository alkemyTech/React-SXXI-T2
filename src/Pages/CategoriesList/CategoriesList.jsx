import { Link, useNavigate } from "react-router-dom"
import { Table, Space, Popconfirm, Button } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import axios from "axios";
import  "./CategoriesList.css";
 
function CategoriesList() {
    
    const API_URL = 'https://ongapi.alkemy.org/api/';
    const [ categories, setCategories ] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {

        axios.get(API_URL + 'categories')
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
            } )
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
        axios.delete(API_URL + 'categories/' + record.id)
            .then((res) =>{
                console.log('Se borro Slide ID:' + record.id );
            })
            .catch((error) => {
                console.log(error);
            })
            setCategories((pre) => {
                return pre.filter((item) => item.id !== record.id);
            });
    }

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