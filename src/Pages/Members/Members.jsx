import { Skeleton } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { ListMembers, Title } from "../../Components";
import { useDebounce } from "../../Hooks";

export function Members() {
    const [members, setMembers] = useState([]);
    const [search, setSearch] = useState("");
    const [isLoading, setIsLoading] = useState(true);
  
    const debouncedSearch = useDebounce(search, 500);
  
    const handleChange = (e) => {
      setSearch(e.target.value);
    };
  
    useEffect(() => {
      let finalURL = "https://ongapi.alkemy.org/api/members";
      debouncedSearch.length >= 3
        ? (finalURL = `https://ongapi.alkemy.org/api/members?search=${debouncedSearch}`)
        : (finalURL = "https://ongapi.alkemy.org/api/members");
  
      axios.get(finalURL).then((res) => {
        const results = res.data.data.map((value) => {
          return {
            id: value.id,
                name: value.name,
                image: value.image,
                description: value.description,
                facebookUrl: value.facebookUrl,
                linkedinUrl: value.linkedinUrl
          };
        });
        setMembers(results);
        setIsLoading(false);
      });
    }, [debouncedSearch]);
  
    return (
      <>
        <div className="news-title">
          <Title title="Miembros" containerStyles={{ paddingTop: "5px" }} />
        </div>
  
        <div className="news-search">
          <input
            value={search}
            onChange={handleChange}
            type="text"
            placeholder="Buscar"
            className="news-search-bar"
          />
        </div>
        <div className="listado">
          <Skeleton active={true} loading={isLoading}>
            <ListMembers latestMembers={members} />
          </Skeleton>
        </div>
      </>
    );
}
