import React from 'react';

const Hero = () => {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-hero-gradient">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-fifa-gold/5 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-fifa-red/5 rounded-full blur-3xl animate-pulse-slow" style={{animationDelay: '1.5s'}}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-fifa-navyLight/20 rounded-full blur-3xl"></div>
        
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-5" 
          style={{
            backgroundImage: 'linear-gradient(rgba(201,168,76,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.3) 1px, transparent 1px)',
            backgroundSize: '60px 60px'
          }}>
        </div>

        {/* Floating footballs */}
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute text-4xl opacity-10 animate-bounce-slow"
            style={{
              top: `${15 + i * 12}%`,
              left: `${5 + i * 16}%`,
              animationDelay: `${i * 0.5}s`,
              fontSize: `${1.5 + (i % 3) * 0.5}rem`
            }}
          >
            ⚽
          </div>
        ))}
      </div>

      <div className="relative z-10 text-center max-w-6xl mx-auto px-4 sm:px-6">
        {/* Host nations */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="h-px flex-1 max-w-24 bg-gradient-to-r from-transparent to-fifa-gold/50"></div>
          <div className="flex items-center gap-3 bg-fifa-gold/10 border border-fifa-gold/30 rounded-full px-6 py-2">
            <span className="text-xl">🇺🇸</span>
            <span className="text-white/60 text-sm font-semibold">×</span>
            <span className="text-xl">🇨🇦</span>
            <span className="text-white/60 text-sm font-semibold">×</span>
            <span className="text-xl">🇲🇽</span>
            <span className="text-fifa-gold text-xs font-bold tracking-widest uppercase ml-1">2026</span>
          </div>
          <div className="h-px flex-1 max-w-24 bg-gradient-to-l from-transparent to-fifa-gold/50"></div>
        </div>

        {/* Main title */}
        <div className="mb-4">
          <p className="section-subtitle text-sm md:text-base mb-4">The World's Greatest Tournament</p>
          <h1 className="font-bebas text-7xl sm:text-8xl md:text-[10rem] lg:text-[12rem] leading-none tracking-tight">
            <span className="block text-white">FIFA</span>
            <span className="block shimmer-text -mt-4">WORLD CUP</span>
            <span className="block text-white -mt-4">2026™</span>
          </h1>
        </div>

        {/* Tagline */}
        <p className="text-xl md:text-2xl text-white/70 font-inter font-light max-w-2xl mx-auto mb-12 leading-relaxed">
          48 teams. 3 nations. 1 dream. 
          <span className="text-fifa-gold font-semibold"> The greatest show on earth begins now.</span>
        </p>

        {/* Stats bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto mb-12">
          {[
            { value: '48', label: 'Teams', icon: '🏆' },
            { value: '104', label: 'Matches', icon: '⚽' },
            { value: '16', label: 'Venues', icon: '🏟️' },
            { value: '5.4B', label: 'Fans Watching', icon: '👀' },
          ].map((stat) => (
            <div key={stat.label} className="bg-white/5 border border-fifa-gold/20 rounded-2xl p-4 backdrop-blur-sm">
              <div className="text-2xl mb-1">{stat.icon}</div>
              <div className="font-bebas text-3xl text-fifa-gold">{stat.value}</div>
              <div className="text-white/50 text-xs font-semibold tracking-wider uppercase">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#schedule"
            className="group px-10 py-4 bg-gold-gradient text-fifa-navyDark font-bold text-base tracking-wider uppercase rounded-full shadow-2xl hover:shadow-fifa-gold/30 transition-all duration-300 hover:scale-105 flex items-center gap-2"
          >
            <span>View Full Schedule</span>
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </a>
          <a
            href="#top-players"
            className="px-10 py-4 bg-transparent border-2 border-fifa-gold/50 text-fifa-gold font-bold text-base tracking-wider uppercase rounded-full hover:bg-fifa-gold/10 transition-all duration-300"
          >
            Top Players
          </a>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-fifa-navyDark to-transparent"></div>
    </section>
  );
};

export default Hero;
