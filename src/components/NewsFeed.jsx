import React, { useState } from 'react';
import { newsArticles } from '../data/news';

const NewsModal = ({ article, onClose }) => {
  if (!article) return null;
  return (
    <div
      className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-fifa-navyDark border border-fifa-gold/20 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Image */}
        <div className="relative h-64 overflow-hidden rounded-t-3xl">
          <img
            src={article.image}
            alt={article.headline}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-fifa-navyDark to-transparent"></div>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 bg-black/60 rounded-full flex items-center justify-center text-white hover:bg-black/80 transition-colors text-xl"
          >
            ×
          </button>
          <span className={`absolute bottom-4 left-4 text-xs font-bold text-white px-3 py-1 rounded-full ${article.tagColor}`}>
            {article.tag}
          </span>
        </div>

        {/* Content */}
        <div className="p-8">
          <div className="flex items-center gap-3 mb-4 text-xs text-white/40">
            <span>{article.author}</span>
            <span>·</span>
            <span>{article.timestamp}</span>
            <span>·</span>
            <span>{article.readTime}</span>
          </div>
          <h2 className="font-bebas text-3xl text-white tracking-wider leading-tight mb-4">{article.headline}</h2>
          <p className="text-white/70 leading-relaxed mb-4">{article.summary}</p>
          <p className="text-white/50 leading-relaxed text-sm">{article.fullText}</p>

          <div className="mt-6 pt-6 border-t border-fifa-gold/10 flex items-center justify-between">
            <span className="text-xs bg-fifa-gold/10 text-fifa-gold border border-fifa-gold/20 rounded-full px-3 py-1 font-semibold">
              {article.category}
            </span>
            <button
              onClick={onClose}
              className="text-white/40 hover:text-white text-sm transition-colors"
            >
              Close ×
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const NewsCard = ({ article, featured, onClick }) => (
  <div
    onClick={() => onClick(article)}
    className={`news-card fifa-card border border-fifa-gold/15 hover:border-fifa-gold/40 cursor-pointer overflow-hidden ${featured ? 'md:col-span-2 md:row-span-2' : ''}`}
  >
    {/* Image */}
    <div className={`overflow-hidden relative ${featured ? 'h-64' : 'h-44'}`}>
      <img
        src={article.image}
        alt={article.headline}
        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        onError={(e) => { e.target.parentElement.style.background = '#001A5C'; }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-fifa-navyDark via-transparent to-transparent"></div>
      <span className={`absolute top-3 left-3 text-xs font-bold text-white px-3 py-1 rounded-full ${article.tagColor}`}>
        {article.tag}
      </span>
      <span className="absolute top-3 right-3 text-xs text-white/60 bg-black/50 rounded-full px-2 py-1 backdrop-blur-sm">
        {article.readTime}
      </span>
    </div>

    {/* Content */}
    <div className={`p-5 ${featured ? 'p-6' : ''}`}>
      <div className="flex items-center gap-2 mb-2">
        <span className="text-xs text-fifa-gold/60 font-semibold uppercase tracking-wider">{article.category}</span>
        <span className="text-white/20">·</span>
        <span className="text-white/40 text-xs">{article.timestamp}</span>
      </div>
      <h3 className={`font-bebas text-white tracking-wider leading-tight mb-2 ${featured ? 'text-2xl' : 'text-xl'}`}>
        {article.headline}
      </h3>
      <p className={`text-white/50 text-sm leading-relaxed ${featured ? '' : 'line-clamp-2'}`}>
        {article.summary}
      </p>
      <div className="flex items-center justify-between mt-4">
        <span className="text-white/30 text-xs">{article.author}</span>
        <span className="text-fifa-gold text-sm font-semibold flex items-center gap-1 hover:gap-2 transition-all">
          Read More <span>→</span>
        </span>
      </div>
    </div>
  </div>
);

const NewsFeed = () => {
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Match Report', 'Preview', 'Stats', 'Feature', 'Injury'];

  const filtered = newsArticles.filter(a =>
    activeCategory === 'All' || a.category === activeCategory
  );

  return (
    <section id="news" className="py-24 bg-gradient-to-b from-fifa-navyDark to-fifa-navy relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-fifa-gold/50 to-transparent"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <p className="section-subtitle mb-3">Latest Updates</p>
          <h2 className="section-title">News & Stories</h2>
          <div className="w-24 h-1 bg-gold-gradient mx-auto mt-4 rounded-full"></div>
          <p className="text-white/50 mt-4 max-w-xl mx-auto">
            All the latest from FIFA World Cup 2026™ — match reports, previews, player features, and breaking news.
          </p>
        </div>

        {/* Category filter */}
        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all border ${
                activeCategory === cat
                  ? 'bg-gold-gradient text-fifa-navyDark border-transparent'
                  : 'border-fifa-gold/20 text-white/60 hover:text-white hover:border-fifa-gold/40'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* News grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((article, index) => (
            <NewsCard
              key={article.id}
              article={article}
              featured={index === 0 && activeCategory === 'All'}
              onClick={setSelectedArticle}
            />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-white/40">
            <span className="text-5xl block mb-4">📰</span>
            <p className="text-lg">No articles in this category yet</p>
          </div>
        )}
      </div>

      {/* Modal */}
      {selectedArticle && (
        <NewsModal article={selectedArticle} onClose={() => setSelectedArticle(null)} />
      )}
    </section>
  );
};

export default NewsFeed;
