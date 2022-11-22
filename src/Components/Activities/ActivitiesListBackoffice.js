import axios from 'axios';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Table, Space } from 'antd';
import './Activities.scss';

function ActivitiesListBackoffice() {
  const [actividades, setActividades] = useState([]);
  const endPoint = `https://ongapi.alkemy.org/public/api/activities`;

  useEffect(() => {
    async function fetchData() {

        const { data } = await axios.get(endPoint);
        const results = data.data.map((activity) => {
            return {
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
      render: (_, record) => (
          <Space size="middle">
            <Link to='/backoffice/create-project'>Editar</Link>
            <Link to='/backoffice/create-project'>Eliminar</Link>
          </Space>
        )
  },
  ]

  return (
    <div>
      <h1 className="cardH1">Actividades</h1>
      <div>
            <Table dataSource={actividades} columns={columns} />
        </div>
      <Link to={`/activities/create-projets`}>
                    <button className="verMas">Crear nuevo proyecto</button>
      </Link>
      </div>
  );
}

export default ActivitiesListBackoffice;