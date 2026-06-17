import React from 'react';
import { newsArticles, tickerNews } from '../data/newsData';
import './LatestNews.css';

const categoryStyles = {
  Preview: { bg: 'rgba(0,31,91,0.12)', color: '#001F5B' },
  Recap: { bg: 'rgba(200,16,46,0.12)', color: '#C8102E' },
  Analysis: { bg: 'rgba(212,175,55,0.12)', color: '#B8960C' },
  Update: { bg: 'rgba(0,166,81,0.12)', color: '#00A651' },
  Tactical: { bg: 'rgba(123,45,139,0.12)', color: '#7B2D8B' },
};

const NewsCard = ({ article, featured }) => {
  const catStyle = categoryStyles[article.category] || { bg: 'rgba(0,31,91,0.1)', color: '#001F5B' };

  return (
    <div className={`news-card${featured ? ' news-card--featured' : ''}`}>
      <div
        className="news-card__image"
        style={{ background: article.imageGradient }}
      >
        <span className="news-card__image-emoji">{article.imageEmoji}</span>
        <div className="news-card__image-overlay" />
      </div>
      <div className="news-card__body">
        <div className="news-card__meta">
          <span
            className="news-card__category"
            style={{ background: catStyle.bg, color: catStyle.color }}
          >
            {article.category}
          </span>
          <span className="news-card__time">{article.timestamp}</span>
        </div>
        <h3 className="news-card__headline">{article.headline}</h3>
        <p className="news-card__excerpt">{article.excerpt}</p>
        <div className="news-card__footer">
          <div className="news-card__author">
            <div className="news-card__author-avatar">
              {article.author.charAt(0)}
            </div>
            <div>
              <span className="news-card__author-name">{article.author}</span>
              <span className="news-card__read-time">{article.readTime}</span>
            </div>
          </div>
          <button className="news-card__btn">
            Read More →
          </button>
        </div>
      </div>
    </div>
  );
};

const LatestNews = () => (
  <section id="news" className="latest-news dark-section">
    <div className="news-ticker">
      <div className="news-ticker__label">
        <span className="news-ticker__live">LIVE</span>
        UPDATES
      </div>
      <div className="news-ticker__track">
        <div className="news-ticker__content">
          {[...tickerNews, ...tickerNews].map((item, i) => (
            <span key={i} className="news-ticker__item">
              {item}
              <span className="news-ticker__sep">·</span>
            </span>
          ))}
        </div>
      </div>
    </div>

    <div className="container">
      <div className="section-header">
        <p className="section-subtitle">FIFA World Cup 2026™</p>
        <h2 className="section-title">Latest <span>News</span></h2>
        <div className="section-divider" />
      </div>

      <div className="news-featured">
        {newsArticles.filter(a => a.featured).map(a => (
          <NewsCard key={a.id} article={a} featured />
        ))}
      </div>

      <div className="news-grid">
        {newsArticles.filter(a => !a.featured).map(a => (
          <NewsCard key={a.id} article={a} />
        ))}
      </div>
    </div>
  </section>
);

export default LatestNews;
