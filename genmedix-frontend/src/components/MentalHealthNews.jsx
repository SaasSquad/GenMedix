import React, { useState, useEffect } from "react";
import axios from "axios";

const MentalHealthNews = () => {
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const fetchArticles = async (pageNumber = 1) => {
    // Replace with your actual API key
    // const query = "mental health OR Anxiety OR Depression OR Stress OR Therapy OR Counseling OR Psychiatrist OR Psychologist OR Trauma OR Bipolar Disorder OR Schizophrenia OR OCD OR PTSD OR ADHD OR Mindfulness OR mental Self-care OR Insomnia OR Fatigue OR Irritability OR Mood Swings OR Panic Attacks OR Cognitive Behavioral Therapy (CBT) OR Medication OR Support Groups";

    //to much query causes 400 bad request error, worked initially

    const query = "mental health OR Anxiety OR Depression OR stress OR Therapy";

    const url = `https://gnews.io/api/v4/search?q=${encodeURIComponent(
      query
    )}&lang=en&country=us&max=10&page=${pageNumber}&apikey=${import.meta.env.VITE_NEWS_API_KEY}`;

    try {
      setLoading(true);
      const response = await axios.get(url);
      if (pageNumber === 1) {
        setArticles(response.data.articles);
      } else {
        setArticles((prevArticles) => [
          ...prevArticles,
          ...response.data.articles,
        ]);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching articles:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const handleLoadMoreArticles = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchArticles(nextPage);
  };

  return (
    <div>
      <div>
        {articles.map((article, index) => (
          <div key={index} className="border border-blue-400 border-4 p-8 mb-4">
            <h2 className="text-2xl font-bold">{article.title}</h2>
            <p className="my-4">{article.description}</p>
            <a href={article.url} target="_blank" rel="noopener noreferrer" className="bg-blue-400 p-2">
              Read more
            </a>
          </div>
        ))}
      </div>
      {articles.length > 0 && !loading && (
        <button onClick={handleLoadMoreArticles} disabled={loading}>
          Load More Articles
        </button>
      )}
      {loading && <p>Loading...</p>}
    </div>
  );
};

export default MentalHealthNews;
