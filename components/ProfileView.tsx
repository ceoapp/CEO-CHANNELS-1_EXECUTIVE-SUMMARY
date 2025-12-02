
import React from 'react';
import { CEOProfile } from '../types';
import { ArrowLeft, ExternalLink, FileQuestion } from 'lucide-react';

interface ProfileViewProps {
  data: CEOProfile;
  onBack: () => void;
}

const ProfileView: React.FC<ProfileViewProps> = ({ data, onBack }) => {
  // Fail-Safe Mechanism UI
  if (data.name === 'Insufficient Data') {
    return (
      <div className="min-h-screen bg-slate-50 animate-fade-in flex flex-col">
        <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
          <div className="w-[90%] md:w-[80%] xl:w-[70%] mx-auto h-16 flex items-center justify-between">
            <button 
              onClick={onBack}
              className="flex items-center text-slate-500 hover:text-slate-900 transition-colors"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              <span className="text-xs font-medium uppercase tracking-wider">Back</span>
            </button>
            <div className="font-bold text-slate-900 tracking-tight text-sm md:text-base">
              CEO <span className="text-cyan-600">EXECUTIVE SUMMARY</span>
            </div>
            <div className="w-10"></div>
          </div>
        </nav>
        
        <main className="flex-1 flex flex-col items-center justify-center p-8 text-center max-w-md mx-auto">
          <div className="bg-white p-4 rounded-full shadow-soft mb-6">
             <FileQuestion className="h-10 w-10 text-slate-300" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 mb-3 tracking-tight">Data Unavailable</h2>
          <p className="text-sm text-slate-500 leading-relaxed mb-8">
            Insufficient verifiable public data to generate a safe, accurate biography for this profile. We strictly adhere to factual integrity.
          </p>
          <button 
            onClick={onBack}
            className="px-6 py-2.5 bg-slate-900 text-white text-sm font-medium rounded-full hover:bg-cyan-600 transition-all shadow-soft hover:shadow-lg"
          >
            Return to Directory
          </button>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 animate-fade-in">
      {/* Navigation Bar */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="w-[90%] md:w-[80%] xl:w-[70%] mx-auto h-16 flex items-center justify-center">
          <div className="font-bold text-slate-900 tracking-tight text-sm md:text-base">
            CEO <span className="text-cyan-600">EXECUTIVE SUMMARY</span>
          </div>
        </div>
      </nav>

      {/* Main Content - Single Column */}
      <main className="w-[90%] md:w-[80%] xl:w-[70%] mx-auto py-12 md:py-16 max-w-3xl">
        
        {/* Header Profile */}
        <header className="mb-12 text-center flex flex-col items-center">
          {/* Back Button (Moved here) */}
          <button 
            onClick={onBack}
            className="mb-8 flex items-center text-slate-400 hover:text-cyan-600 transition-colors uppercase tracking-[0.2em] text-[10px] font-bold group"
          >
            <ArrowLeft className="h-3 w-3 mr-1.5 transition-transform group-hover:-translate-x-1" />
            BACK
          </button>

          {/* Name */}
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 leading-tight tracking-tight">
            {data.name}
          </h1>

          {/* Title/Company */}
          <p className="text-xl text-slate-500 font-light mb-6">
            {data.title}
          </p>

          {/* Industry Tag (Moved here) */}
          <div className="inline-block px-4 py-1.5 text-[10px] font-bold tracking-[0.2em] text-cyan-700 uppercase bg-cyan-50 border border-cyan-100 rounded-full">
            {data.industry}
          </div>
        </header>

        {/* Executive Summary Dashboard (Moved to Top) */}
        {data.dashboard && (
          <div 
            className="animate-fade-in-up"
            dangerouslySetInnerHTML={{ __html: data.dashboard }} 
          />
        )}

        {/* Narrative Summary */}
        <section className="mb-16">
          <div className="p-1 bg-gradient-to-r from-cyan-500/10 to-transparent rounded-l-lg">
            <p className="text-xl md:text-2xl font-light leading-relaxed text-slate-700 italic pl-6 border-l-4 border-cyan-500">
              "{data.summary}"
            </p>
          </div>
        </section>

        {/* Dynamic Sections */}
        <div className="space-y-16">
          {data.sections.map((section, index) => (
            <section key={index} className="group">
              <div className="flex items-center mb-6">
                 <span className="text-xs font-bold text-cyan-600 mr-4 opacity-70">0{index + 1}</span>
                 <h2 className="text-2xl font-bold text-slate-900 group-hover:text-cyan-700 transition-colors tracking-wide uppercase">
                   {section.title}
                 </h2>
              </div>
              <div 
                className="prose prose-lg max-w-none prose-p:text-slate-600 prose-headings:text-slate-900"
                dangerouslySetInnerHTML={{ __html: section.content }}
              />
            </section>
          ))}
        </div>

        {/* Lessons for the CEO */}
        {data.lessons && (
          <section className="mt-20 mb-16 border-t border-slate-200 pt-12 animate-fade-in-up">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-[0.2em] mb-8 border-l-4 border-cyan-500 pl-3">
              LESSONS FOR THE CEO
            </h3>
            <div 
              className="bg-white border border-slate-200 rounded-xl p-8 shadow-sm"
              dangerouslySetInnerHTML={{ __html: data.lessons }} 
            />
          </section>
        )}

        {/* References */}
        <footer className="mt-12 pt-10 border-t border-slate-200">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] mb-4">
            SOURCES
          </h3>
          <ul className="space-y-3">
            {data.references.map((ref, i) => (
              <li key={i} className="flex items-center">
                 <span className="text-[10px] text-slate-400 mr-2 font-mono">[REF-{i+1}]</span>
                 <a 
                   href={ref.url} 
                   target="_blank" 
                   rel="noopener noreferrer"
                   className="text-xs text-slate-600 hover:text-cyan-600 transition-colors border-b border-transparent hover:border-cyan-200 pb-0.5 truncate flex items-center group"
                 >
                   {ref.title}
                   <ExternalLink className="h-3 w-3 ml-1.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                 </a>
              </li>
            ))}
          </ul>
        </footer>
      </main>
    </div>
  );
};

export default ProfileView;
