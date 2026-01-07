# Architecture Documentation

## 🏗️ System Architecture

### High-Level Overview

```
┌─────────────────────────────────────────────────────────────┐
│                        User Browser                          │
│                                                               │
│  ┌────────────────────────────────────────────────────────┐ │
│  │              React Frontend (Port 3000)                 │ │
│  │                                                          │ │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐             │ │
│  │  │  Header  │  │   Chat   │  │  Input   │             │ │
│  │  └──────────┘  └──────────┘  └──────────┘             │ │
│  │                                                          │ │
│  │  State: messages[], isLoading, error                   │ │
│  └────────────────────────────────────────────────────────┘ │
│                          ↕ HTTP                              │
│  ┌────────────────────────────────────────────────────────┐ │
│  │           FastAPI Backend (Port 8000)                   │ │
│  │                                                          │ │
│  │  POST /api/chat                                         │ │
│  │  ├─ Language Detection                                  │ │
│  │  ├─ Intent Classification                               │ │
│  │  ├─ Agent Router                                        │ │
│  │  │  ├─ Profile Agent                                    │ │
│  │  │  ├─ GitHub Agent                                     │ │
│  │  │  └─ CV Agent                                         │ │
│  │  └─ Response Generation (LLM)                           │ │
│  └────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

---

## 📦 Component Architecture

### Component Hierarchy

```
App (Root)
├── Header
│   └── Candidate Info + Avatar
│
├── ChatContainer (ref: auto-scroll)
│   ├── Message (user)
│   ├── Message (AI)
│   ├── Message (error)
│   └── LoadingIndicator
│
└── ChatInput
    ├── Textarea (auto-resize)
    ├── Send Button
    └── Error Display
```

### Data Flow

```
User Input → ChatInput → App State
                           ↓
                    API Request (POST /api/chat)
                           ↓
                    Backend Processing
                           ↓
                    API Response
                           ↓
                    App State Update
                           ↓
                    ChatContainer Re-render
                           ↓
                    Auto-scroll to Bottom
```

---

## 🔄 State Management

### App-Level State

```javascript
// Message structure
{
  id: number,           // Unique identifier (timestamp)
  type: string,         // 'user' | 'ai' | 'error'
  text: string,         // Message content
  timestamp: Date,      // Message timestamp
  language?: string     // Optional: 'en' | 'tr'
}

// State variables
const [messages, setMessages] = useState([]);
const [isLoading, setIsLoading] = useState(false);
const [error, setError] = useState(null);
```

### State Updates

1. **User sends message**:
   ```javascript
   setMessages(prev => [...prev, userMessage]);
   setIsLoading(true);
   ```

2. **API call completes**:
   ```javascript
   setMessages(prev => [...prev, aiMessage]);
   setIsLoading(false);
   ```

3. **Error occurs**:
   ```javascript
   setError('Error message');
   setMessages(prev => [...prev, errorMessage]);
   setIsLoading(false);
   ```

---

## 🎨 Design System

### Color Palette

```javascript
// Primary Colors
primary: {
  blue: '#3B82F6',
  indigo: '#6366F1',
}

// Neutral Colors
neutral: {
  white: '#FFFFFF',
  slate: {
    50: '#F8FAFC',
    100: '#F1F5F9',
    200: '#E2E8F0',
    300: '#CBD5E1',
    400: '#94A3B8',
    500: '#64748B',
    600: '#475569',
    800: '#1E293B',
    900: '#0F172A',
  }
}

// Status Colors
status: {
  error: '#EF4444',
  errorBg: '#FEF2F2',
}
```

### Typography

```css
Font Family: System fonts (-apple-system, BlinkMacSystemFont, 'Segoe UI', etc.)

Sizes:
- Header: 2.25rem (36px) - font-bold
- Subtitle: 1.25rem (20px) - font-medium
- Body: 0.9375rem (15px) - font-normal
- Caption: 0.75rem (12px) - font-normal
- Small: 0.875rem (14px) - font-normal
```

### Spacing Scale

```javascript
spacing: {
  xs: '0.25rem',   // 4px
  sm: '0.5rem',    // 8px
  md: '0.75rem',   // 12px
  lg: '1rem',      // 16px
  xl: '1.5rem',    // 24px
  '2xl': '2rem',   // 32px
  '3xl': '3rem',   // 48px
}
```

### Border Radius

```javascript
rounded: {
  sm: '0.125rem',   // 2px
  md: '0.375rem',   // 6px
  lg: '0.5rem',     // 8px
  xl: '0.75rem',    // 12px
  '2xl': '1rem',    // 16px
  full: '9999px',   // Circle
}
```

---

## 🔌 API Integration

### Request Flow

```javascript
// 1. User submits query
handleSendMessage(query)

// 2. Create user message
const userMessage = { id, type: 'user', text: query, timestamp }

// 3. Update state
setMessages([...messages, userMessage])
setIsLoading(true)

// 4. Make API call
fetch('interactive-cv.fragile-lanita.internal:8000/api/chat', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ query, profile_id: 1 })
})

// 5. Handle response
const data = await response.json()
const aiMessage = { id, type: 'ai', text: data.response, timestamp }

