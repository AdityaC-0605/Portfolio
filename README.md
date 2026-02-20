# Aditya Choudhary - Portfolio Website

A modern, responsive portfolio website for an AI/ML Engineer with clean static content and rich animations.

## ✨ Features

### Portfolio Sections
- **Hero** - Animated landing with interactive background & typing effect
- **About** - Personal introduction with stats
- **Skills** - Categorized skills with animated progress bars
- **Projects** - Dynamic project grid with 3D tilt effects
- **Experience** - Timeline for work & education
- **Achievements** - Awards and certifications showcase
- **Contact** - Netlify form-powered contact form

## 🛠️ Tech Stack

| Category | Technology |
|----------|------------|
| **Framework** | React 19 + Vite 7 |
| **Language** | TypeScript 5.9 |
| **Styling** | Tailwind CSS v4.1 |
| **Animations** | Framer Motion |
| **Icons** | React Icons |
| **Form Handling** | Netlify Forms |
| **Content Source** | `src/utils/constants.ts` |

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
│   │   ├── Navbar.tsx
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Skills.tsx
│   │   ├── Projects.tsx
│   │   ├── Experience.tsx
│   │   └── Contact.tsx
│   ├── utils/
│   │   └── constants.ts        # Portfolio data and config
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

### Updating Content
Edit `/src/utils/constants.ts` to update hero text, skills, projects, experience, achievements, and social links.

## 📦 Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

## 🚀 Deployment

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
