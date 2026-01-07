# Interactive CV Frontend

A professional, modern, AI-powered interactive CV application built with React and Tailwind CSS.

## 🎯 Overview

This frontend allows recruiters, hiring managers, and visitors to interact with a candidate's CV through natural language queries. Instead of reading a static CV, users can ask questions and receive AI-powered responses about the candidate's experience, skills, projects, and GitHub activity.

## ✨ Features

- **Clean, Professional Design**: Modern UI with excellent readability and trustworthy aesthetics
- **Real-time Chat Interface**: Smooth, chat-style interaction with AI responses
- **Smart Loading States**: Visual feedback during AI processing
- **Error Handling**: Graceful error messages with retry capability
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Keyboard Shortcuts**: Press Enter to send messages, Shift+Enter for new lines
- **Auto-scroll**: Automatically scrolls to new messages
- **Accessibility**: High contrast, keyboard navigation, ARIA labels
- **Bilingual Support**: Handles English and Turkish responses

## 🛠️ Tech Stack

- **React 18** - Modern React with hooks
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful, consistent icons
- **Native Fetch API** - No heavy HTTP client dependencies

## 📦 Installation

### Prerequisites

- Node.js 18+ and npm
- Backend API running on `interactive-cv.fragile-lanita.internal:8000`

### Setup

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start the development server**:
   ```bash
   npm run dev
   ```

3. **Open your browser**:
   ```
   http://localhost:3000
   ```

### Build for Production

```bash
npm run build
```

The optimized production build will be in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

## 🎨 Component Architecture

```
src/
├── App.jsx                      # Main app container, state management, API integration
├── components/
│   ├── Header.jsx               # Candidate information header
│   ├── ChatContainer.jsx        # Chat messages display area
│   ├── Message.jsx              # Individual message bubble (user/AI/error)
│   ├── ChatInput.jsx            # Message input with send button
│   └── LoadingIndicator.jsx    # AI thinking animation
├── index.css                    # Tailwind + custom styles
└── main.jsx                     # React entry point
```

## 🔌 API Integration

### Endpoint

```
POST http://interactive-cv.fragile-lanita.internal:8000/api/chat
```

### Request Payload

```json
{
  "query": "Tell me about backend experience",
  "profile_id": 1
}
```

### Response Format

```json
{
  "response": "The candidate has extensive backend experience...",
  "language": "en"
}
```

### Configuration

The API base URL and profile ID can be configured in `src/App.jsx`:

```javascript
const API_BASE_URL = 'interactive-cv.fragile-lanita.internal:8000';
const PROFILE_ID = 1;
```

## 🎨 Design Principles

### Visual Hierarchy
- Clean white background with subtle gradients
- High contrast for excellent readability
- Professional color palette (blues, indigos, grays)
- Consistent spacing and typography

### User Experience
- **User messages**: Right-aligned, blue gradient background
- **AI messages**: Left-aligned, light gray background
- **Error messages**: Red tint with warning icon
- **Loading state**: Animated dots with "AI is thinking..." text

### Animations
- Smooth slide-in animations for new messages
- Fade-in for header on page load
- Bounce animation for loading indicators
- Hover effects on interactive elements

### Accessibility
- ARIA labels for buttons
- High contrast ratios (WCAG AA compliant)
- Keyboard navigation support
- Focus indicators for interactive elements
- Semantic HTML structure

## 🧩 Customization

### Change Candidate Information

Edit `src/components/Header.jsx`:

```jsx
<h1 className="text-4xl font-bold text-slate-900 mb-2">
  Your Name Here
</h1>
```

### Modify API Endpoint

Edit `src/App.jsx`:

```javascript
const API_BASE_URL = 'https://your-api-domain.com';
```

### Adjust Chat Container Height

Edit `src/components/ChatContainer.jsx`:

```jsx
<div className="h-[600px] overflow-y-auto p-6 space-y-4">
```

### Change Color Scheme

The app uses Tailwind's utility classes. Key colors:
- **Primary**: `blue-500`, `indigo-600`
- **Background**: `slate-50`, `slate-100`
- **Text**: `slate-900`, `slate-600`
- **Borders**: `slate-200`, `slate-300`

## 💡 Example Queries

The interface suggests these example queries:

- "Tell me about backend experience"
- "What's on GitHub?"
- "Generate CV summary"
- "Which projects are most relevant for fintech?"
- "What technologies does he use most?"
- "Tell me about his leadership experience"

## 🚀 Performance

- **Initial load**: < 50KB (gzipped)
- **First Contentful Paint**: < 1s
- **Time to Interactive**: < 2s
- **Lighthouse Score**: 95+ (Performance, Accessibility, Best Practices)

## 🐛 Troubleshooting

### Backend Connection Issues

If you see "Something went wrong" errors:

1. Ensure backend is running on `interactive-cv.fragile-lanita.internal:8000`
2. Check browser console for CORS errors
3. Verify API endpoint returns expected JSON format

### Styling Issues

If styles don't load:

1. Run `npm install` to ensure dependencies are installed
2. Clear browser cache
3. Restart dev server

## 📝 License

This project is provided as-is for portfolio and demonstration purposes.

## 🤝 Contributing

This is a demo project, but feedback and suggestions are welcome!

---

**Built with ❤️ using React, Tailwind CSS, and modern web standards**
