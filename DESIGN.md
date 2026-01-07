# Visual Design Mockup

## 🎨 UI Design Specifications

This document describes the visual appearance of the Interactive CV interface.

---

## 📐 Layout Structure

```
┌────────────────────────────────────────────────────────────────────┐
│                                                                     │
│                    ┌─────────────────────┐                         │
│                    │   🔵 Avatar (DK)    │                         │
│                    └─────────────────────┘                         │
│                                                                     │
│                       Doğan Keleş                                   │
│                 ✨ Interactive AI-Powered CV                        │
│        Ask me anything about this candidate's experience...        │
│                                                                     │
│  ┌────────────────────────────────────────────────────────────┐   │
│  │                                                              │   │
│  │  👤 [User Message]                                           │   │
│  │     Tell me about backend experience                         │   │
│  │                                                      10:30 AM│   │
│  │                                                              │   │
│  │                                                              │   │
│  │  🤖 [AI Response]                                            │   │
│  │     The candidate has extensive backend experience           │   │
│  │     with C#/.NET, ASP.NET Core, and Python...                │   │
│  │  10:30 AM                                                    │   │
│  │                                                              │   │
│  │                                                              │   │
│  │                          👤                                  │   │
│  │                     [User Message]                           │   │
│  │                     What about GitHub?                       │   │
│  │                                          10:31 AM            │   │
│  │                                                              │   │
│  │                                                              │   │
│  │  🤖 [AI Response]                                            │   │
│  │     On GitHub, the candidate maintains several               │   │
│  │     active projects including...                             │   │
│  │  10:31 AM                                                    │   │
│  │                                                              │   │
│  ├──────────────────────────────────────────────────────────────┤   │
│  │                                                              │   │
│  │  [Ask about experience, skills, or projects...]    [Send 📤]│   │
│  │                                              Press Enter     │   │
│  │                                                              │   │
│  │  💡 Try: "Tell me about backend" • "What's on GitHub?"      │   │
│  │                                                              │   │
│  └──────────────────────────────────────────────────────────────┘   │
│                                                                     │
│              Powered by AI • Ask questions in English or Turkish   │
│                                                                     │
└────────────────────────────────────────────────────────────────────┘
```

---

## 🎨 Color Palette

### Primary Colors
```
Blue:    #3B82F6 (rgb(59, 130, 246))
Indigo:  #6366F1 (rgb(99, 102, 241))
```

### Neutral Colors
```
White:    #FFFFFF
Slate 50:  #F8FAFC (Background)
Slate 100: #F1F5F9 (Chat background)
Slate 200: #E2E8F0 (Borders)
Slate 400: #94A3B8 (Placeholders)
Slate 500: #64748B (Secondary text)
Slate 600: #475569 (Icons)
Slate 800: #1E293B (Primary text)
Slate 900: #0F172A (Headings)
```

### Status Colors
```
Red 50:   #FEF2F2 (Error background)
Red 200:  #FECACA (Error border)
Red 500:  #EF4444 (Error text)
Red 800:  #991B1B (Dark error text)
```

---

## 📏 Spacing & Dimensions

### Container
- Max width: 1024px (4xl)
- Padding: 16px (mobile) → 32px (desktop)
- Margin: 32px top/bottom

### Chat Container
- Height: 600px
- Padding: 24px
- Border radius: 16px (2xl)
- Border: 1px solid slate-200
- Background: white
- Shadow: lg (0 10px 15px -3px rgba(0,0,0,0.1))

### Message Bubbles
- Max width: 75%
- Padding: 12px 20px
- Border radius: 16px
- Corner cut: 2px (tr for user, tl for AI)
- Margin bottom: 16px

### Input Area
- Padding: 16px
- Min height: 48px
- Max height: 120px
- Border top: 1px solid slate-200
- Background: slate-50

### Avatar
- Size: 40px × 40px
- Border radius: full (circle)
- Gradient: blue-500 → indigo-600 (AI)
- Gradient: slate-100 → slate-200 (User)

---

## 🔤 Typography

### Header
```
Name: 
  - Font size: 36px (2.25rem)
  - Font weight: 700 (bold)
  - Color: slate-900
  - Line height: 1.2

Subtitle:
  - Font size: 20px (1.25rem)
  - Font weight: 500 (medium)
  - Color: slate-600
  - Line height: 1.4

Description:
  - Font size: 15px (0.9375rem)
  - Font weight: 400 (normal)
  - Color: slate-500
  - Line height: 1.6
  - Max width: 640px
```

### Chat Messages
```
Message text:
  - Font size: 15px (0.9375rem)
  - Font weight: 400 (normal)
  - Line height: 1.6
  - Color: white (user), slate-800 (AI)
  - White space: pre-wrap
  - Word break: break-words

Timestamp:
  - Font size: 12px (0.75rem)
  - Font weight: 400 (normal)
  - Color: blue-100 (user), slate-400 (AI)
  - Margin top: 8px
```

