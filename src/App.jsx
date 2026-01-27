import { useState, useEffect, useRef } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom'; // BrowserRouter kaldırıldı
import { Sun, Moon, Linkedin, Github, Trophy, MessageSquare } from 'lucide-react';
import Header from './components/Header';
import ChatContainer from './components/ChatContainer';
import ChatInput from './components/ChatInput';
import DownloadCV from "./pages/DownloadCV";

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
      text: "Selam! Ben Doğan'ın CV Agent'ıyım. Bana kariyerimle ilgili her şeyi sorabilirsin.",
      timestamp: new Date(),
    }]);
  }, []);

  const handleSendMessage = async (query) => {
    if (!query.trim()) return;
    const userMessage = { id: Date.now(), type: 'user', text: query, timestamp: new Date() };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, profile_id: PROFILE_ID }),
      });
      const data = await response.json();
      setMessages(prev => [...prev, { id: Date.now() + 1, type: 'ai', text: data.response, timestamp: new Date() }]);
    } catch (err) {
      setError('Bağlantı hatası.');
    } finally {
      setIsLoading(false);
    }
  };
  console.log('Current URL:', window.location.pathname);

  return (
    <div className="container mx-auto px-6 py-10 max-w-7xl animate-fadeIn">
      {/* Navigasyon */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-emerald-500 rounded-2xl shadow-lg shadow-emerald-500/20">
            <MessageSquare className="text-white" size={28} />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Doğan <span className="text-emerald-500">CV Agent</span></h1>
            <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Interactive Career Intelligence</p>
          </div>
        </div>

        <div className={`flex items-center gap-3 p-2 rounded-2xl border shadow-xl transition-all duration-300 ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
          <div className="flex items-center gap-1">
            <a href="https://linkedin.com/in/dogan-keles/" target="_blank" rel="noreferrer" className={`p-2 rounded-xl transition-colors ${darkMode ? 'text-slate-300 hover:bg-emerald-500/10 hover:text-emerald-500' : 'text-slate-600 hover:bg-emerald-50 hover:text-emerald-600'}`}><Linkedin size={20} /></a>
            <a href="https://github.com/dogan-keles" target="_blank" rel="noreferrer" className={`p-2 rounded-xl transition-colors ${darkMode ? 'text-slate-300 hover:bg-emerald-500/10 hover:text-emerald-500' : 'text-slate-600 hover:bg-emerald-50 hover:text-emerald-600'}`}><Github size={20} /></a>
            <a href="https://hackerrank.com/dgnkls_47" target="_blank" rel="noreferrer" className={`p-2 rounded-xl transition-colors ${darkMode ? 'text-slate-300 hover:bg-emerald-500/10 hover:text-emerald-500' : 'text-slate-600 hover:bg-emerald-50 hover:text-emerald-600'}`}><Trophy size={20} /></a>
          </div>
          <div className={`w-px h-6 mx-1 ${darkMode ? 'bg-slate-700' : 'bg-slate-200'}`}></div>
          <button onClick={() => setDarkMode(!darkMode)} className={`p-2 rounded-xl transition-all ${darkMode ? 'bg-slate-700 text-yellow-400 hover:bg-slate-600' : 'bg-slate-100 text-yellow-600 hover:bg-slate-200'}`}>
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </div>

      {/* Chatbox */}
      <div className={`relative rounded-[2.5rem] transition-all duration-500 border overflow-hidden ${darkMode ? 'bg-slate-900/40 border-white/5 backdrop-blur-3xl shadow-2xl shadow-black/50' : 'bg-white border-slate-200 shadow-xl'}`}>
        <div className={`p-8 border-b ${darkMode ? 'border-white/5' : 'border-slate-100'}`}>
          <Header darkMode={darkMode} />
        </div>
        <div className="h-[650px] flex flex-col">
          <ChatContainer messages={messages} isLoading={isLoading} ref={chatContainerRef} darkMode={darkMode} />
          <div className={`p-6 ${darkMode ? 'bg-slate-900/50' : 'bg-slate-50/50'}`}>
            <ChatInput onSendMessage={handleSendMessage} disabled={isLoading} error={error} darkMode={darkMode} />
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
      try {
        return JSON.parse(saved);
      } catch {
        return saved === 'true';
      }
    } catch (e) {
      return true;
    }
  });

  useEffect(() => {
    localStorage.setItem('theme', JSON.stringify(darkMode));
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  return (
    <div className={`min-h-screen font-sans transition-colors duration-500 ${darkMode ? 'bg-slate-900 text-slate-100' : 'bg-slate-50 text-slate-900'}`}>
      <Routes>
        <Route path="/" element={<MainChat darkMode={darkMode} setDarkMode={setDarkMode} />} />
        <Route path="/download-cv" element={<DownloadCV darkMode={darkMode} />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;