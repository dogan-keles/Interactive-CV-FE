import { Bot } from 'lucide-react';

function LoadingIndicator() {
  return (
    <div className="flex gap-3 animate-slideIn">
      {/* Avatar */}
      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
        <Bot className="w-5 h-5 text-slate-600" />
      </div>

      {/* Loading Bubble */}
      <div className="max-w-[75%] rounded-2xl rounded-tl-sm px-5 py-4 bg-slate-50 border border-slate-200 shadow-sm">
        <div className="flex items-center gap-2">
          <div className="flex gap-1">
            <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
          </div>
          <span className="text-sm text-slate-500 ml-2">AI is thinking...</span>
        </div>
      </div>
    </div>
  );
}

export default LoadingIndicator;
