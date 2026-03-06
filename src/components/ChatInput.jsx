import { useState } from 'react';
import { Send } from 'lucide-react';

function ChatInput({ onSendMessage, disabled, error, darkMode }) {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() && !disabled) {
      onSendMessage(input);
      setInput('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div>
      {error && (
        <div className="mb-3 p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-sm text-red-400 animate-slideIn">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex gap-2 sm:gap-3">
        <div className="flex-1 min-w-0">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about experience, skills, projects..."
            disabled={disabled}
            rows="1"
            className={`w-full px-3 sm:px-5 py-3 sm:py-3.5 rounded-xl sm:rounded-2xl border outline-none resize-none text-sm sm:text-base
              ${darkMode
                ? 'bg-slate-900 border-slate-700 text-slate-100 placeholder:text-slate-600 focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20'
                : 'bg-white border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10'
              }
              disabled:opacity-50 disabled:cursor-not-allowed`}
            style={{ minHeight: '46px', maxHeight: '120px' }}
            onInput={(e) => {
              e.target.style.height = 'auto';
              e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px';
            }}
          />
        </div>

        <button
          type="submit"
          disabled={disabled || !input.trim()}
          className={`flex-shrink-0 px-3 sm:px-5 py-3 rounded-xl sm:rounded-2xl font-bold flex items-center gap-2 shadow-lg shadow-emerald-500/20 active:scale-95
            ${darkMode
              ? 'bg-emerald-500 text-black hover:bg-emerald-400'
              : 'bg-emerald-600 text-white hover:bg-emerald-700'
            }
            disabled:opacity-40 disabled:scale-100 disabled:shadow-none disabled:cursor-not-allowed`}
          aria-label="Send"
        >
          <Send className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className="hidden sm:inline text-sm">Send</span>
        </button>
      </form>

      <div className="mt-3 flex flex-wrap justify-center gap-x-3 gap-y-1 opacity-50">
        {['Backend Experience', 'GitHub Projects', 'Request CV'].map((hint) => (
          <span
            key={hint}
            className={`text-[10px] sm:text-[11px] font-medium ${darkMode ? 'text-slate-600' : 'text-slate-400'}`}
          >
            💡 {hint}
          </span>
        ))}
      </div>
    </div>
  );
}

export default ChatInput;