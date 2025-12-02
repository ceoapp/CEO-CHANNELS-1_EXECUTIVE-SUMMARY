import React, { useState } from 'react';
import Hero from './components/Hero';
import CategoryGrid from './components/CategoryGrid';
import CEOList from './components/CEOList';
import ProfileView from './components/ProfileView';
import { generateProfile } from './services/geminiService';
import { CEOProfile, AppState } from './types';
import { Loader2 } from 'lucide-react';
import { CEO_DATA } from './data';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.HOME);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [profileData, setProfileData] = useState<CEOProfile | null>(null);
  const [errorMsg, setErrorMsg] = useState<string>('');

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
  };

  const handleCEOSelect = async (name: string) => {
    setAppState(AppState.LOADING);
    setErrorMsg('');
    try {
      const data = await generateProfile(name);
      setProfileData(data);
      setAppState(AppState.CONTENT);
    } catch (error) {
      console.error(error);
      setErrorMsg("ไม่สามารถวิเคราะห์ข้อมูลได้ในขณะนี้ กรุณาลองใหม่");
      setAppState(AppState.ERROR);
    }
  };

  const handleBackToHome = () => {
    setSelectedCategory(null);
    setAppState(AppState.HOME);
    setProfileData(null);
  };

  const handleBackToCategory = () => {
    setAppState(AppState.HOME);
    setProfileData(null);
    // keeping selectedCategory set so it renders the list
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-700 font-sans selection:bg-cyan-100 selection:text-cyan-900">
      
      {/* Home State with Drill Down */}
      {appState === AppState.HOME && (
        <div className="animate-fade-in">
           <Hero />
           {!selectedCategory ? (
             <CategoryGrid onCategoryClick={handleCategorySelect} />
           ) : (
             <CEOList 
               category={selectedCategory} 
               items={CEO_DATA[selectedCategory] || []} 
               onSelectCEO={handleCEOSelect}
               onBack={() => setSelectedCategory(null)}
             />
           )}
        </div>
      )}

      {appState === AppState.LOADING && (
        <div className="h-screen flex flex-col items-center justify-center bg-slate-50 animate-pulse px-4 text-center">
           <div className="relative">
             <div className="absolute inset-0 bg-cyan-400 blur-xl opacity-20 rounded-full"></div>
             <Loader2 className="relative h-12 w-12 text-cyan-600 animate-spin mb-6" />
           </div>
           <h2 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight mb-3">
             AI กำลังเข้าถึงฐานข้อมูลเชิงลึก และสังเคราะห์โปรไฟล์...
           </h2>
           <p className="text-sm text-slate-600 font-normal leading-relaxed max-w-lg">
             หมายเหตุ: ข้อมูลสังเคราะห์ด้วย AI โปรดตรวจสอบความถูกต้องก่อนนำไปใช้อ้างอิง
           </p>
        </div>
      )}

      {appState === AppState.ERROR && (
        <div className="h-screen flex flex-col items-center justify-center bg-slate-50 text-center px-4">
           <h2 className="text-2xl font-bold text-red-600 mb-4">Connection Terminated</h2>
           <p className="text-slate-600 mb-8">{errorMsg}</p>
           <button 
             onClick={handleBackToHome}
             className="px-8 py-3 bg-white border border-slate-200 text-slate-900 rounded-full hover:border-cyan-500 hover:shadow-lg transition-all duration-300 font-medium"
           >
             Return to Base
           </button>
        </div>
      )}

      {appState === AppState.CONTENT && profileData && (
        <ProfileView data={profileData} onBack={handleBackToCategory} />
      )}

    </div>
  );
};

export default App;