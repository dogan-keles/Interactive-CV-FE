import { useState, useEffect, useRef } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Sun, Moon, Linkedin, Github, Trophy, MessageSquare } from 'lucide-react';
import Header from './components/Header';
import ChatContainer from './components/ChatContainer';
import ChatInput from './components/ChatInput';
import DownloadCV from './pages/DownloadCV';

const MainChat = ({ darkMode, setDarkMode }) => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const chatContainerRef = useRef(null);
  const API_BASE_URL = 'https://lengthy-sarina-cypralex-fb6a4e7e.koyeb.app';
  const PROFILE_ID = 1;

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    setMessages([{
      id: Date.now(),
      type: 'ai',
      text: "Hey there! I'm here to tell you all about Doğan. Let's chat!",
      timestamp: new Date(),
    }]);
  }, []);

  const handleSendMessage = async (query) => {
    if (!query.trim()) return;
    const userMessage = { id: Date.now(), type: 'user', text: query, timestamp: new Date() };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE_URL}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, profile_id: PROFILE_ID }),
      });
      const data = await response.json();
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        type: 'ai',
        text: data.response,
        timestamp: new Date(),
      }]);
    } catch (err) {
      setError('Bağlantı hatası.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-full flex flex-col overflow-hidden">
      {/* Navbar */}
      <div className="flex-shrink-0 max-w-5xl w-full mx-auto px-4 sm:px-6 py-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className={`p-2.5 bg-emerald-500 rounded-xl shadow-lg ${darkMode ? 'shadow-emerald-500/40' : 'shadow-emerald-500/20'}`}>
              <MessageSquare className="text-white" size={22} />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">
                <span className="transition-colors" style={{ transitionDuration: '3000ms' }}>
                  Talk{' '}
                  <span className={darkMode ? 'text-emerald-500' : 'text-emerald-600'}>
                    With Me!
                  </span>
                </span>
              </h1>
              <p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                Doğan's Portfolio Bot
              </p>
            </div>
          </div>

          <div className={`flex items-center gap-1.5 p-1.5 rounded-xl border transition-all duration-300 ${darkMode
            ? 'bg-slate-800 border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.08)]'
            : 'bg-white border-slate-200'
            }`}>
            <a href="https://linkedin.com/in/dogan-keles/" target="_blank" rel="noreferrer"
              className={`p-2 rounded-lg transition-colors ${darkMode ? 'text-slate-300 hover:bg-emerald-500/10 hover:text-emerald-500' : 'text-slate-600 hover:bg-emerald-50 hover:text-emerald-600'}`}>
              <Linkedin size={18} />
            </a>
            <a href="https://github.com/dogan-keles" target="_blank" rel="noreferrer"
              className={`p-2 rounded-lg transition-colors ${darkMode ? 'text-slate-300 hover:bg-emerald-500/10 hover:text-emerald-500' : 'text-slate-600 hover:bg-emerald-50 hover:text-emerald-600'}`}>
              <Github size={18} />
            </a>
            <a href="https://hackerrank.com/dgnkls_47" target="_blank" rel="noreferrer"
              className={`p-2 rounded-lg transition-colors ${darkMode ? 'text-slate-300 hover:bg-emerald-500/10 hover:text-emerald-500' : 'text-slate-600 hover:bg-emerald-50 hover:text-emerald-600'}`}>
              <Trophy size={18} />
            </a>
            <div className={`w-px h-5 ${darkMode ? 'bg-slate-700' : 'bg-slate-200'}`}></div>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-lg transition-all ${darkMode ? 'bg-slate-700 text-yellow-400 hover:bg-slate-600' : 'bg-slate-100 text-yellow-600 hover:bg-slate-200'}`}
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>
        </div>
      </div>

      {/* Chat alanı */}
      <div className="flex-1 min-h-0 max-w-5xl w-full mx-auto px-4 sm:px-6 pb-3">
        {/* Neon glow chatbox */}
        <div className={`h-full flex flex-col rounded-2xl sm:rounded-[2rem] overflow-hidden transition-all duration-500 ${darkMode
          ? 'bg-black/40 border border-emerald-500/30 shadow-[0_0_30px_rgba(16,185,129,0.15),0_0_60px_rgba(16,185,129,0.05)]'
          : 'bg-white border border-emerald-400/40 shadow-[0_0_25px_rgba(16,185,129,0.1),0_0_50px_rgba(16,185,129,0.04)]'
          }`}>

          {/* Header */}
          <div className={`flex-shrink-0 px-6 py-4 border-b ${darkMode ? 'border-emerald-500/10' : 'border-slate-100'}`}>
            <Header darkMode={darkMode} />
          </div>

          {/* Mesajlar */}
          <ChatContainer
            messages={messages}
            isLoading={isLoading}
            ref={chatContainerRef}
            darkMode={darkMode}
          />

          {/* Input */}
          <div className={`flex-shrink-0 p-3 sm:p-5 ${darkMode ? 'bg-black/50' : 'bg-slate-50/80'}`}>
            <ChatInput
              onSendMessage={handleSendMessage}
              disabled={isLoading}
              error={error}
              darkMode={darkMode}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    try {
      const saved = localStorage.getItem('theme');
      if (saved === null) return true;
      try { return JSON.parse(saved); } catch { return saved === 'true'; }
    } catch { return true; }
  });

  useEffect(() => {
    localStorage.setItem('theme', JSON.stringify(darkMode));
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  return (
    <div className={`h-full font-sans transition-colors duration-500 ${darkMode ? 'bg-black text-slate-100' : 'bg-slate-50 text-slate-900'}`}>
      <Routes>
        <Route path="/" element={<MainChat darkMode={darkMode} setDarkMode={setDarkMode} />} />
        <Route path="/download-cv" element={<DownloadCV darkMode={darkMode} />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;