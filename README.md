# 💍 Alisha & Anirudh's Wedding Invitation

A beautiful, interactive digital wedding invitation website built with modern web technologies. This project showcases a seamless user experience with animations, interactive elements, and responsive design.

**Project by:** [Tekkzy Intelligent Solutions Company](https://tekkzy.com)

## ✨ Features

- **Animated Intro**: Envelope opening animation with typing effect
- **Interactive Landing**: Scroll-triggered invitation reveal with confetti celebration
- **Hero Section**: Couple names with floating particles and decorative animations
- **Countdown Timer**: Dynamic wedding day countdown
- **Story Timeline**: Photo gallery showcasing the couple's journey
- **Events Listing**: Wedding event schedule with dates and times
- **Venue Information**: Map link and venue details with Google Maps integration
- **Dress Code Guide**: Color palette and attire suggestions
- **Gift Registry**: Interactive gift section
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Sound Effects**: Typing sound effects during intro animation
- **Smooth Scroll Animations**: Scroll-triggered reveal effects throughout

## 🛠 Tech Stack

- **Frontend Framework**: React 19.2.7
- **Build Tool**: Vite 8.1.1
- **Styling**: Tailwind CSS 4.3.2 with @tailwindcss/vite
- **Animations**: Framer Motion 12.42.2
- **Icons**: Lucide React 1.23.0
- **Effects**: Canvas Confetti 1.9.4
- **Code Quality**: ESLint 10.6.0 with React plugin

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn

## 🚀 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/samaladyasa/Invitation-Card.git
   cd Invitation-Card
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```
   The site will be available at `http://localhost:5173`

4. **Build for production**
   ```bash
   npm run build
   ```
   The optimized build will be in the `dist/` folder.

5. **Preview production build**
   ```bash
   npm run preview
   ```

## 📁 Project Structure

```
src/
├── components/
│   ├── Background/          # Background animations (Hero, Falling Petals, etc.)
│   ├── Countdown/           # Wedding countdown timer
│   ├── DressCode/          # Dress code information section
│   ├── Events/             # Wedding events listing
│   ├── Footer/             # Footer with closing message
│   ├── Gifts/              # Gift registry section
│   ├── Hero/               # Hero section with couple names
│   ├── Intro/              # Opening envelope animation
│   ├── Landing/            # Invitation reveal section
│   ├── Story/              # Photo timeline
│   ├── Venue/              # Venue information and map
│   └── ScrollReveal.jsx    # Reusable scroll reveal animation
├── data/
│   └── weddingData.js      # Centralized wedding information
├── hooks/
│   ├── useScrollTrigger.js # Custom hook for scroll/swipe triggers
│   └── useIsMobile.js      # Mobile detection hook
├── utils/
│   └── sound.js            # Audio utilities
├── App.jsx                 # Main app component
├── index.css               # Global styles
└── main.jsx                # Entry point
```

## 🎨 Customization

### Update Wedding Information
Edit `src/data/weddingData.js` to customize:
- Couple names (bride/groom)
- Wedding date
- Venue information
- Event details

### Modify Colors and Theme
- Update Tailwind CSS classes throughout components
- Primary colors: `#B76E79` (rose), `#D2A96B` (gold), `#FFF8F2` (cream)

### Replace Media Assets
- **Couple Image**: `/public/images/alisha-anirudh.png`
- **Story Photos**: `/public/images/story/story1-4.jpg`
- **Venue Photo**: `/public/images/venue/venue.jpg`
- **Sound Effect**: `/public/sounds/typing.mp3`

## 📱 Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🔧 Development

- **Linting**: `npm run lint`
- **Build**: `npm run build`
- **Preview**: `npm run preview`

## 📦 Deployment

The project is optimized for deployment on various platforms:

**GitHub Pages**:
```bash
npm run build
# Push dist/ folder to gh-pages branch
```

**Vercel/Netlify**: Connect your GitHub repository for automatic deployment on push.

**Traditional Hosting**: Upload the `dist/` folder contents to your web server.

## 📄 License

This project is created for Tekkzy Intelligent Solutions Company. All rights reserved.

## 👥 About Tekkzy

Tekkzy Intelligent Solutions Company specializes in creating beautiful, interactive web experiences for life's special moments. This wedding invitation template demonstrates our expertise in modern web development and user experience design.

---

**Made with ❤️ by Tekkzy Intelligent Solutions**
