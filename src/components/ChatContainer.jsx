import { forwardRef } from 'react';
import Message from './Message';
import LoadingIndicator from './LoadingIndicator';

const ChatContainer = forwardRef(({ messages, isLoading, darkMode }, ref) => {
  return (
    <div
      ref={ref}
      className="flex-1 min-h-0 overflow-y-auto p-4 sm:p-6 space-y-4 scroll-smooth"
      style={{
        scrollbarWidth: 'thin',
        scrollbarColor: darkMode ? '#334155 transparent' : '#cbd5e1 transparent',
      }}
    >
      {messages.map((message) => (
        <Message key={message.id} message={message} darkMode={darkMode} />
      ))}

      {isLoading && <LoadingIndicator darkMode={darkMode} />}

      {messages.length === 0 && !isLoading && (
        <div className="flex items-center justify-center h-full">
          <p className={`text-lg ${darkMode ? 'text-slate-600' : 'text-slate-400'}`}>
            Bir soru sorarak başlayın...
          </p>
        </div>
      )}
    </div>
  );
});

ChatContainer.displayName = 'ChatContainer';
export default ChatContainer;