import { forwardRef } from 'react';
import Message from './Message';
import LoadingIndicator from './LoadingIndicator';

const ChatContainer = forwardRef(({ messages, isLoading }, ref) => {
  return (
    <div
      ref={ref}
      className="h-[600px] overflow-y-auto p-6 space-y-4 scroll-smooth"
      style={{
        scrollbarWidth: 'thin',
        scrollbarColor: '#cbd5e1 #f1f5f9',
      }}
    >
      {messages.map((message) => (
        <Message key={message.id} message={message} />
      ))}
      
      {isLoading && <LoadingIndicator />}
      
      {messages.length === 0 && !isLoading && (
        <div className="flex items-center justify-center h-full">
          <p className="text-slate-400 text-lg">
            Start by asking a question...
          </p>
        </div>
      )}
    </div>
  );
});

ChatContainer.displayName = 'ChatContainer';

export default ChatContainer;
