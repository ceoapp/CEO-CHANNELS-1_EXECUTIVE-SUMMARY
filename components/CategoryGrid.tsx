
import React from 'react';
import { 
  Cpu, 
  LayoutGrid, 
  BookOpen, 
  Dna, 
  Smartphone, 
  Video, 
  Blocks, 
  ShoppingBag, 
  TrendingUp, 
  ArrowRight,
  Clapperboard,
  BadgeDollarSign,
  Zap,
  Car,
  ShieldCheck,
  Tv,
  Gamepad2,
  Building2,
  Sprout,
  Stethoscope,
  Wifi,
  Truck,
  Factory,
  Gem,
  Plane,
  GraduationCap,
  Lightbulb,
  Trophy,
  Star
} from 'lucide-react';
import { CEO_DATA } from '../data';

interface CategoryGridProps {
  onCategoryClick: (category: string) => void;
}

// Map CSV category names to Lucide icons
const IconMap: Record<string, React.ElementType> = {
  "AI & Deep Tech": Cpu,
  "App & SaaS": LayoutGrid,
  "Authors": BookOpen,
  "Biotech & Life Sciences": Dna,
  "Consumer Tech": Smartphone,
  "Content Creator": Video,
  "Crypto & Web3": Blocks,
  "E-Commerce & Retail": ShoppingBag,
  "Digital Marketing": TrendingUp,
  "Filmmakers": Clapperboard,
  "Finance & VC": BadgeDollarSign,
  "Energy & Cleantech": Zap,
  "EV & Mobility": Car,
  "Cybersecurity & Defense": ShieldCheck,
  "Media & Entertainment": Tv,
  "Gaming & Esports": Gamepad2,
  "Real Estate & PropTech": Building2,
  "FoodTech & Agriculture": Sprout,
  "Healthcare & Medical Devices": Stethoscope,
  "Telecom & Semiconductors": Wifi,
  "Logistics & Supply Chain": Truck,
  "Manufacturing & Robotics": Factory,
  "Luxury & Lifestyle": Gem,
  "Travel & Hospitality": Plane,
  "EdTech & Creator Economy": GraduationCap,
  "Information Product": Lightbulb,
  "Sports & Athletics": Trophy,
  "Stars & Artists": Star
};

const CategoryGrid: React.FC<CategoryGridProps> = ({ onCategoryClick }) => {
  // Sort categories alphabetically
  const categories = Object.keys(CEO_DATA).sort((a, b) => a.localeCompare(b));

  return (
    <div className="w-[90%] md:w-[80%] xl:w-[70%] mx-auto pb-20">
      <h2 className="text-center text-sm font-bold text-slate-400 uppercase tracking-[0.1em] mb-10">
        คลิกที่หมวดหมู่เพื่อค้นคว้าข้อมูล
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {categories.map((cat) => {
          const Icon = IconMap[cat] || LayoutGrid;
          // Get first 3 names for preview (Accessing .name property from object)
          const previewNames = CEO_DATA[cat].slice(0, 3).map(item => item.name).join(", ");
          const totalCount = CEO_DATA[cat].length;

          return (
            <button
              key={cat}
              onClick={() => onCategoryClick(cat)}
              className="group flex flex-col p-6 bg-white border border-slate-200 rounded-xl hover:border-cyan-200 shadow-sm hover:shadow-soft-xl hover:-translate-y-1 transition-all duration-300 text-left relative overflow-hidden"
            >
              
              <div className="flex items-center justify-between w-full mb-4 relative z-10">
                <div className="p-3 rounded-lg bg-slate-50 border border-slate-100 group-hover:bg-cyan-50 group-hover:border-cyan-100 transition-colors">
                  <Icon className="h-6 w-6 text-slate-600 group-hover:text-cyan-600 stroke-[1.5]" />
                </div>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0 duration-300">
                   <ArrowRight className="h-5 w-5 text-cyan-500" />
                </div>
              </div>
              
              <span className="text-lg font-bold text-slate-900 mb-2 truncate w-full relative z-10 group-hover:text-cyan-700 transition-colors">
                {cat}
              </span>
              
              <div className="text-xs text-slate-500 font-light leading-relaxed mb-4 line-clamp-2 min-h-[2.5em] relative z-10 group-hover:text-slate-600">
                {previewNames}...
              </div>

              <div className="mt-auto pt-4 border-t border-slate-100 w-full flex justify-between items-center relative z-10">
                 <span className="text-[10px] font-bold text-slate-400 group-hover:text-cyan-600 uppercase tracking-wider transition-colors">
                   {totalCount} รายการ
                 </span>
                 <span className="text-[10px] font-medium text-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity">
                   ดูข้อมูล
                 </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryGrid;
