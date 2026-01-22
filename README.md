# Aditya Choudhary - Portfolio Website

A modern, responsive portfolio website for an AI/ML Engineer with dynamic project management, admin capabilities, and stunning animations.

![Portfolio Preview](https://img.shields.io/badge/Status-Live-brightgreen) ![React](https://img.shields.io/badge/React-19-61DAFB?logo=react) ![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript) ![Tailwind](https://img.shields.io/badge/Tailwind-4.1-06B6D4?logo=tailwindcss)

## ✨ Features

- **Dynamic Project Management** - Add, edit, and delete projects from the website
- **Admin Dashboard** - Secure admin panel with password authentication
- **Responsive Design** - Beautiful on all devices
- **Smooth Animations** - Framer Motion powered transitions
- **3D Tilt Effects** - Interactive project cards
- **Dark Theme** - Modern dark UI with accent colors
- **Contact Form** - EmailJS integration for direct messaging
- **SEO Optimized** - Meta tags, Open Graph, and semantic HTML
- **localStorage Persistence** - Data persists across sessions

## 🛠️ Tech Stack

| Category | Technology |
|----------|------------|
| **Framework** | React 19 + Vite 7 |
| **Language** | TypeScript 5.9 |
| **Styling** | Tailwind CSS v4.1 |
| **Animations** | Framer Motion |
| **Icons** | React Icons (Font Awesome) |
| **Form Handling** | EmailJS |
| **Data Persistence** | localStorage |

## 📁 Project Structure

```
MyPortfolio/
├── public/
│   ├── favicon.svg          # Custom favicon
│   ├── images/
│   │   └── profile.jpg      # Your profile photo (add this)
│   └── resume.pdf           # Your resume (add this)
├── src/
│   ├── components/
│   │   ├── admin/           # Admin panel components
│   │   │   ├── AdminDashboard.tsx
│   │   │   ├── ProjectForm.tsx
│   │   │   └── DeleteConfirmModal.tsx
│   │   ├── AdminLogin.tsx   # Login modal
│   │   ├── Navbar.tsx       # Navigation with scroll progress
│   │   ├── Hero.tsx         # Landing section with typing effect
│   │   ├── About.tsx        # About me section
│   │   ├── Skills.tsx       # Skills with progress bars
│   │   ├── Projects.tsx     # Dynamic project grid
│   │   ├── Experience.tsx   # Timeline
│   │   └── Contact.tsx      # Contact form
│   ├── context/
│   │   ├── AuthContext.tsx  # Admin authentication
│   │   └── DataContext.tsx  # Project data management
│   ├── utils/
│   │   └── constants.ts     # Static content & seed data
│   ├── types.ts             # TypeScript interfaces
│   ├── App.tsx              # Main app with providers
│   ├── main.tsx             # Entry point
│   └── index.css            # Global styles & Tailwind
├── index.html               # HTML with SEO meta tags
├── package.json
├── tailwind.config.js
├── vite.config.ts
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js v18 or higher
- npm v9 or higher

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/AdityaC-0605/Portfolio.git
   cd MyPortfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) in your browser.

4. **Build for production**
   ```bash
   npm run build
   ```

### Features
- ✅ Add new projects with all details
- ✅ Edit existing projects inline
- ✅ Delete projects with confirmation
- ✅ Reset to default projects
- ✅ Persistent localStorage storage

## 📦 Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

## 🎨 Customization

### Colors
Edit theme colors in `src/index.css`:
```css
@theme {
  --color-primary: #0f172a;   /* Background */
  --color-secondary: #1e293b; /* Cards */
  --color-accent: #38bdf8;    /* Highlights */
}
```

### Fonts
The portfolio uses [Inter](https://fonts.google.com/specimen/Inter) from Google Fonts, loaded in `index.html`.

## 📱 Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px  
- **Desktop**: > 1024px

## 🌐 Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm run build
# Upload dist/ folder to Netlify
```

### GitHub Pages
```bash
npm run build
# Configure GitHub Pages to serve from dist/
```

## 👤 Author

**Aditya Choudhary**
- GitHub: [@AdityaC-0605](https://github.com/AdityaC-0605)
- LinkedIn: [Aditya Choudhary](https://www.linkedin.com/in/aditya-choudhary-2a36542b5/)
- Email: adityachdhr555@gmail.com

---

⭐ Star this repository if you found it helpful!
