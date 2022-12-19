import { Space } from "antd";
import { useEffect, useState } from "react";
import { useDebounce } from "../../Hooks";
import { getData } from "../../Services/privateApiService";

export const CategoriesSearch = ({ setCategories }) => {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    let data = [];
    debouncedSearch.length >= 3
      ? getData(`/categories?search=${debouncedSearch}`).then((res) => {
          data = res.data.map(
            (category) =>
              (category = {
                id: category.id,
                name: category.name,
                created_at: category.created_at,
                key: category.id,
              })
          );
          setCategories(data);
        })
      : getData("/categories").then((res) => {
          data = res.data.map(
            (category) =>
              (category = {
                id: category.id,
                name: category.name,
                created_at: category.created_at,
                key: category.id,
              })
          );
          setCategories(data);
        });
  }, [debouncedSearch, setCategories]);

  return (
    <Space className="users-header-search-filters">
      <input
        value={search}
        onChange={handleChange}
        type="text"
        placeholder="Buscar"
        className="users-search-bar"
      />
    </Space>
  );
};
