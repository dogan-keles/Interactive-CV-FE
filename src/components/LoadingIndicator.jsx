import { Bot } from 'lucide-react';

function LoadingIndicator({ darkMode }) {
  return (
    <div className="flex gap-3 animate-slideIn">
      <div
        className={`flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center ${darkMode ? 'bg-slate-600' : 'bg-slate-300'
          }`}
      >
        <Bot className="w-4 h-4 text-white" />
      </div>
      <div
        className={`max-w-[75%] rounded-2xl rounded-tl-sm px-5 py-4 shadow-sm ${darkMode
          ? 'bg-slate-700 border border-slate-600'
          : 'bg-slate-100 border border-slate-200'
          }`}
      >
        <div className="flex items-center gap-2">
          <div className="flex gap-1">
            {[0, 150, 300].map((delay) => (
              <div
                key={delay}
                className="w-2 h-2 rounded-full animate-bounce bg-slate-400"
                style={{ animationDelay: `${delay}ms` }}
              />
            ))}
          </div>
          <span className={`text-xs ml-2 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
            thinking...
          </span>
        </div>
      </div>
    </div>
  );
}

export default LoadingIndicator;