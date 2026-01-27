import { User, Bot, AlertCircle, ExternalLink } from 'lucide-react';

function Message({ message }) {
  const isUser = message.type === 'user';
  const isError = message.type === 'error';

  /**
   * Metin içindeki URL'leri bulur ve tıklanabilir linklere dönüştürür.
   */
  const formatMessageWithLinks = (text) => {
    if (!text) return null;

    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const parts = text.split(urlRegex);

    return parts.map((part, index) => {
      if (urlRegex.test(part)) {
        return (
          <a
            key={index}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-1 font-semibold underline decoration-2 underline-offset-2 transition-all ${isUser
                ? 'text-white hover:text-emerald-100'
                : 'text-emerald-600 hover:text-emerald-700'
              }`}
          >
            <ExternalLink size={14} className="inline" />
            <span className="break-all">{part}</span>
          </a>
        );
      }
      return <span key={index}>{part}</span>;
    });
  };

  return (
    <div
      className={`flex gap-4 mb-6 animate-in fade-in slide-in-from-bottom-2 duration-300 ${isUser ? 'flex-row-reverse' : 'flex-row'
        }`}
    >
      {/* Avatar Bölümü */}
      <div
        className={`flex-shrink-0 w-10 h-10 rounded-2xl flex items-center justify-center shadow-sm ${isUser
            ? 'bg-emerald-500 text-white'
            : isError
              ? 'bg-red-100 text-red-500'
              : 'bg-slate-100 text-slate-600'
          }`}
      >
        {isUser ? <User size={20} /> : isError ? <AlertCircle size={20} /> : <Bot size={20} />}
      </div>

      {/* Mesaj Balonu */}
      <div
        className={`max-w-[80%] rounded-2xl px-5 py-3 shadow-md transition-all ${isUser
            ? 'bg-emerald-500 text-white rounded-tr-none'
            : isError
              ? 'bg-red-50 text-red-900 border border-red-100 rounded-tl-none'
              : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 border border-slate-100 dark:border-slate-700 rounded-tl-none'
          }`}
      >
        <div className="text-[15px] leading-relaxed whitespace-pre-wrap break-words">
          {formatMessageWithLinks(message.text)}
        </div>

        {/* Zaman Damgası */}
        <div
          className={`text-[10px] mt-2 font-medium opacity-70 ${isUser ? 'text-emerald-50' : 'text-slate-400'
            }`}
        >
          {message.timestamp?.toLocaleTimeString('tr-TR', {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </div>
      </div>
    </div>
  );
}

export default Message;