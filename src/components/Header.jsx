import { Sparkles } from 'lucide-react';

function Header() {
  return (
    <header className="text-center mb-8 animate-fadeIn">
      <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 mb-4 shadow-lg">
        <span className="text-3xl font-bold text-white">DK</span>
      </div>
      
      <h1 className="text-4xl font-bold text-slate-900 mb-2">
        Doğan Keleş
      </h1>
      
      <div className="flex items-center justify-center gap-2 mb-3">
        <Sparkles className="w-5 h-5 text-indigo-500" />
        <h2 className="text-xl text-slate-600 font-medium">
          Interactive AI-Powered CV
        </h2>
      </div>
      
      <p className="text-slate-500 max-w-2xl mx-auto leading-relaxed">
        Ask me anything about this candidate's experience, skills, projects, or GitHub activity. 
        I'm here to provide detailed insights and answer your questions naturally.
      </p>
    </header>
  );
}

export default Header;
