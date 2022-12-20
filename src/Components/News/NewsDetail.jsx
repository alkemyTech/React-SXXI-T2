import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { LazyImage } from "../LazyImage/LazyImage";
import { Title } from "../Title/Title";
import axios from "axios";
import "./News.scss";
import { Button } from "antd";

export function NewsDetail() {
  const { id } = useParams();
  const [oneNews, setOneNews] = useState();
  const navigate = useNavigate();

  const endPoint = `https://ongapi.alkemy.org/public/api/news/${id}`;

  useEffect(() => {
    axios
      .get(endPoint)
      .then((response) => {
        setOneNews(response.data.data);
      })
      .catch((err) => console.log(err));
  }, [endPoint]);

  return (
    <>
      <div className="container-news-detail">
        <Title title="Novedades" titleStyles={{ textAlign: "center" }} />
        <LazyImage imgClass="imgCard2" imgSrc={oneNews?.image} imgAlt="" />
        <div className="card-info2" key={oneNews?.id}>
          <Title
            title={oneNews?.name}
            containerStyles={{ paddingLeft: "13%" }}
          />
          <p className="description-new-detail">
            {oneNews && oneNews.content.replace(/<\/?[^>]+>/gi, "")}
          </p>
        </div>
        <Button className="btn-goback-news" onClick={() => navigate("/news")}>
          Volver
        </Button>
      </div>
    </>
  );
}
