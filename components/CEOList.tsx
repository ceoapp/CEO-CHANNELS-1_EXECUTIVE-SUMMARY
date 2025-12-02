import React, { useMemo } from 'react';
import { ArrowLeft, User } from 'lucide-react';
import { CEOSummary } from '../types';

interface CEOListProps {
  category: string;
  items: CEOSummary[];
  onSelectCEO: (name: string) => void;
  onBack: () => void;
}

const CEOList: React.FC<CEOListProps> = ({ category, items, onSelectCEO, onBack }) => {
  // Sort items alphabetically by name
  const sortedItems = useMemo(() => {
    return [...items].sort((a, b) => a.name.localeCompare(b.name));
  }, [items]);

  return (
    <div className="w-[90%] md:w-[80%] xl:w-[70%] mx-auto pb-20 animate-fade-in">
      <div className="flex items-center mb-8">
        <button 
          onClick={onBack}
          className="mr-4 p-2 rounded-full hover:bg-slate-200 text-slate-500 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div>
           <span className="text-xs font-bold text-cyan-600 uppercase tracking-[0.2em] mb-1 block">Category</span>
           <h2 className="text-3xl font-bold text-slate-900 tracking-tight">{category}</h2>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sortedItems.map((item, index) => (
          <button
            key={index}
            onClick={() => onSelectCEO(item.name)}
            className="group flex items-start p-4 bg-white border border-slate-200 rounded-lg hover:border-cyan-300 hover:shadow-soft-xl hover:-translate-y-0.5 transition-all duration-200 text-left relative overflow-hidden h-full"
          >
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            
            <div className="h-10 w-10 min-w-[2.5rem] rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center mr-4 group-hover:bg-cyan-50 group-hover:border-cyan-100 transition-colors mt-1">
              <User className="h-5 w-5 text-slate-400 group-hover:text-cyan-600 transition-colors" />
            </div>
            
            <div className="flex flex-col">
              <span className="text-sm font-bold text-slate-900 group-hover:text-cyan-700 transition-colors mb-0.5">
                {item.name}
              </span>
              <span className="text-xs font-medium text-slate-500 group-hover:text-slate-600 uppercase tracking-wide leading-tight">
                {item.company}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CEOList;