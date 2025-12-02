
import React, { useState } from 'react';
import Hero from './components/Hero';
import CategoryGrid from './components/CategoryGrid';
import CEOList from './components/CEOList';
import ProfileView from './components/ProfileView';
import { generateProfile } from './services/geminiService';
import { CEOProfile, AppState } from './types';
import { Loader2 } from 'lucide-react';
import { CEO_DATA } from './data';

interface GlobalNavProps {
  onHomeClick: () => void;
}

const GlobalNav: React.FC<GlobalNavProps> = ({ onHomeClick }) => {
  return (
    <nav className="bg-slate-900 text-white border-b border-slate-800">
      <div className="w-[90%] md:w-[80%] xl:w-[70%] mx-auto h-10 flex items-center justify-center space-x-8">
        <button 
          onClick={onHomeClick}
          className="text-[10px] md:text-xs font-bold tracking-[0.15em] hover:text-cyan-400 transition-colors uppercase"
        >
          Executive Summary
        </button>
        <a 
          href="https://www.ceochannels.com/home-page-ceo-channels/" 
          target="_blank"
          rel="noopener noreferrer"
          className="text-[10px] md:text-xs font-bold tracking-[0.15em] hover:text-cyan-400 transition-colors uppercase"
        >
          CEO Channels
        </a>
        <a 
          href="https://www.ceochannels.com/tos/" 
          target="_blank"
          rel="noopener noreferrer"
          className="text-[10px] md:text-xs font-bold tracking-[0.15em] hover:text-cyan-400 transition-colors uppercase"
        >
          Term of Service
        </a>
      </div>
    </nav>
  );
};

const GlobalFooter: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800 text-xs font-light leading-relaxed mt-auto">
      <div className="w-[90%] md:w-[80%] xl:w-[70%] mx-auto">
        <h3 className="text-white font-bold uppercase tracking-wider mb-6 text-sm">Disclaimer</h3>
        <p className="mb-6 text-slate-300">
          เนื้อหาทั้งหมดบนแพลตฟอร์ม CEO EXECUTIVE SUMMARY ถูกรวบรวม สังเคราะห์ และเรียบเรียงโดยระบบปัญญาประดิษฐ์ (AI) เพื่อวัตถุประสงค์ในการให้ข้อมูลและการศึกษาเชิงธุรกิจเท่านั้น
        </p>
        <ol className="space-y-4 list-decimal pl-4 marker:text-slate-600">
          <li>
            <strong className="text-slate-200 font-medium">ความถูกต้องของข้อมูล:</strong> ข้อมูลทางการเงิน มูลค่าทรัพย์สินสุทธิ (Net Worth) และไทม์ไลน์ธุรกิจ เป็นเพียงการประมาณการจากฐานข้อมูลสาธารณะ ซึ่งอาจมีความคลาดเคลื่อนหรือไม่เป็นปัจจุบัน ทางเราไม่รับรองความถูกต้องสมบูรณ์ 100% ของเนื้อหา
          </li>
          <li>
            <strong className="text-slate-200 font-medium">ไม่ใช่คำแนะนำทางการเงิน:</strong> เนื้อหานี้ไม่ถือเป็นคำแนะนำด้านการลงทุน การเงิน หรือกฎหมาย ผู้อ่านควรใช้วิจารณญาณและตรวจสอบข้อมูลจากแหล่งอ้างอิงต้นฉบับก่อนการตัดสินใจทางธุรกิจ
          </li>
          <li>
            <strong className="text-slate-200 font-medium">ข้อจำกัดของเทคโนโลยี AI:</strong> เนื้อหาถูกสร้างขึ้นโดยอัตโนมัติผ่านอัลกอริทึม โดยปราศจากการตรวจสอบโดยมนุษย์ จึงอาจมีข้อผิดพลาดหรือคลาดเคลื่อนเกิดขึ้นได้
          </li>
          <li>
            <strong className="text-slate-200 font-medium">การไม่มีเจตนาหมิ่นประมาท:</strong> แพลตฟอร์ม ไม่มีเจตนา สร้างความเสียหายหรือหมิ่นประมาทบุคคลใด ๆ เนื้อหาเป็นเพียงการประมวลผลจากข้อมูลสาธารณะโดย AI หากพบข้อผิดพลาดที่กระทบต่อชื่อเสียง โปรดแจ้งเพื่อดำเนินการแก้ไข
          </li>
          <li>
            <strong className="text-slate-200 font-medium">ข้อจำกัดความรับผิด:</strong> ทางผู้จัดทำขอสงวนสิทธิ์ไม่รับผิดชอบต่อความเสียหายใด ๆ ที่อาจเกิดขึ้นจากการนำข้อมูลเหล่านี้ไปใช้อ้างอิงในทุกกรณี
          </li>
        </ol>
        <div className="mt-10 pt-8 border-t border-slate-800 text-center text-[10px] text-slate-600 uppercase tracking-widest">
          © {new Date().getFullYear()} CEO EXECUTIVE SUMMARY. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

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
    <div className="min-h-screen bg-slate-50 text-slate-700 font-sans selection:bg-cyan-100 selection:text-cyan-900 flex flex-col">
      
      {/* Global Top Navigation */}
      <GlobalNav onHomeClick={handleBackToHome} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Home State with Drill Down */}
        {appState === AppState.HOME && (
          <div className="animate-fade-in flex-1">
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
          <div className="flex-1 flex flex-col items-center justify-center bg-slate-50 animate-pulse px-4 text-center min-h-[calc(100vh-250px)]">
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
          <div className="flex-1 flex flex-col items-center justify-center bg-slate-50 text-center px-4 min-h-[calc(100vh-250px)]">
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

      {/* Global Footer */}
      <GlobalFooter />

    </div>
  );
};

export default App;
