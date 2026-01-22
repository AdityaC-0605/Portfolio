# Aditya Choudhary - Portfolio Website

A modern, responsive portfolio website for an AI/ML Engineer with dynamic content management, secure admin dashboard, and stunning animations.

![Portfolio Preview](https://img.shields.io/badge/Status-Live-brightgreen) ![React](https://img.shields.io/badge/React-19-61DAFB?logo=react) ![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript) ![Tailwind](https://img.shields.io/badge/Tailwind-4.1-06B6D4?logo=tailwindcss)

## ✨ Features

### Portfolio Sections
- **Hero** - Animated landing with interactive background & typing effect
- **About** - Personal introduction with stats
- **Skills** - Categorized skills with animated progress bars
- **Projects** - Dynamic project grid with 3D tilt effects
- **Experience** - Timeline for work & education
- **Achievements** - Awards and certifications showcase
- **Contact** - EmailJS-powered contact form

### Admin Features
- **Secure Login** - Password-protected admin access (session-based)
- **Full CRUD** - Add, edit, delete for all sections
- **Live Preview** - Changes reflect immediately
- **Data Persistence** - localStorage keeps your edits
- **Reset Option** - Restore defaults anytime

## 🛠️ Tech Stack

| Category | Technology |
|----------|------------|
| **Framework** | React 19 + Vite 7 |
| **Language** | TypeScript 5.9 |
| **Styling** | Tailwind CSS v4.1 |
| **Animations** | Framer Motion |
| **Icons** | React Icons |
| **Email** | EmailJS |
| **Storage** | localStorage (data), sessionStorage (auth) |

## 🎨 Theme

```css
--color-primary: #020617;   /* Dark base */
--color-secondary: #0f172a; /* Card background */
--color-accent: #a78bfa;    /* Soft royal purple */
```

## 📁 Project Structure

```
MyPortfolio/
├── public/
│   ├── favicon.svg
│   └── images/
│       ├── profile.jpg
│       └── resume.pdf
├── src/
│   ├── components/
│   │   ├── admin/              # Admin dashboard & forms
│   │   │   ├── AdminDashboard.tsx
│   │   │   ├── ProjectForm.tsx
│   │   │   ├── HeroForm.tsx
│   │   │   ├── SkillsForm.tsx
│   │   │   ├── ExperienceForm.tsx
│   │   │   ├── AchievementForm.tsx
│   │   │   └── DeleteConfirmModal.tsx
│   │   ├── AdminLogin.tsx
│   │   ├── Navbar.tsx
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Skills.tsx
│   │   ├── Projects.tsx
│   │   ├── Experience.tsx
│   │   └── Contact.tsx
│   ├── context/
│   │   ├── AuthContext.tsx     # Session-based authentication
│   │   └── DataContext.tsx     # Data management & persistence
│   ├── utils/
│   │   └── constants.ts        # Default data & config
│   ├── types.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── tailwind.config.js
└── vite.config.ts
```

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- npm v9+

### Installation

```bash
# Clone repository
git clone https://github.com/AdityaC-0605/Portfolio.git
cd Portfolio

# Install dependencies
npm install

# Start dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

### Admin Access
1. Click the ⚙️ settings icon (bottom-right corner)
2. Enter the admin password
3. Manage all portfolio sections from the dashboard

> **Note**: Admin session ends when you close the browser tab.

## 📦 Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

## � Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm run build
# Deploy dist/ folder
```

## 📱 Responsive Design

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 👤 Author

**Aditya Choudhary**  
AI/ML Engineer & Full Stack Developer

- � [GitHub](https://github.com/AdityaC-0605)
- 💼 [LinkedIn](https://www.linkedin.com/in/aditya-choudhary-2a36542b5/)
- 📧 adityachdhr555@gmail.com

---

⭐ Star this repo if you found it helpful!
