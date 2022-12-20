import { Card } from "antd";
import { useNavigate } from "react-router-dom";

export const NewsList = (news) => {
  const { latestNews } = news;
  const navigate = useNavigate();

  const limitString = (str) => {
    if (str.length > 60) {
      return str.substring(0, 57) + "...";
    }
    return str;
  };

  return (
    <ul className="cards">
      {latestNews.length > 0 ? (
        latestNews.map((element) => {
          return (
            <li key={element.id}>
              <Card
                size="default"
                title={element.name}
                className="individual-card"
                onClick={() => navigate(`/news/${element.id}`)}
              >
                <div className="card-content">
                  <img
                    src={element.image}
                    alt={element.name}
                    className="card-image"
                  />
                  <p>
                    {element &&
                      limitString(element.content.replace(/<\/?[^>]+>/gi, ""))}
                  </p>
                </div>
              </Card>
            </li>
          );
        })
      ) : (
        <p>No hay novedades</p>
      )}
    </ul>
  );
};
