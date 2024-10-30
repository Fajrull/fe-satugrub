import React from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import { useNavigate } from "react-router-dom";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import HomeIcon from "@mui/icons-material/Home";

const Home = () => {
  const [articles, setArticles] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [search, setSearch] = React.useState("");
  const [error, setError] = React.useState(null);
  const navigate = useNavigate();

  const getArticles = async () => {
    try {
      const { data } = await axios.get(
        "https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=b78d4099322a453aa8d3e1fac869917f"
      );
      setArticles(data.articles);
    } catch (error) {
      setError("Error fetching articles. Please try again later.");
      console.error("Error fetching articles:", error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    getArticles();
  }, []);

  const formatDate = (dateString) => {
    const options = {
      weekday: "short",
      day: "2-digit",
      month: "long",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    };

    const date = new Date(dateString);
    return date.toLocaleString("id-ID", options);
  };

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const filteredArticles = articles.filter((article) =>
    article.title.toLowerCase().includes(search.toLowerCase().trim())
  );

  const navigateToSave = () => {
    navigate("/save");
  };

  const navigateToHome = () => {
    navigate("/");
  };

  const saveToReadHistory = (article) => {
    const readArticles = JSON.parse(localStorage.getItem("readArticles")) || [];

    if (!readArticles.some((a) => a.url === article.url)) {
      readArticles.push({
        title: article.title,
        url: article.url,
        urlToImage: article.urlToImage,
      });
      localStorage.setItem("readArticles", JSON.stringify(readArticles));
    }
  };

  const handleReadMore = (article) => {
    saveToReadHistory(article);
    window.open(article.url, "_blank");
  };

  return (
    <>
      <nav className="flex justify-between items-center px-8 py-3 bg-black text-white">
        <img
          src="https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=48,h=48,fit=crop,f=png/YX41e9wK07ikx6kP/icon-satugroup-mv04oPqZoLtlZXp2.png"
          alt=""
        />
        <div className="flex items-center gap-6 justify-center">
          <h1 className="cursor-pointer flex gap-2" onClick={navigateToHome}>
            <HomeIcon />
            Home
          </h1>
          <h1 onClick={navigateToSave} className="cursor-pointer flex gap-2">
            <BookmarkIcon />
            Read History
          </h1>
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={handleSearch}
            className="border border-gray-400 rounded-xl p-2 w-[300px] text-black"
          />
        </div>
      </nav>
      <main className="flex flex-row gap-4 justify-center flex-wrap p-4">
        {loading ? (
          Array.from(new Array(10)).map((_, index) => (
            <Box
              key={index}
              className="flex flex-col items-center gap-4 p-4 border border-gray-400 rounded w-[350px] h-auto"
            >
              <Skeleton variant="rectangular" width={300} height={200} />
              <Skeleton width="100%" height={80} />
              <Skeleton width="40%" />
              <Skeleton width="40%" />
              <Skeleton width="100%" height={80} />
            </Box>
          ))
        ) : error ? (
          <div className="text-red-500">{error}</div>
        ) : filteredArticles.length > 0 ? (
          filteredArticles.map((article) => (
            <div
              key={article.url}
              className="w-[350px] flex flex-col justify-between p-6 border border-gray-300 rounded-lg shadow-md bg-white"
            >
              <div>
                <div>
                  <p className="text-xs text-gray-400 text-right">
                    {article.source.name}
                  </p>
                  <p className="text-xs text-gray-400 text-right mb-2">
                    {formatDate(article.publishedAt)}
                  </p>
                </div>
                <img
                  className="w-full h-[200px] rounded-md object-cover mb-2"
                  src={article.urlToImage}
                  alt={article.title || "Article Image"}
                />
                <p className="text-sm text-gray-500 text-center mb-2">
                  Author : {article.author}
                </p>
              </div>
              <h1 className="text-xl font-semibold text-gray-800 text-center mb-2">
                {article.title}
              </h1>
              <p className="text-gray-700 text-justify mb-4">
                <span className="font-medium"></span> {article.description}
              </p>

              <button
                onClick={() => handleReadMore(article)}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
              >
                Read More
              </button>
            </div>
          ))
        ) : (
          <div>No articles found. Please try again.</div>
        )}
      </main>
    </>
  );
};

export default Home;
