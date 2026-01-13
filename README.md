# Aditya Choudhary - Portfolio Website

A modern, responsive portfolio website built for an AI/ML Engineer to showcase projects, skills, and experience.

## Tech Stack
- **Framework**: React 19 + Vite
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4.1
- **Animations**: Framer Motion
- **Icons**: React Icons (Fa)
- **Form Handling**: EmailJS

## Prerequisites
- Node.js (v18 or higher)
- npm (v9 or higher)

## Getting Started

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Run Development Server**
   ```bash
   npm run dev
   ```
   The application will be available at [http://localhost:5173](http://localhost:5173).

3. **Build for Production**
   ```bash
   npm run build
   ```
   The build artifacts will be stored in the `dist/` directory.

## Project Structure
- `src/components/`: Core UI components (Hero, About, Projects, etc.)
- `src/utils/constants.ts`: Static data for projects, skills, and content.
- `src/App.tsx`: Main application layout.

## Customization
- Update your personal information in `src/utils/constants.ts`.
- Place your resume at `public/resume.pdf` and profile image at `public/images/profile.jpg`.
