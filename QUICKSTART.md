# Quick Start Guide

## 🚀 Get Started in 3 Steps

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

### 3. Open in Browser
```
http://localhost:3000
```

That's it! The app should now be running and connected to your backend at `http://localhost:8000`.

---

## 🔧 Configuration

### Change Backend URL

If your backend is running on a different port or domain, edit `src/App.jsx`:

```javascript
const API_BASE_URL = 'http://localhost:8000'; // Change this
```

### Change Candidate Name

Edit `src/components/Header.jsx`:

```javascript
<h1 className="text-4xl font-bold text-slate-900 mb-2">
  Your Name Here  // Change this
</h1>
```

### Change Profile ID

Edit `src/App.jsx`:

```javascript
const PROFILE_ID = 1; // Change this to match your backend profile
```

---

## 📦 Build for Production

### Create Production Build
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

### Deploy
The `dist/` folder contains your production-ready static files. Deploy to:
- Vercel
- Netlify
- GitHub Pages
- Any static hosting service

---

## 🎯 Features to Test

1. **Send a message**: Type "Tell me about backend experience" and press Enter
2. **Check loading state**: Notice the "AI is thinking..." animation
3. **View response**: See the formatted AI response
4. **Test error handling**: Stop the backend and send a message to see error state
5. **Mobile responsive**: Resize your browser window to test mobile layout

---

## 🐛 Common Issues

### Port 3000 already in use
```bash
# Kill the process using port 3000
lsof -ti:3000 | xargs kill -9

# Or change the port in vite.config.js
```

### Backend CORS errors
Make sure your FastAPI backend has CORS enabled:
```python
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

---

## 💡 Tips

- Press **Enter** to send messages
- Press **Shift + Enter** for new lines
- Use the **thumbs down** on example prompts to customize
- Check browser console for debugging info
- Use React DevTools for component inspection

---

Enjoy your Interactive CV! 🎉
