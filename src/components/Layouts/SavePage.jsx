import React from "react";
import Navbar from "../Fragments/Navbar";

const SavePage = () => {
  const [readArticles, setReadArticles] = React.useState([]);

  React.useEffect(() => {
    const savedArticles =
      JSON.parse(localStorage.getItem("readArticles")) || [];
    setReadArticles(savedArticles);
  }, []);

  return (
    <>
      <Navbar />
      <div className="p-4">
        <h2 className="text-2xl font-semibold mb-4">Read History</h2>
        <div className="flex flex-wrap gap-4 justify-center">
          {readArticles.length > 0 ? (
            readArticles.map((article) => (
              <div
                key={article.url}
                className="w-[300px] flex flex-col items-center p-4 border border-gray-300 rounded-lg shadow-md bg-white justify-between"
              >
                <img
                  src={article.urlToImage}
                  alt={article.title}
                  className="w-full h-[150px] rounded-md object-cover mb-2"
                />
                <h3 className="text-lg font-medium text-center">
                  {article.title}
                </h3>
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
                >
                  Read Article
                </a>
              </div>
            ))
          ) : (
            <p>No articles read yet.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default SavePage;
