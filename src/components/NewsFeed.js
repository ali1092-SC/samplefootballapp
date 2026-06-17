import React, { useState } from 'react';
import { newsArticles } from '../data/news';
import './NewsFeed.css';

const categories = ['All', 'Match Report', 'Tournament News', 'Feature', 'Guide'];

export default function NewsFeed() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [imgErrors, setImgErrors] = useState({});

  const filtered = activeCategory === 'All'
    ? newsArticles
    : newsArticles.filter((a) => a.category === activeCategory);

  const featured = filtered.find((a) => a.featured);
  const rest = filtered.filter((a) => !a.featured);

  const formatDate = (isoStr) => {
    const d = new Date(isoStr);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) + ' · ' +
      d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  const handleImgError = (id) => {
    setImgErrors((prev) => ({ ...prev, [id]: true }));
  };

  const categoryColors = {
    'Match Report': '#c8102e',
    'Tournament News': '#001f5b',
    'Feature': '#c9a84c',
    'Guide': '#00a651',
  };

  return (
    <div className="news-section">
      <div className="section-wrapper">
        <div className="section-header">
          <div className="section-subtitle">Latest Updates</div>
          <h2 className="section-title">News & Highlights</h2>
        </div>

        <div className="news-filter-bar">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`news-filter-btn ${activeCategory === cat ? 'news-filter-active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {featured && (
          <div className="news-featured">
            <div className="news-featured-image">
              {!imgErrors[featured.id] ? (
                <img
                  src={featured.thumbnail}
                  alt={featured.headline}
                  onError={() => handleImgError(featured.id)}
                />
              ) : (
                <div className="news-img-fallback">
                  <i className="fas fa-newspaper" />
                </div>
              )}
              <div className="news-featured-overlay" />
              <div className="news-featured-content">
                <span
                  className="news-category-tag"
                  style={{ background: categoryColors[featured.category] || '#001f5b' }}
                >
                  {featured.category}
                </span>
                <h2 className="news-featured-headline">{featured.headline}</h2>
                <p className="news-featured-summary">{featured.summary}</p>
                <div className="news-featured-meta">
                  <span className="news-source">
                    <i className="fas fa-rss" /> {featured.source}
                  </span>
                  <span className="news-time">
                    <i className="fas fa-clock" /> {formatDate(featured.timestamp)}
                  </span>
                  <a href={featured.url} target="_blank" rel="noopener noreferrer" className="news-read-more">
                    Read Full Story <i className="fas fa-arrow-right" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="news-grid">
          {(featured ? rest : filtered).map((article, idx) => (
            <div
              key={article.id}
              className="news-card"
              style={{ animationDelay: `${idx * 0.08}s` }}
            >
              <div className="news-card-image">
                {!imgErrors[article.id] ? (
                  <img
                    src={article.thumbnail}
                    alt={article.headline}
                    onError={() => handleImgError(article.id)}
                    loading="lazy"
                  />
                ) : (
                  <div className="news-img-fallback">
                    <i className="fas fa-newspaper" />
                  </div>
                )}
                <span
                  className="news-category-badge"
                  style={{ background: categoryColors[article.category] || '#001f5b' }}
                >
                  {article.category}
                </span>
              </div>

              <div className="news-card-body">
                <h3 className="news-card-headline">{article.headline}</h3>
                <p className="news-card-summary">{article.summary}</p>

                <div className="news-card-footer">
                  <div className="news-card-meta">
                    <span className="news-card-source">{article.source}</span>
                    <span className="news-card-time">{formatDate(article.timestamp)}</span>
                  </div>
                  <a href={article.url} target="_blank" rel="noopener noreferrer" className="news-card-link">
                    Read More <i className="fas fa-external-link-alt" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="no-news">
            <i className="fas fa-newspaper" />
            <p>No articles found in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
}
