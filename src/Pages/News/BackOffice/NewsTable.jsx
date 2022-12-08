import { Table, Space, Modal, Button } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useDebounce } from "../../../Hooks";

export function NewsTable() {

    const API_URL = "https://ongapi.alkemy.org/api/";

    const [news, setNews] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('todas');
    const [search, setSearch] = useState('');

    const debouncedSearch = useDebounce(search, 500);

    const navigate = useNavigate();

    const handleChange = (e) => {
        setSearch(e.target.value);
    }

    const handleSelectChange = (e) => {
        console.log(selectedCategory)
        setSelectedCategory(e.target.value);
    }

    useEffect(() => {
        async function fetchData() {

            let { data } = await axios.get(API_URL + "categories");

            const results = data.data.map((value) => {
                return {
                    id: value.id,
                    name: value.name,
                }
            });

            setCategories(results)
        }
        fetchData();
    }, []);

    useEffect(() => {
        async function fetchData() {

            let finalURL = 'news';

            if (debouncedSearch.length >= 3) {
                finalURL = `news?search=${debouncedSearch}`;
            }

            if (selectedCategory !== 'todas') {
                finalURL = `news?category=${selectedCategory}`;
            }

            if (debouncedSearch.length >= 3 && selectedCategory !== 'todas') {
                finalURL = `news?search=${debouncedSearch}&category=${selectedCategory}`;
            }

            let { data } = await axios.get(API_URL + finalURL);

            const results = data.data.map((value) => {
                return {
                    key: value.id,
                    name: value.name,
                    image: value.image,
                    createdAt: value.created_at,
                }
            });

            setNews(results)
        }
        fetchData();
    }, [debouncedSearch, selectedCategory]);

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

    const handleDelete = (record) => {
        Modal.confirm({
            title: "Are you sure you want to delete this new?",
            onOk: () => {
                async function deleteData(id) {
                    console.log(axios.delete(API_URL + "news/" + record.id));
                }

                deleteData(record.id);
                setNews((pre) => {
                    return pre.filter((item) => item.id !== record.id);
                });
            }
        });
    };

    const handleEdit = (record) => {
        navigate('/backoffice/news/create/' + record.id);
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

            <div className="news-search">
                <input value={search} onChange={handleChange} type="text" placeholder="Search" className="news-search-bar" />
                <select onChange={handleSelectChange} className='news-select' >
                    <option value='todas' className='news-option'>Todas</option>
                    {categories.map((opt) => {
                        return (
                            <option key={opt.id} value={opt.id} className='news-option'>{opt.name}</option>
                        )
                    })}
                </select>
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