// 6. Update state
setMessages([...messages, userMessage, aiMessage])
setIsLoading(false)
```

### Error Handling Strategy

```javascript
try {
  // API call
} catch (err) {
  // Log error
  console.error('Error:', err)
  
  // Set error state
  setError('Something went wrong')
  
  // Add error message to chat
  setMessages([...messages, errorMessage])
  
  // Reset loading
  setIsLoading(false)
}
```

---

## 🎯 Performance Optimizations

### 1. Component Optimization

```javascript
// Use React.memo for static components
const Message = React.memo(({ message }) => {
  // Component logic
})

// Use useCallback for event handlers
const handleSendMessage = useCallback((query) => {
  // Handler logic
}, [dependencies])
```

### 2. Auto-scroll Optimization

```javascript
useEffect(() => {
  if (chatContainerRef.current) {
    chatContainerRef.current.scrollTop = 
      chatContainerRef.current.scrollHeight;
  }
}, [messages]); // Only re-run when messages change
```

### 3. Textarea Auto-resize

```javascript
onInput={(e) => {
  e.target.style.height = 'auto';
  e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px';
}}
```

### 4. Debouncing (if needed)

```javascript
const debouncedSubmit = useMemo(
  () => debounce(handleSubmit, 300),
  []
);
```

---

## 🔐 Security Considerations

### 1. Input Sanitization

- Messages are displayed as plain text (no HTML rendering)
- XSS protection via React's built-in escaping
- No `dangerouslySetInnerHTML` usage

### 2. API Security

```javascript
// Always use HTTPS in production
const API_BASE_URL = process.env.NODE_ENV === 'production'
  ? 'https://api.production.com'
  : 'interactive-cv.fragile-lanita.internal:8000';

// Validate responses
if (!response.ok) {
  throw new Error(`Server error: ${response.status}`);
}
```

### 3. Error Messages

- Don't expose internal errors to users
- Log detailed errors server-side
- Show generic error messages client-side

---

## 📱 Responsive Design

### Breakpoints

```javascript
sm: '640px',   // Mobile landscape
md: '768px',   // Tablet
lg: '1024px',  // Desktop
xl: '1280px',  // Large desktop
```

### Mobile Optimizations

1. **Touch-friendly buttons**: 48px minimum height
2. **Readable text**: 15px minimum font size
3. **Adequate spacing**: 12px minimum padding
4. **Scrollable chat**: Full height on mobile
5. **Hide non-essential UI**: Simplify on small screens

---

## ♿ Accessibility

### ARIA Labels

```jsx
<button aria-label="Send message">
  <Send />
</button>

<div role="log" aria-live="polite">
  {/* Chat messages */}
</div>
```

### Keyboard Navigation

- **Tab**: Navigate between inputs and buttons
- **Enter**: Send message
- **Shift + Enter**: New line in textarea
- **Escape**: Clear input (optional)

### Screen Reader Support

- Semantic HTML (`<header>`, `<main>`, `<footer>`)
- Proper heading hierarchy (`h1`, `h2`, `h3`)
- Alt text for images
- Focus indicators

---

## 🧪 Testing Strategy

### Unit Tests (Recommended)

```javascript
// Test message sending
test('sends message on button click', () => {
  // Test logic
});

// Test error handling
test('displays error message on API failure', () => {
  // Test logic
});

// Test loading state
test('shows loading indicator while processing', () => {
  // Test logic
});
```

### Integration Tests

```javascript
// Test full user flow
test('user can send message and receive response', async () => {
  // Test logic
});
```

### E2E Tests (Optional)

Use Cypress or Playwright for end-to-end testing.

---

## 📈 Scalability Considerations

### 1. Message Pagination

```javascript
// Load messages in chunks
const [messageOffset, setMessageOffset] = useState(0);
const MESSAGES_PER_PAGE = 20;

// Load more on scroll
const loadMoreMessages = () => {
  setMessageOffset(prev => prev + MESSAGES_PER_PAGE);
};
```

### 2. Message Persistence

```javascript
// Save to localStorage
useEffect(() => {
  localStorage.setItem('chatHistory', JSON.stringify(messages));
}, [messages]);

// Load from localStorage
useEffect(() => {
  const saved = localStorage.getItem('chatHistory');
  if (saved) setMessages(JSON.parse(saved));
}, []);
```

### 3. WebSocket Support (Future)

```javascript
// For real-time updates
const ws = new WebSocket('ws://interactive-cv.fragile-lanita.internal:8000');
ws.onmessage = (event) => {
  const message = JSON.parse(event.data);
  setMessages(prev => [...prev, message]);
};
```

---

## 🔮 Future Enhancements

1. **Message history**: Persist messages across sessions
2. **Export chat**: Download conversation as PDF/text
3. **Voice input**: Speech-to-text for queries
4. **Dark mode**: Theme toggle
5. **Multiple languages**: Full i18n support
6. **Rich formatting**: Support for markdown in responses
7. **File uploads**: Share documents with AI
8. **Suggested questions**: Smart follow-up prompts
9. **Analytics**: Track user interactions
10. **A/B testing**: Test different UI variations

---

## 📚 References

- [React Documentation](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Vite](https://vitejs.dev/)
- [Lucide Icons](https://lucide.dev/)
- [MDN Web Docs](https://developer.mozilla.org/)

---

**Last Updated**: January 2026
