import { User, Bot, AlertCircle } from 'lucide-react';

function Message({ message }) {
  const isUser = message.type === 'user';
  const isError = message.type === 'error';
  
  return (
    <div
      className={`flex gap-3 animate-slideIn ${
        isUser ? 'flex-row-reverse' : 'flex-row'
      }`}
    >
      {/* Avatar */}
      <div
        className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
          isUser
            ? 'bg-gradient-to-br from-blue-500 to-indigo-600'
            : isError
            ? 'bg-red-100'
            : 'bg-gradient-to-br from-slate-100 to-slate-200'
        }`}
      >
        {isUser ? (
          <User className="w-5 h-5 text-white" />
        ) : isError ? (
          <AlertCircle className="w-5 h-5 text-red-500" />
        ) : (
          <Bot className="w-5 h-5 text-slate-600" />
        )}
      </div>

      {/* Message Bubble */}
      <div
        className={`max-w-[75%] rounded-2xl px-5 py-3 shadow-sm ${
          isUser
            ? 'bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-tr-sm'
            : isError
            ? 'bg-red-50 text-red-800 border border-red-200 rounded-tl-sm'
            : 'bg-slate-50 text-slate-800 border border-slate-200 rounded-tl-sm'
        }`}
      >
        <p className="text-[15px] leading-relaxed whitespace-pre-wrap break-words">
          {message.text}
        </p>
        
        {/* Timestamp */}
        <div
          className={`text-xs mt-2 ${
            isUser ? 'text-blue-100' : 'text-slate-400'
          }`}
        >
          {message.timestamp.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </div>
      </div>
    </div>
  );
}

export default Message;
