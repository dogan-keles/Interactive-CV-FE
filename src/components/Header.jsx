import { Sparkles } from 'lucide-react';

function Header({ darkMode }) {
  return (
    <header className="text-center animate-fadeIn">
      <div className="flex flex-col items-center gap-2">
        <div className="relative inline-block">
          <div className="w-14 h-14 rounded-full p-0.5 bg-gradient-to-tr from-emerald-500 to-emerald-300 shadow-lg shadow-emerald-500/20">
            <div className="w-full h-full rounded-full overflow-hidden border-2 border-white dark:border-slate-900 bg-slate-200">
              <img
                src="/linkedin_photo.jpeg"
                alt="Doğan Keleş"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.parentNode.innerHTML =
                    '<span class="flex items-center justify-center h-full text-sm font-bold text-slate-700">DK</span>';
                }}
              />
            </div>
          </div>
          <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-emerald-500 border-2 border-white dark:border-slate-900 rounded-full"></div>
        </div>

        <div>
          <h1 className={`text-2xl font-extrabold tracking-tight ${darkMode ? 'text-white' : 'text-slate-900'}`}>
            Doğan Keleş
          </h1>
          <div className="flex items-center justify-center gap-1.5">
            <Sparkles className={`w-3.5 h-3.5 ${darkMode ? 'text-emerald-400' : 'text-emerald-500'}`} />
            <span className={`text-xs font-semibold tracking-wide ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
              Ask questions about Doğan's background.
            </span>
          </div>
        </div>


      </div>
    </header>
  );
}

export default Header;