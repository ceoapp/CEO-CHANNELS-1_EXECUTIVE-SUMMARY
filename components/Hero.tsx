import React from 'react';

const Hero: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center pt-24 pb-8 px-4 text-center animate-fade-in-up w-[90%] md:w-[80%] xl:w-[70%] mx-auto">
      <div className="relative flex flex-col items-center">
        {/* Soft Aura effect behind title */}
        <div className="absolute -inset-10 bg-cyan-500/10 blur-3xl rounded-full opacity-60 pointer-events-none"></div>
        
        {/* Top Tagline */}
        <span className="relative text-xs md:text-sm font-bold text-slate-900 uppercase tracking-[0.2em] mb-4 -translate-y-8">
          AI-POWERED BUSINESS ARCHIVE
        </span>

        <h1 className="relative text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900 mb-3">
          CEO <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-600">EXECUTIVE SUMMARY</span>
        </h1>
        <p className="relative text-slate-500 text-sm md:text-base font-light tracking-[0.2em] uppercase mt-4">
          สรุปบทเรียนธุรกิจ ถอดรหัสความคิดผู้นำโลก
        </p>
      </div>
    </div>
  );
};

export default Hero;