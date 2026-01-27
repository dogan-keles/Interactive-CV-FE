import { User, Bot, AlertCircle, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

function Message({ message }) {
  const isUser = message.type === 'user';
  const isError = message.type === 'error';

  const formatMessageWithLinks = (text) => {
    if (!text) return null;
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const parts = text.split(urlRegex);

    return parts.map((part, index) => {
      if (urlRegex.test(part)) {
        // Eğer link kendi sitenden ve download-cv içeriyorsa
        if (part.includes('interactive-cv-fe.vercel.app') && part.includes('download-cv')) {
          return (
            <Link key={index} to="/download-cv" className={`inline-flex items-center gap-2 font-bold underline decoration-2 underline-offset-2 transition-all ${isUser ? 'text-white hover:text-emerald-100' : 'text-emerald-600 hover:text-emerald-700'}`}>
              <ExternalLink size={16} />
              <span>📄 Özgeçmişi İndir</span>
            </Link>
          );
        }

        return (
          <a key={index} href={part} target="_blank" rel="noopener noreferrer" className={`inline-flex items-center gap-1 font-semibold underline decoration-2 underline-offset-2 transition-all ${isUser ? 'text-white hover:text-emerald-100' : 'text-emerald-600 hover:text-emerald-700'}`}>
            <ExternalLink size={14} />
            <span className="break-all">{part}</span>
          </a>
        );
      }
      return <span key={index}>{part}</span>;
    });
  };

  return (
    <div className={`flex gap-3 animate-slideIn ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
      <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${isUser ? 'bg-gradient-to-br from-blue-500 to-indigo-600' : isError ? 'bg-red-100' : 'bg-gradient-to-br from-slate-100 to-slate-200'}`}>
        {isUser ? <User className="w-5 h-5 text-white" /> : isError ? <AlertCircle className="w-5 h-5 text-red-500" /> : <Bot className="w-5 h-5 text-slate-600" />}
      </div>
      <div className={`max-w-[75%] rounded-2xl px-5 py-3 shadow-sm ${isUser ? 'bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-tr-sm' : isError ? 'bg-red-50 text-red-800 border border-red-200 rounded-tl-sm' : 'bg-slate-50 text-slate-800 border border-slate-200 rounded-tl-sm'}`}>
        <div className="text-[15px] leading-relaxed whitespace-pre-wrap break-words">
          {formatMessageWithLinks(message.text)}
        </div>
        <div className={`text-xs mt-2 ${isUser ? 'text-blue-100' : 'text-slate-400'}`}>
          {message.timestamp.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
    </div>
  );
}

export default Message;