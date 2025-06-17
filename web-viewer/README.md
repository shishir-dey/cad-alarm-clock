# Web Viewer for CAD Alarm Clock

This directory contains a modern web application that provides an interactive 3D viewer for the alarm clock CAD model.

## 🛠️ Development Setup

### Prerequisites

- **Node.js** 18+ (recommended)
- **npm** (comes with Node.js)

### Installation

1. **Navigate to web-viewer directory**

   ```bash
   cd web-viewer
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:3000`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

### Deployment

The project automatically deploys to GitHub Pages using GitHub Actions when you push to the `main` branch.

## 📁 Directory Structure

```
web-viewer/
├── public/                 # Static assets
│   ├── index.html         # HTML template
│   └── models/            # 3D model files
│       ├── cad-alarm-clock.gltf
│       └── cad-alarm-clock.bin
├── src/                   # Source code
│   └── index.js          # Main JavaScript entry point
├── .github/workflows/     # GitHub Actions
│   └── deploy.yml        # Auto-deployment workflow
├── webpack.config.js      # Webpack configuration
├── package.json          # Project dependencies
└── README.md             # This file
```

## 📝 Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run deploy` - Build and deploy to GitHub Pages (manual)
- `npm run clean` - Clean build artifacts and cache files
- `npm run format` - Format code using Prettier

## 🎨 Tech Stack

- **Three.js** - 3D graphics library for WebGL rendering
- **Webpack** - Module bundler with ES6+ support
- **Babel** - JavaScript transpiler for browser compatibility
- **GitHub Pages** - Static site hosting
- **GitHub Actions** - CI/CD pipeline

## ✨ Features

- **Interactive 3D Model** - View, rotate, and zoom the alarm clock design
- **Web-based Viewer** - Built with Three.js and WebGL
- **Responsive Design** - Works on desktop, tablet, and mobile devices
- **Touch Controls** - Mobile-friendly touch interactions
- **Auto-rotation** - Pauses on user interaction, resumes after inactivity
- **Loading Progress** - Shows model loading progress
- **Modern UI** - Apple-inspired design with glassmorphism effects

## 🔧 Technical Notes

This web viewer uses ES6 modules and requires a bundler like Webpack to resolve Three.js dependencies. The project is configured to automatically bundle all Three.js modules and deploy the optimized static files to GitHub Pages.

The 3D model files (GLTF/BIN) are loaded from the `public/models/` directory and processed by Three.js GLTFLoader.
