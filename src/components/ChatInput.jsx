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
    <div className={`p-4 transition-colors duration-300 ${darkMode ? 'bg-slate-900/50 border-t border-white/5' : 'bg-slate-50 border-t border-slate-200'
      }`}>
      {error && (
        <div className="mb-3 p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-sm text-red-400 animate-slideIn">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex gap-3">
        <div className="flex-1 relative group">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about experience, skills, projects, or GitHub activity..."
            disabled={disabled}
            rows="1"
            className={`w-full px-5 py-3.5 pr-14 rounded-2xl border transition-all duration-300 outline-none resize-none
              ${darkMode
                ? 'bg-slate-800 border-slate-700 text-slate-100 placeholder:text-slate-500 focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20'
                : 'bg-white border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10'
              }
              disabled:opacity-50 disabled:cursor-not-allowed`}
            style={{
              minHeight: '54px',
              maxHeight: '150px',
            }}
            onInput={(e) => {
              e.target.style.height = 'auto';
              e.target.style.height = Math.min(e.target.scrollHeight, 150) + 'px';
            }}
          />

          <div className={`absolute right-4 bottom-4 text-[10px] font-medium tracking-wider uppercase opacity-0 group-focus-within:opacity-100 transition-opacity ${darkMode ? 'text-slate-500' : 'text-slate-400'
            }`}>
            {disabled ? 'Thinking...' : 'Enter ↵'}
          </div>
        </div>

        <button
          type="submit"
          disabled={disabled || !input.trim()}
          className={`px-6 py-3 rounded-2xl font-bold flex items-center gap-2 transition-all duration-300 shadow-lg shadow-emerald-500/20 active:scale-95
            ${darkMode
              ? 'bg-emerald-500 text-slate-900 hover:bg-emerald-400'
              : 'bg-emerald-600 text-white hover:bg-emerald-700'
            }
            disabled:opacity-40 disabled:scale-100 disabled:shadow-none disabled:cursor-not-allowed`}
          aria-label="Send message"
        >
          <Send className={`w-5 h-5 transition-transform ${input.trim() ? 'group-hover:translate-x-1' : ''}`} />
          <span className="hidden md:inline">Gönder</span>
        </button>
      </form>

      <div className="mt-4 flex flex-wrap justify-center gap-x-4 gap-y-1 opacity-60">
        <span className={`text-[11px] font-medium ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>
          💡 Backend Deneyimi
        </span>
        <span className={`text-[11px] font-medium ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>
          💡 GitHub Projeleri
        </span>
        <span className={`text-[11px] font-medium ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>
          💡 Özet Çıkart
        </span>
      </div>
    </div>
  );
}

export default ChatInput;