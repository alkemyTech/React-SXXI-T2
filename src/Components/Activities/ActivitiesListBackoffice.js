import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Table, Space, Modal, Button } from 'antd';
import './TablaActivities.scss';

function ActivitiesListBackoffice() {
  const [actividades, setActividades] = useState([]);
  const endPoint = `https://ongapi.alkemy.org/public/api/activities`;
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {

        const { data } = await axios.get(endPoint);
        const results = data.data.map((activity) => {
            return {
                id: activity.id,
                name: activity.name,
                image: activity.image,
                created_at: activity.created_at,
            }
        });
        setActividades(results)
    }
    fetchData();
}, [endPoint]);
 
 const columns = [
  {
    id: 'ID',
    dataIndex: 'id',
    key: 'id',
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
      render: imageURL => <img className='imgCard' src={imageURL} alt={imageURL} />
    },
    {
      title: 'Fecha de Creación',
      dataIndex: 'created_at',
      key: 'created_at',
    },
    {
      title: 'Acciones',
      dataIndex: 'actions',
      key: 'actions',
      render: (_, record) => {
        return (
        <Space size="middle">
        <EditOutlined onClick={() => handleEdit(record)} style={{ color: '#77B5FE' }} />
        <DeleteOutlined onClick={() => handleDelete(record)} style={{ color: 'red' }} />
    </Space>
        )},
  },
  ]

  const handleDelete = (record) => {
    Modal.confirm({
      title: "Está seguro que desea eliminar esta actividad?",
      onOk: () => {
        async function deleteData(id) {
          console.log(axios.delete(endPoint + "activities/" + record.id));
        }
        deleteData(record.id);
        setActividades((pre) => {
          return pre.filter( record.id)
        } );
      }
    })
  }

  const handleEdit = (record) => {
    navigate('/backoffice/edit-activities/' + record.id);
}

  return (
    <div className="new-backoffice-container">
            <div className="create-new-btn">
                <Link to='/backoffice/activities/create'>
                    <Button>Crear Actividad</Button>
                </Link>
            </div>
            <div className="new-table-container">
                <Table 
                    dataSource={actividades} 
                    columns={columns} 
                    scroll={{
                        x: 400,
                      }}
                    className="new-table" />
            </div>
        </div>
    );
}

export default ActivitiesListBackoffice;