import React, { useState } from 'react'
import { Newspaper, Clock, ArrowRight, TrendingUp, Tag } from 'lucide-react'

const categories = ['All', 'Match Report', 'Preview', 'Injury', 'Feature', 'Transfer']

const news = [
  {
    id: 1,
    title: 'Mbappé Scores Hat-Trick as France Dominate Brazil in Thriller',
    excerpt: 'Captain Kylian Mbappé produced an extraordinary performance as France put Brazil to the sword in a pulsating Group B clash at AT&T Stadium, Dallas.',
    category: 'Match Report',
    time: '2 hours ago',
    readTime: '4 min read',
    color: 'from-blue-900 to-blue-700',
    emoji: '⚽',
    featured: true,
    tag: 'Breaking',
  },
  {
    id: 2,
    title: 'Lamine Yamal: The Teenager Rewriting World Cup History',
    excerpt: 'At just 18 years old, Barcelona\'s sensation is already the talk of the tournament, with three goals and two assists in Spain\'s perfect start to the competition.',
    category: 'Feature',
    time: '4 hours ago',
    readTime: '6 min read',
    color: 'from-red-900 to-yellow-700',
    emoji: '⭐',
    featured: false,
  },
  {
    id: 3,
    title: 'Injury Blow for Argentina: Doubts Over Key Midfielder',
    excerpt: 'Argentina are sweating over the fitness of a key midfield player ahead of their pivotal Group B clash with England after he was forced off in training.',
    category: 'Injury',
    time: '6 hours ago',
    readTime: '3 min read',
    color: 'from-sky-900 to-sky-700',
    emoji: '🚑',
    featured: false,
  },
  {
    id: 4,
    title: 'Canada vs Belgium: Five Things We Learned From the Thriller',
    excerpt: 'The draw at BMO Field delivered drama, entertainment and plenty of talking points. We break down the key takeaways from a memorable Group D encounter.',
    category: 'Match Report',
    time: '8 hours ago',
    readTime: '5 min read',
    color: 'from-red-900 to-red-700',
    emoji: '🔍',
    featured: false,
  },
  {
    id: 5,
    title: 'Preview: Germany vs Spain — A Classic Rivalry Renewed',
    excerpt: 'Two of Europe\'s greatest football nations meet in what promises to be the match of the group stage. We preview the tactical battle in Boston.',
    category: 'Preview',
    time: '10 hours ago',
    readTime: '7 min read',
    color: 'from-gray-800 to-yellow-800',
    emoji: '🔮',
    featured: false,
  },
  {
    id: 6,
    title: 'Golden Boot Race: Who Will Be Tournament\'s Top Scorer?',
    excerpt: 'With the group stage in full swing, we assess the leading contenders for the coveted Golden Boot award and who has the best chance of lifting it.',
    category: 'Feature',
    time: '12 hours ago',
    readTime: '8 min read',
    color: 'from-yellow-900 to-orange-700',
    emoji: '🥾',
    featured: false,
  },
  {
    id: 7,
    title: 'Vinicius Jr. Credits Team Spirit After Brazil\'s Recovery Win',
    excerpt: 'Brazil\'s star winger praised the collective resilience of his teammates after they came from behind to secure a vital point in their opening group fixture.',
    category: 'Feature',
    time: '1 day ago',
    readTime: '4 min read',
    color: 'from-green-900 to-yellow-800',
    emoji: '💬',
    featured: false,
  },
  {
    id: 8,
    title: 'Host Venues Report: The Stadiums Lighting Up World Cup 2026',
    excerpt: 'From the iconic Rose Bowl to the stunning Estadio Azteca, we take you on a tour of the magnificent venues hosting this record-breaking World Cup.',
    category: 'Feature',
    time: '1 day ago',
    readTime: '10 min read',
    color: 'from-purple-900 to-indigo-700',
    emoji: '🏟️',
    featured: false,
  },
]

const categoryColors = {
  'Match Report': 'bg-blue-600/20 text-blue-400 border-blue-600/40',
  'Preview': 'bg-purple-600/20 text-purple-400 border-purple-600/40',
  'Injury': 'bg-red-600/20 text-red-400 border-red-600/40',
  'Feature': 'bg-fifa-gold/20 text-fifa-gold border-fifa-gold/40',
  'Transfer': 'bg-green-600/20 text-green-400 border-green-600/40',
  'Breaking': 'bg-red-600 text-white border-red-600',
}

