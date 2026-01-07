# Deployment Guide

This guide covers deploying your Interactive CV frontend to popular hosting platforms.

## 🌐 Vercel (Recommended)

Vercel offers the easiest deployment for React + Vite projects.

### Steps:

1. **Install Vercel CLI**:
   ```bash
   npm install -g vercel
   ```

2. **Build your project**:
   ```bash
   npm run build
   ```

3. **Deploy**:
   ```bash
   vercel
   ```

4. **Set environment variables** (if needed):
   - Go to Vercel Dashboard → Your Project → Settings → Environment Variables
   - Add: `VITE_API_BASE_URL=https://your-backend-api.com`

### vercel.json Configuration

Create a `vercel.json` file:

```json
{
  "rewrites": [
    { "source": "/api/:path*", "destination": "https://your-backend-api.com/api/:path*" }
  ]
}
```

---

## 🌊 Netlify

### Steps:

1. **Install Netlify CLI**:
   ```bash
   npm install -g netlify-cli
   ```

2. **Build your project**:
   ```bash
   npm run build
   ```

3. **Deploy**:
   ```bash
   netlify deploy --prod --dir=dist
   ```

### netlify.toml Configuration

Create a `netlify.toml` file:

```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/api/*"
  to = "https://your-backend-api.com/api/:splat"
  status = 200
  force = true

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

---

## 📄 GitHub Pages

### Steps:

1. **Install gh-pages**:
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Add to package.json**:
   ```json
   {
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d dist"
     },
     "homepage": "https://yourusername.github.io/interactive-cv"
   }
   ```

3. **Update vite.config.js**:
   ```javascript
   export default defineConfig({
     base: '/interactive-cv/',
     // ... rest of config
   })
   ```

4. **Deploy**:
   ```bash
   npm run deploy
   ```

---

## 🐳 Docker

### Dockerfile

Create a `Dockerfile`:

```dockerfile
# Build stage
FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### nginx.conf

Create an `nginx.conf` file:

```nginx
server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /api {
        proxy_pass http://backend:8000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### docker-compose.yml

Create a `docker-compose.yml`:

```yaml
version: '3.8'

services:
  frontend:
    build: .
    ports:
      - "3000:80"
    depends_on:
      - backend
    environment:
      - VITE_API_BASE_URL=http://backend:8000

  backend:
    image: your-backend-image:latest
    ports:
      - "8000:8000"
```

### Build and Run

```bash
docker-compose up --build
```

---

## ☁️ AWS S3 + CloudFront

### Steps:

1. **Build your project**:
   ```bash
   npm run build
   ```

2. **Create S3 bucket**:
   - Enable static website hosting
   - Upload `dist/` contents

3. **Configure CloudFront**:
   - Create distribution
   - Set origin to S3 bucket
   - Configure custom error pages (404 → /index.html)

4. **Deploy with AWS CLI**:
   ```bash
   aws s3 sync dist/ s3://your-bucket-name --delete
   aws cloudfront create-invalidation --distribution-id YOUR_DIST_ID --paths "/*"
   ```

---

## 🔐 Environment Variables

For production, update API base URL using environment variables.

### .env.production

Create a `.env.production` file:

```env
VITE_API_BASE_URL=https://your-production-api.com
```

### Update App.jsx

```javascript
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';
```

---

## 🔍 Pre-Deployment Checklist

- [ ] Run `npm run build` successfully
- [ ] Test production build with `npm run preview`
- [ ] Update API base URL for production
- [ ] Enable CORS on backend for production domain
- [ ] Test all features in production-like environment
- [ ] Check mobile responsiveness
- [ ] Verify error handling works
- [ ] Test with real backend API
- [ ] Check browser console for errors
- [ ] Verify SEO meta tags in index.html

---

## 📊 Monitoring

After deployment, monitor:

- **Performance**: Use Lighthouse or WebPageTest
- **Errors**: Set up error tracking (Sentry, LogRocket)
- **Analytics**: Add Google Analytics or similar
- **Uptime**: Use UptimeRobot or Pingdom

---

## 🚀 Performance Optimization

### Code Splitting

Already enabled by default with Vite.

### Image Optimization

Use WebP format and lazy loading:

```jsx
<img 
  src="image.webp" 
  loading="lazy" 
  alt="Description"
/>
```

### CDN for Assets

Consider using a CDN for:
- Fonts
- Images
- Static assets

---

Need help? Check the [README](./README.md) or open an issue!
