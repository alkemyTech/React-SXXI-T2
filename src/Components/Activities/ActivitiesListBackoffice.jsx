import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Table, Space, Modal, Button, Input, Popconfirm } from 'antd';
import debounce from 'lodash.debounce';
import './ActivitiesListBack.scss';

function ActivitiesListBackoffice() {
  const [actividades, setActividades] = useState([]);
  const endPoint = `https://ongapi.alkemy.org/public/api/activities`;
  const navigate = useNavigate();
  const { Search } = Input;
  const [ search, setSearch ] = useState("");  

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

const handleSearch = debounce(event => {
  setSearch(event?.target.value)
}, 500)

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
      fixed: 'right',
      render: (_, record) => {
        return (
             <Space size="middle">
              <Popconfirm 
                            title= 'Are you sure you want to delete this Activity?'
                            onConfirm={() => {
                                handleDelete(record)
                            }}
                            okText='Yes'
                            cancelText='No' 
                            value={record}
                        >
        <EditOutlined onClick={() => handleEdit(record)} style={{ color: '#77B5FE' }} />
        <DeleteOutlined  style={{ color: 'red' }}/>
        </Popconfirm>
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
            <div>
            <div>
            <Space direction="vertical">
              <Search
                placeholder="Ingrese actividad a buscar"
                allowClear
                enterButton="Search"
                size="large"
                onSearch={handleSearch}
             />
    
  </Space>
          </div>
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