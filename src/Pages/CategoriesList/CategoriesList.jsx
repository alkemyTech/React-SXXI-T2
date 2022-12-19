import { Link, useNavigate } from "react-router-dom";
import { Table, Space, Button } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useState } from "react";
import "./CategoriesList.css";
import { deleteCategory } from "../../Services/categoriesService";
import { confirmAlert } from "../../Services/alertService";
import { CategoriesSearch } from "./CategoriesSearch";
import { Title } from "../../Components/Title/Title";

export function CategoriesList() {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  const columns = [
    {
      title: "Código",
      dataIndex: "id",
      key: "id",
      fixed: "left",
    },
    {
      title: "Nombre",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Creado",
      dataIndex: "created_at",
      key: "created_at",
    },
    {
      title: "Acciones",
      dataIndex: "actions",
      key: "actions",
      fixed: "right",
      render: (_, record) => {
        return (
          <Space size="middle">
            <EditOutlined
              onClick={() => handleEdit(record)}
              style={{ color: "#77B5FE" }}
            />
            <DeleteOutlined
              onClick={() => handleDelete(record)}
              style={{ color: "red" }}
            />
          </Space>
        );
      },
    },
  ];

  const remove = (record) => {
    deleteCategory(record.id);
    setCategories((pre) => {
      return pre.filter((item) => item.id !== record.id);
    });
  };

  const handleDelete = (record) => {
    confirmAlert(
      "Eliminar categoria",
      `¿Desea eliminar la categoria ${record.name}?`,
      "Eliminar",
      remove,
      record
    );
  };

  const handleEdit = (record) => {
    navigate("/backoffice/edit-categories/" + record.id);
  };

  return (
    <div className="users-table-container">
      <Space className="users-header-container">
        <Title title="Categorías" />
        <CategoriesSearch setCategories={setCategories} />
        <Link to="/backoffice/create-categories">
          <Button>Crear categoría</Button>
        </Link>
      </Space>
      <Table
        dataSource={categories}
        columns={columns}
        className="user-table"
        pagination={{ pageSize: 8 }}
        scroll={{ y: 440 }}
      />
    </div>
  );
}