export default function LatestNews() {
  const [activeCategory, setActiveCategory] = useState('All')

  const filtered = activeCategory === 'All' ? news : news.filter((n) => n.category === activeCategory)
  const featured = filtered.find((n) => n.featured) || filtered[0]
  const rest = filtered.filter((n) => n.id !== featured.id)

  return (
    <div className="py-20 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 text-fifa-gold text-xs font-bold tracking-widest uppercase bg-fifa-gold/10 border border-fifa-gold/20 px-4 py-2 rounded-full mb-4">
          <Newspaper size={12} />
          Latest News
        </div>
        <h2 className="text-4xl md:text-5xl font-black text-white mb-3">World Cup News</h2>
        <p className="text-white/50 text-sm">Breaking stories, match reports, and expert analysis</p>
      </div>

      {/* Category filter */}
      <div className="flex gap-2 mb-10 flex-wrap justify-center">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-full text-sm font-semibold border transition-all duration-200 ${
              activeCategory === cat
                ? 'bg-fifa-gold text-fifa-dark border-fifa-gold'
                : 'bg-transparent border-fifa-border text-white/60 hover:border-fifa-gold/40 hover:text-white'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Featured Article */}
      {featured && (
        <div className={`relative bg-gradient-to-br ${featured.color} rounded-3xl overflow-hidden mb-8 card-hover cursor-pointer group`}>
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

          {/* Pattern */}
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.4) 1px, transparent 0)',
            backgroundSize: '24px 24px'
          }} />

          <div className="relative z-10 p-8 md:p-12">
            <div className="text-7xl mb-6">{featured.emoji}</div>
            <div className="flex items-center gap-3 mb-4 flex-wrap">
              {featured.tag && (
                <span className={`text-xs font-bold border px-3 py-1 rounded-full ${categoryColors['Breaking']}`}>
                  🔴 {featured.tag}
                </span>
              )}
              <span className={`text-xs font-semibold border px-3 py-1 rounded-full ${categoryColors[featured.category]}`}>
                {featured.category}
              </span>
            </div>
            <h3 className="text-2xl md:text-4xl font-black text-white mb-3 max-w-3xl leading-tight">
              {featured.title}
            </h3>
            <p className="text-white/70 max-w-2xl text-sm leading-relaxed mb-6">{featured.excerpt}</p>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-xs text-white/50">
                <Clock size={12} /> {featured.time}
              </div>
              <div className="text-xs text-white/50">{featured.readTime}</div>
              <button className="flex items-center gap-1 text-fifa-gold text-sm font-semibold hover:text-fifa-gold-light transition-colors group-hover:gap-2">
                Read More <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* News Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {rest.map((article, i) => (
          <NewsCard key={article.id} article={article} index={i} />
        ))}
      </div>
    </div>
  )
}

function NewsCard({ article, index }) {
  return (
    <div
      className="relative bg-fifa-card border border-fifa-border rounded-2xl overflow-hidden card-hover cursor-pointer group"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {/* Thumbnail area */}
      <div className={`relative bg-gradient-to-br ${article.color} h-36 flex items-center justify-center overflow-hidden`}>
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.4) 1px, transparent 0)',
          backgroundSize: '20px 20px'
        }} />
        <span className="relative z-10 text-5xl group-hover:scale-110 transition-transform duration-300">
          {article.emoji}
        </span>
        <span className={`absolute top-3 right-3 text-xs font-semibold border px-2 py-0.5 rounded-full ${categoryColors[article.category]}`}>
          {article.category}
        </span>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-bold text-white text-sm leading-snug mb-2 group-hover:text-fifa-gold transition-colors line-clamp-2">
          {article.title}
        </h3>
        <p className="text-xs text-white/50 leading-relaxed mb-3 line-clamp-2">{article.excerpt}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-[10px] text-white/30">
            <Clock size={10} /> {article.time}
          </div>
          <button className="flex items-center gap-1 text-xs text-fifa-gold font-semibold hover:text-fifa-gold-light transition-colors">
            Read <ArrowRight size={11} />
          </button>
        </div>
      </div>
    </div>
  )
}
