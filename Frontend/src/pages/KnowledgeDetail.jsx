import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

const KnowledgeDetail = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        // Fetch article detail
        const response = await axios.get(`http://localhost:8000/api/articles/${id}/`);
        setArticle(response.data);
      } catch (error) {
        console.error('Error fetching article:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

  if (loading) return <div className="text-center p-8">Loading article...</div>;
  if (!article) return <div className="text-center p-8 text-red-600">Article not found</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Article */}
      <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
        <h1 className="text-3xl font-bold mb-4">{article.title}</h1>
        <img
          src={`${article.image}`}
          alt={article.title}
          className="w-full h-64 object-cover rounded-md mb-6"
        />
        <p className="text-gray-700 text-lg whitespace-pre-line mb-4">{article.description}</p>
        <p className="text-sm text-gray-500">Posted on {new Date(article.date).toLocaleDateString()}</p>
      </div>
    </div>
  );
};

export default KnowledgeDetail;
