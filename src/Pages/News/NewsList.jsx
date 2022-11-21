import { Table, Space } from "antd";
import { useEffect, useState } from "react";
import axios from "axios";

export function NewsList(){

    const API_URL = "https://ongapi.alkemy.org/api/";
    const [news, setNews] = useState([]);

    useEffect(() => {
        async function fetchData() {

            const { data } = await axios.get(API_URL+"news");
            const results = data.data.map((value) => {
                return {
                    name: value.name,
                    image: value.image,
                    createdAt: value.created_at,
                }
            });
            setNews(results)
        }
        fetchData();
    }, []);


    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: 'Image',
            dataIndex: 'image',
            key: 'image',
            render: imageURL => <img src={imageURL} alt={imageURL} className='table-new-img' />
        },
        {
            title: 'Created At',
            dataIndex: 'createdAt',
            key: 'createdAt'
        },
        {
            title: 'Actions',
            dataIndex: 'actions',
            key: 'actions',
            render: (_, record) => (
                <Space size="middle">
                  <a>Invite {record.name}</a>
                  <a>Delete</a>
                </Space>
              )
        },
    ]

    return (
        <div>
            <Table dataSource={news} columns={columns} />
        </div>
    );
}