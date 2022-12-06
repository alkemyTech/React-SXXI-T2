import { Table, Space, Button } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getData } from "../../../Services/privateApiService";
import { confirmAlert } from "../../../Services/alertService";

export function UsersTable() {

    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getData("/users").then( res => {
            const data = res.data.map( user => 
                user = {
                    key: user.id,
                    name: user.name,
                    email: user.email
                } 
            )
            setUsers(data)
        })
    }, []);

    const columns = [
        {
            title: 'Nombre',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Acciones',
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
        confirmAlert(
            'Eliminar usuario',
            `¿Desea eliminar el usuario ${user.name}?`,
            'Eliminar',
            console.log,
            'hola')
    };

    const edit = (user) => {
        navigate('/backoffice/user/' + user.key);
    }

    return (
        <div className="users-table-container">
            <Link to='/backoffice/user'>
                <Button>Crear usuario</Button>
            </Link>
            <Table 
                dataSource={users} 
                columns={columns} 
                className="user-table" />
        </div>
    );
}