import { useState, useEffect, useRef } from 'react';
import Header from './components/Header';
import ChatContainer from './components/ChatContainer';
import ChatInput from './components/ChatInput';

const API_BASE_URL = 'interactive-cv.fragile-lanita.internal:8000';
const PROFILE_ID = 1;

function App() {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const chatContainerRef = useRef(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  // Add welcome message on mount
  useEffect(() => {
    setMessages([
      {
        id: Date.now(),
        type: 'ai',
        text: "Hello! I'm an AI assistant that can answer questions about this candidate's experience, skills, and projects. Feel free to ask me anything!",
        timestamp: new Date(),
      },
    ]);
  }, []);

  const handleSendMessage = async (query) => {
    if (!query.trim()) return;

    // Clear any previous errors
    setError(null);

    // Add user message to chat
    const userMessage = {
      id: Date.now(),
      type: 'user',
      text: query,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);

    // Set loading state
    setIsLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: query,
          profile_id: PROFILE_ID,
        }),
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const data = await response.json();

      // Add AI response to chat
      const aiMessage = {
        id: Date.now() + 1,
        type: 'ai',
        text: data.response,
        language: data.language,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (err) {
      console.error('Error sending message:', err);
      setError('Something went wrong. Please try again.');

      // Add error message to chat
      const errorMessage = {
        id: Date.now() + 1,
        type: 'error',
        text: 'I apologize, but I encountered an error processing your request. Please try again.',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Header />

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-slate-200">
          <ChatContainer
            messages={messages}
            isLoading={isLoading}
            ref={chatContainerRef}
          />

          <ChatInput
            onSendMessage={handleSendMessage}
            disabled={isLoading}
            error={error}
          />
        </div>

        {/* Footer */}
        <div className="mt-6 text-center text-sm text-slate-500">
          <p>Powered by AI • Ask questions in English or Turkish</p>
        </div>
      </div>
    </div>
  );
}

export default App;
