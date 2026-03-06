import { User, Bot, AlertCircle, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

function Message({ message, darkMode }) {
  const isUser = message.type === 'user';
  const isError = message.type === 'error';

  const formatMessageWithLinks = (text) => {
    if (!text) return null;
    // Global flag yok — lastIndex sorunu çözüldü
    const urlRegex = /(https?:\/\/[^\s]+)/;
    const parts = text.split(/(https?:\/\/[^\s]+)/);

    return parts.map((part, index) => {
      if (urlRegex.test(part)) {
        if (part.includes('download-cv')) {
          return (
            <Link
              key={index}
              to="/download-cv"
              className="inline-flex items-center gap-1.5 font-bold underline decoration-2 underline-offset-2 text-emerald-500 hover:text-emerald-400"
            >
              <ExternalLink size={14} />
              <span>📄 Özgeçmişi İndir</span>
            </Link>
          );
        }
        return (
          <a
            key={index}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-semibold underline decoration-2 underline-offset-2 text-emerald-500 hover:text-emerald-400"
          >
            <ExternalLink size={14} />
            <span className="break-all">{part}</span>
          </a>
        );
      }
      return <span key={index}>{part}</span>;
    });
  };

  // Dark: user → hardal, ai → açık gri
  // Light: user → hardal, ai → koyu gri
  const getBubbleClasses = () => {
    if (isError) return 'bg-red-50 text-red-800 border border-red-200 rounded-tl-sm';
    if (isUser) {
      return darkMode
        ? 'bg-amber-600 text-white rounded-tr-sm'
        : 'bg-amber-500 text-white rounded-tr-sm';
    }
    return darkMode
      ? 'bg-slate-700 text-slate-100 rounded-tl-sm'
      : 'bg-slate-700 text-slate-100 rounded-tl-sm';
  };

  return (
    <div className={`flex gap-3 animate-slideIn ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
      <div
        className={`flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center ${isUser
            ? 'bg-amber-600'
            : isError
              ? 'bg-red-100'
              : darkMode
                ? 'bg-slate-600'
                : 'bg-slate-300'
          }`}
      >
        {isUser ? (
          <User className="w-4 h-4 text-white" />
        ) : isError ? (
          <AlertCircle className="w-4 h-4 text-red-500" />
        ) : (
          <Bot className="w-4 h-4 text-white" />
        )}
      </div>

      <div className={`max-w-[85%] sm:max-w-[75%] rounded-2xl px-4 py-3 shadow-sm ${getBubbleClasses()}`}>
        <div className="text-sm sm:text-[15px] leading-relaxed whitespace-pre-wrap break-words">
          {formatMessageWithLinks(message.text)}
        </div>
        <div className={`text-[10px] mt-1.5 ${isUser ? 'text-amber-200' : 'text-slate-400'}`}>
          {message.timestamp.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
    </div>
  );
}

export default Message;