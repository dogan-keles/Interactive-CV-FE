import { useState } from 'react';
import { Send } from 'lucide-react';

function ChatInput({ onSendMessage, disabled, error }) {
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
    <div className="border-t border-slate-200 bg-slate-50 p-4">
      {error && (
        <div className="mb-3 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700 animate-slideIn">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="flex gap-3">
        <div className="flex-1 relative">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about experience, skills, projects, or GitHub activity..."
            disabled={disabled}
            rows="1"
            className="w-full px-4 py-3 pr-12 rounded-xl border border-slate-300 
                     focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent
                     disabled:bg-slate-100 disabled:cursor-not-allowed
                     resize-none transition-all duration-200
                     placeholder:text-slate-400"
            style={{
              minHeight: '48px',
              maxHeight: '120px',
            }}
            onInput={(e) => {
              e.target.style.height = 'auto';
              e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px';
            }}
          />
          
          <div className="absolute right-3 bottom-3 text-xs text-slate-400">
            {disabled ? 'Thinking...' : 'Press Enter'}
          </div>
        </div>

        <button
          type="submit"
          disabled={disabled || !input.trim()}
          className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 
                   text-white rounded-xl font-medium
                   hover:from-blue-600 hover:to-indigo-700
                   focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2
                   disabled:opacity-50 disabled:cursor-not-allowed
                   transition-all duration-200 shadow-md hover:shadow-lg
                   flex items-center gap-2 group"
          aria-label="Send message"
        >
          <Send className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
          <span className="hidden sm:inline">Send</span>
        </button>
      </form>

      <p className="mt-3 text-xs text-slate-500 text-center">
        💡 Try: "Tell me about backend experience" • "What's on GitHub?" • "Generate CV summary"
      </p>
    </div>
  );
}

export default ChatInput;
