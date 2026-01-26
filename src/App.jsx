import { useState, useEffect, useRef } from 'react';
import { Sun, Moon, Linkedin, Github, Trophy, MessageSquare } from 'lucide-react';
import Header from './components/Header';
import ChatContainer from './components/ChatContainer';
import ChatInput from './components/ChatInput';

const API_BASE_URL = 'https://lengthy-sarina-cypralex-fb6a4e7e.koyeb.app';
const PROFILE_ID = 1;

function App() {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [darkMode, setDarkMode] = useState(true);
  const chatContainerRef = useRef(null);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    setMessages([{
      id: Date.now(),
      type: 'ai',
      text: "Selam! Ben Doğan'ın projelerini ve yeteneklerini analiz eden yapay zeka asistanıyım. Size nasıl yardımcı olabilirim?",
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

  return (
    <div className={`min-h-screen font-sans selection:bg-emerald-500/30 transition-all duration-700 ${darkMode ? 'bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-800 via-slate-900 to-black text-slate-100' : 'bg-slate-50 text-slate-900'
      }`}>

      <div className="container mx-auto px-6 py-10 max-w-7xl">

        {/* Modern Navigasyon Barı */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-emerald-500 rounded-2xl shadow-lg shadow-emerald-500/20">
              <MessageSquare className="text-white" size={28} />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">AI Portfolio <span className="text-emerald-500">Assistant</span></h1>
              <p className="text-sm text-slate-500 dark:text-slate-400">Ask anything about my career</p>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-white dark:bg-slate-800 p-2 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xl">
            <a href="#" className="p-2 hover:bg-emerald-50 dark:hover:bg-emerald-500/10 rounded-xl transition-colors text-slate-600 dark:text-slate-300 hover:text-emerald-500"><Linkedin size={20} /></a>
            <a href="#" className="p-2 hover:bg-emerald-50 dark:hover:bg-emerald-500/10 rounded-xl transition-colors text-slate-600 dark:text-slate-300 hover:text-emerald-500"><Github size={20} /></a>
            <a href="#" className="p-2 hover:bg-emerald-50 dark:hover:bg-emerald-500/10 rounded-xl transition-colors text-slate-600 dark:text-slate-300 hover:text-emerald-500"><Trophy size={20} /></a>
            <div className="w-px h-6 bg-slate-200 dark:bg-slate-700 mx-1"></div>
            <button onClick={() => setDarkMode(!darkMode)} className="p-2 bg-slate-100 dark:bg-slate-700 rounded-xl text-yellow-500">
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </div>

        {/* Ana Chatbox Konteyner */}
        <div className={`group relative rounded-[2.5rem] transition-all duration-500 border ${darkMode
            ? 'bg-slate-900/40 border-white/5 backdrop-blur-3xl shadow-[0_0_50px_-12px_rgba(16,185,129,0.15)]'
            : 'bg-white border-slate-200 shadow-2xl shadow-slate-200'
          }`}>

          {/* Header Component - Chatbox İçine Yerleştirildi */}
          <div className="p-8 border-b border-white/5">
            <Header darkMode={darkMode} />
          </div>

          <div className="h-[600px] flex flex-col">
            <ChatContainer
              messages={messages}
              isLoading={isLoading}
              ref={chatContainerRef}
              darkMode={darkMode}
            />

            <div className="p-6">
              <ChatInput
                onSendMessage={handleSendMessage}
                disabled={isLoading}
                error={error}
                darkMode={darkMode}
              />
            </div>
          </div>
        </div>

        {/* Yeni Footer */}
        <div className="mt-10 flex justify-between items-center px-4">
          <div className="flex gap-4 text-xs font-medium text-slate-500 uppercase tracking-widest">
            <span>Istanbul, TR</span>
            <span>•</span>
            <span className="text-emerald-500">Available for hire</span>
          </div>
          <p className="text-sm text-slate-500">© 2024 Keleş AI Lab</p>
        </div>
      </div>
    </div>
  );
}

export default App;