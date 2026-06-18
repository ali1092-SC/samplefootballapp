import React, { useState } from 'react';
import { newsArticles } from '../data/newsData';

const NewsCard = ({ article, featured = false }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered
          ? 'linear-gradient(135deg, rgba(10,32,96,0.95), rgba(0,13,46,1))'
          : 'linear-gradient(135deg, rgba(10,32,96,0.7), rgba(0,13,46,0.85))',
        border: `1px solid ${hovered ? 'rgba(201,168,76,0.4)' : 'rgba(201,168,76,0.12)'}`,
        borderRadius: '16px',
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
        boxShadow: hovered ? '0 20px 60px rgba(201,168,76,0.15)' : 'none',
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
      }}
    >
      {/* Image Area */}
      <div style={{
        height: featured ? '240px' : '160px',
        background: `linear-gradient(135deg, #0a1f5c, #041238)`,
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        {/* Gradient overlay */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, transparent 40%, rgba(0,13,46,0.8) 100%)'
        }} />

        {/* Image placeholder */}
        <div style={{
          fontSize: featured ? '80px' : '60px',
          opacity: 0.6,
          filter: 'drop-shadow(0 4px 20px rgba(0,0,0,0.5))'
        }}>
          {article.image}
        </div>

        {/* Category Badge */}
        <div style={{
          position: 'absolute',
          top: '12px',
          left: '12px',
          background: article.categoryColor,
          color: '#fff',
          padding: '4px 12px',
          borderRadius: '4px',
          fontSize: '10px',
          fontWeight: '800',
          letterSpacing: '2px',
          textTransform: 'uppercase'
        }}>
          {article.category}
        </div>

        {/* Tag */}
        <div style={{
          position: 'absolute',
          top: '12px',
          right: '12px',
          background: 'rgba(0,0,0,0.6)',
          color: '#c9a84c',
          padding: '4px 10px',
          borderRadius: '20px',
          fontSize: '10px',
          fontWeight: '700',
          letterSpacing: '1px',
          border: '1px solid rgba(201,168,76,0.3)'
        }}>
          {article.tag}
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <h3 style={{
          fontFamily: 'Oswald, sans-serif',
          fontSize: featured ? '20px' : '16px',
          fontWeight: '700',
          color: '#ffffff',
          lineHeight: '1.4',
          marginBottom: '12px',
          flex: 1,
          letterSpacing: '0.5px'
        }}>
          {article.headline}
        </h3>

        <p style={{
          fontSize: '13px',
          color: '#8a9bb5',
          lineHeight: '1.7',
          marginBottom: '16px',
          display: featured ? 'block' : '-webkit-box',
          WebkitLineClamp: featured ? 'unset' : 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden'
        }}>
          {article.summary}
        </p>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingTop: '12px',
          borderTop: '1px solid rgba(255,255,255,0.05)'
        }}>
          <span style={{ fontSize: '11px', color: '#8a9bb5' }}>
            🕐 {article.time}
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontSize: '11px', color: '#8a9bb5' }}>📖 {article.readTime}</span>
            <span style={{
              background: 'rgba(201,168,76,0.1)',
              border: '1px solid rgba(201,168,76,0.3)',
              color: '#c9a84c',
              padding: '4px 12px',
              borderRadius: '20px',
              fontSize: '11px',
              fontWeight: '700',
              marginLeft: '8px'
            }}>
              READ →
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

const LatestNews = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const filters = ['All', 'Breaking', 'Match Preview', 'Team News', 'Analysis'];

  const filtered = activeFilter === 'All'
    ? newsArticles
    : newsArticles.filter(a => a.category.includes(activeFilter.toUpperCase()) || a.tag.includes(activeFilter));

  return (
    <section id="news" style={{
      padding: '80px 0 120px',
      background: 'linear-gradient(180deg, #04122a 0%, #000d2e 100%)'
    }}>
      <div className="section-container">
        <div style={{ marginBottom: '48px' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(212,20,60,0.15)',
            border: '1px solid rgba(212,20,60,0.4)',
            borderRadius: '4px',
            padding: '4px 12px',
            marginBottom: '16px',
            fontSize: '11px',
            fontWeight: '700',
            letterSpacing: '2px',
            color: '#d4143c',
            textTransform: 'uppercase'
          }}>
            📰 Latest Updates
          </div>
          <h2 className="section-title">LATEST NEWS</h2>
          <p style={{ color: '#8a9bb5', marginTop: '12px', fontSize: '15px' }}>
            Breaking news, match previews, and team updates from the tournament
          </p>
        </div>

        {/* Filter Tabs */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '40px', flexWrap: 'wrap' }}>
          {filters.map(filter => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              style={{
                background: activeFilter === filter ? 'rgba(212,20,60,0.9)' : 'rgba(255,255,255,0.05)',
                color: activeFilter === filter ? '#fff' : '#8a9bb5',
                border: activeFilter === filter ? 'none' : '1px solid rgba(255,255,255,0.1)',
                padding: '8px 20px',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: '700',
                fontSize: '12px',
                letterSpacing: '1px',
                textTransform: 'uppercase',
                transition: 'all 0.2s ease'
              }}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Featured Story */}
        {activeFilter === 'All' && (
          <div style={{ marginBottom: '32px' }}>
            <div style={{
              fontSize: '11px',
              color: '#c9a84c',
              fontWeight: '700',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              marginBottom: '16px'
            }}>
              📌 FEATURED STORY
            </div>
            <NewsCard article={newsArticles[0]} featured={true} />
          </div>
        )}

        {/* News Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '24px'
        }}>
          {(activeFilter === 'All' ? filtered.slice(1) : filtered).map(article => (
            <NewsCard key={article.id} article={article} />
          ))}
        </div>

        {/* Load More */}
        <div style={{ textAlign: 'center', marginTop: '48px' }}>
          <button style={{
            background: 'transparent',
            border: '1px solid rgba(201,168,76,0.4)',
            color: '#c9a84c',
            padding: '14px 48px',
            borderRadius: '8px',
            cursor: 'pointer',
            fontFamily: 'Oswald, sans-serif',
            fontSize: '15px',
            fontWeight: '700',
            letterSpacing: '2px',
            textTransform: 'uppercase',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={e => {
            e.target.style.background = 'rgba(201,168,76,0.1)';
            e.target.style.borderColor = '#c9a84c';
          }}
          onMouseLeave={e => {
            e.target.style.background = 'transparent';
            e.target.style.borderColor = 'rgba(201,168,76,0.4)';
          }}
          >
            Load More Stories
          </button>
        </div>
      </div>
    </section>
  );
};

export default LatestNews;
