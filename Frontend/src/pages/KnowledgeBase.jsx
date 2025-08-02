import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const KnowledgeBase = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/articles/')
      .then(response => {
        setArticles(response.data);
      })
      .catch(error => {
        console.error('Error fetching articles:', error);
      });
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-4 py-6">
      {articles.map(article => (
        <Link to={`/knowledge/${article.id}`} key={article.id} className="shadow rounded overflow-hidden bg-white">
          <img src={`${article.image}`} alt={article.title} className="w-full h-48 object-cover" />
          <div className="p-4">
            <h3 className="text-lg font-semibold">{article.title}</h3>
            <p className="text-sm text-gray-500 mt-2 line-clamp-3">{article.description}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default KnowledgeBase;
