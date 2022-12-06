import { Table, Space, Modal, Button } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export function UsersTable() {

    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        
    }, []);

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
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Actions',
            dataIndex: 'actions',
            key: 'actions',
            fixed: 'right',
            render: (_, user) => {
                return (
                    <Space size="middle">
                        <EditOutlined onClick={() => edit(user)} style={{ color: '#77B5FE' }} />
                        <DeleteOutlined onClick={() => remove(user)} style={{ color: 'red' }} />
                    </Space>
                )
            },
        },
    ]

    const remove = (user) => {
        Modal.confirm({
            title: `¿Deseas eliminar el usuario: ${user.name} ?`,
            onOk: () => {
                
            }
        });
    };

    const edit = (user) => {
        navigate('/backoffice/user/' + user.id);
    }

    return (
        <div className="new-backoffice-container">
            <div className="create-new-btn">
                <Link to='/backoffice/news/create'>
                    <Button>Create a New</Button>
                </Link>
            </div>
            <div className="new-table-container">
                <Table 
                    dataSource={users} 
                    columns={columns} 
                    className="new-table" />
            </div>
        </div>
    );
}