### Input Area
```
Placeholder:
  - Font size: 15px (0.9375rem)
  - Color: slate-400

Helper text:
  - Font size: 12px (0.75rem)
  - Color: slate-500
  - Text align: center

Examples:
  - Font size: 12px (0.75rem)
  - Color: slate-500
```

---

## 🎭 Visual Effects

### Shadows
```
Card shadow (chat container):
  box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1), 
              0 4px 6px -2px rgba(0,0,0,0.05)

Message shadow:
  box-shadow: 0 1px 2px 0 rgba(0,0,0,0.05)

Button shadow (hover):
  box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1), 
              0 4px 6px -2px rgba(0,0,0,0.05)
```

### Gradients
```
User message background:
  linear-gradient(135deg, #3B82F6 0%, #6366F1 100%)

AI avatar:
  linear-gradient(135deg, #F1F5F9 0%, #E2E8F0 100%)

User avatar:
  linear-gradient(135deg, #3B82F6 0%, #6366F1 100%)

Send button:
  linear-gradient(90deg, #3B82F6 0%, #6366F1 100%)

Background:
  linear-gradient(135deg, #F8FAFC 0%, #F1F5F9 100%)
```

### Animations
```
Message slide-in:
  - Duration: 300ms
  - Timing: ease-out
  - From: opacity 0, translateY(10px)
  - To: opacity 1, translateY(0)

Loading dots:
  - Animation: bounce
  - Duration: 1s
  - Iteration: infinite
  - Delays: 0ms, 150ms, 300ms

Button hover:
  - Duration: 200ms
  - Transform: scale(1.02)
  - Timing: ease-out
```

---

## 🖱️ Interactive States

### Button States
```
Default:
  - Background: blue-500 → indigo-600 gradient
  - Color: white
  - Shadow: md

Hover:
  - Background: blue-600 → indigo-700 gradient
  - Shadow: lg
  - Transform: translateY(-1px)

Active:
  - Transform: translateY(0)
  - Shadow: sm

Disabled:
  - Opacity: 0.5
  - Cursor: not-allowed
  - No hover effects
```

### Input States
```
Default:
  - Border: 1px solid slate-300
  - Background: white

Focus:
  - Border: transparent
  - Ring: 2px solid indigo-500
  - Outline: none

Disabled:
  - Background: slate-100
  - Cursor: not-allowed
```

---

## 📱 Responsive Breakpoints

### Mobile (< 640px)
```
- Single column layout
- Full width chat container
- Hide "Send" button text, show icon only
- Reduce padding to 12px
- Font sizes: 14px for body, 28px for header
```

### Tablet (640px - 1024px)
```
- Maintain layout
- Adjust container max-width to 90%
- Preserve all text
- Slightly reduce spacing
```

### Desktop (> 1024px)
```
- Full design as specified
- Max container width: 1024px
- Optimal spacing and typography
- All features visible
```

---

## 🎯 Design Principles

1. **Clarity**: High contrast, clear hierarchy
2. **Simplicity**: Minimal UI, focus on content
3. **Professionalism**: Serious, trustworthy aesthetic
4. **Accessibility**: WCAG AA compliant
5. **Responsiveness**: Works on all devices
6. **Performance**: Fast, smooth animations
7. **Consistency**: Unified design language

---

## 🎨 Component Gallery

### Header Component
```
╔═══════════════════════════════════════════╗
║                                           ║
║             ┌─────────┐                   ║
║             │  🔵 DK  │                   ║
║             └─────────┘                   ║
║                                           ║
║           Doğan Keleş                     ║
║     ✨ Interactive AI-Powered CV          ║
║                                           ║
║  Ask me anything about this candidate's   ║
║  experience, skills, projects, or         ║
║  GitHub activity.                         ║
║                                           ║
╚═══════════════════════════════════════════╝
```

### User Message Bubble
```
                    ┌─────────────────────────┐
                    │ Tell me about backend   │
                    │ experience              │
                    │                10:30 AM │
                    └─────────────────────────┘
                                           👤
```

### AI Message Bubble
```
👤  ┌─────────────────────────┐
    │ The candidate has       │
    │ extensive backend       │
    │ experience with...      │
    │ 10:30 AM                │
    └─────────────────────────┘
```

### Loading Indicator
```
🤖  ┌─────────────────────────┐
    │ ● ● ●  AI is thinking... │
    └─────────────────────────┘
```

### Input Area
```
╔═══════════════════════════════════════════╗
║                                           ║
║  ┌───────────────────────────────────┐   ║
║  │ Ask about experience, skills...  │📤 ║
║  │                   Press Enter     │   ║
║  └───────────────────────────────────┘   ║
║                                           ║
║  💡 Try: "Tell me about backend" •        ║
║         "What's on GitHub?"               ║
║                                           ║
╚═══════════════════════════════════════════╝
```

---

**This design creates a professional, trustworthy interface that feels like a premium AI product rather than a toy chatbot.**
