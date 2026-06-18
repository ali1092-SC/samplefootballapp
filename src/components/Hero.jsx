import React, { useEffect, useRef } from 'react'
import { Calendar, MapPin, Trophy, Users } from 'lucide-react'

const stats = [
  { icon: Trophy, value: '48', label: 'Teams' },
  { icon: Calendar, value: '104', label: 'Matches' },
  { icon: MapPin, value: '16', label: 'Host Cities' },
  { icon: Users, value: '5M+', label: 'Expected Fans' },
]

export default function Hero() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden hero-grid">
      {/* Background layers */}
      <div className="absolute inset-0 bg-gradient-hero" />
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-fifa-red/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-fifa-gold/8 rounded-full blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-fifa-blue/15 rounded-full blur-[150px]" />
      </div>

      {/* Stadium arc lines */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[140%] h-[60%] border-t-2 border-fifa-gold/5 rounded-t-full" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[120%] h-[50%] border-t border-fifa-gold/5 rounded-t-full" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[100%] h-[40%] border-t border-fifa-gold/5 rounded-t-full" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto pt-24 pb-16">
        {/* Host nations flags */}
        <div className="flex items-center justify-center gap-3 mb-8 section-fade">
          {['🇺🇸', '🇨🇦', '🇲🇽'].map((flag, i) => (
            <React.Fragment key={i}>
              <div className="flex flex-col items-center">
                <div className="text-3xl md:text-4xl drop-shadow-lg">{flag}</div>
              </div>
              {i < 2 && (
                <div className="w-px h-8 bg-gradient-to-b from-transparent via-fifa-gold/50 to-transparent" />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Main Title */}
        <div className="mb-4">
          <div className="inline-flex items-center gap-2 bg-fifa-red/20 border border-fifa-red/40 text-fifa-red text-xs font-bold tracking-widest uppercase px-4 py-2 rounded-full mb-6">
            <span className="w-2 h-2 bg-fifa-red rounded-full status-live" />
            Tournament In Progress — June 11 – July 19, 2026
          </div>
        </div>

        <h1 className="font-black text-6xl md:text-8xl lg:text-9xl tracking-tight mb-2 section-fade">
          <span className="gold-text">FIFA</span>
        </h1>
        <h2 className="font-black text-4xl md:text-6xl lg:text-7xl text-white tracking-wide mb-2 section-fade">
          WORLD CUP
        </h2>
        <div className="flex items-center justify-center gap-4 mb-8 section-fade">
          <div className="h-px w-16 md:w-32 bg-gradient-to-r from-transparent to-fifa-gold/60" />
          <span className="font-black text-5xl md:text-7xl lg:text-8xl gold-text">2026™</span>
          <div className="h-px w-16 md:w-32 bg-gradient-to-l from-transparent to-fifa-gold/60" />
        </div>

        {/* Tagline */}
        <p className="text-white/60 text-lg md:text-xl font-light tracking-widest uppercase mb-12 section-fade">
          The Greatest Show On Earth
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-16 section-fade">
          <button
            onClick={() => document.querySelector('#schedule')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-4 bg-gradient-to-r from-fifa-red to-red-800 text-white font-bold rounded-full hover:from-red-500 hover:to-red-700 transition-all shadow-2xl shadow-red-900/50 text-sm tracking-wide"
          >
            View Full Schedule
          </button>
          <button
            onClick={() => document.querySelector('#top-players')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-4 bg-transparent border-2 border-fifa-gold/50 text-fifa-gold font-bold rounded-full hover:bg-fifa-gold/10 transition-all text-sm tracking-wide"
          >
            Top Players
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto section-fade">
          {stats.map(({ icon: Icon, value, label }) => (
            <div
              key={label}
              className="bg-white/5 backdrop-blur-sm border border-fifa-gold/20 rounded-2xl p-4 card-hover"
            >
              <Icon size={20} className="text-fifa-gold mx-auto mb-2" />
              <div className="text-2xl font-black text-white">{value}</div>
              <div className="text-xs text-white/50 uppercase tracking-wider">{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-fifa-dark to-transparent" />
    </div>
  )
}
