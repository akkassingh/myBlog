import React from 'react';
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';

import NotFoundPage from "./NotFoundPage";
import articles from "./article-content";

const ArticlePage = () => {
  const [ articleInfo, setArticleInfo ] = useState({
    upvotes: 0,
    comments: []
  })

  useEffect(() => {
    const loadArticleInfo = async () => {
      const response  = await axios.get(`/api/articles/${articleId}`);
      const article = response.data;
      setArticleInfo(article);  
    }
    loadArticleInfo();
  }, [])

  const { articleId } = useParams();
  const article = articles.find((article) => article.name === articleId);

  if (!article) {
    return <NotFoundPage />;
  }

  return (
    <>
      <h1>{article.title}</h1>
      <p>This article has {articleInfo.upvotes} upvote(s)</p>
      {article.content.map((paragraph, i) => (
        <p key={i}>{paragraph}</p>
      ))}
    </>
  );
};

export default ArticlePage;
