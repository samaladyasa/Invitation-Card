# 💍 Alisha & Anirudh's Wedding Invitation

A modern digital wedding invitation built with React and Vite. The site combines a cinematic intro, interactive scratch reveal, countdown, event details, gallery, venue information, and a closing footer.

**Project by:** Adyasa Anusaya Samal

## ✨ Features

- **Envelope Intro**: Full-screen opening animation before the invitation loads
- **Hero Section**: Couple names, animated reveal, and a scratch-to-reveal photo card
- **Scratch Card Interaction**: Interactive gifts section where users scratch off a foil card
- **Countdown Timer**: Live countdown to the wedding date
- **Events Section**: Schedule and details for wedding-related events
- **Gallery Section**: Scrollable image gallery
- **Venue Section**: Venue details and map link
- **Footer Navigation**: In-page navigation links and closing message
- **Responsive Design**: Mobile-first layout for desktop and smaller screens
- **Smooth Animations**: Framer Motion transitions and scroll reveals

## 🛠 Tech Stack

- **Frontend**: React 19.2.7
- **Build Tool**: Vite 8.1.1
- **Styling**: Tailwind CSS 4.3.2
- **Animations**: Framer Motion 12.42.2
- **Icons**: Lucide React 1.24.0
- **Effects**: Canvas Confetti 1.9.4
- **Linting**: ESLint 10.6.0

## 📋 Prerequisites

- Node.js v16 or higher
- npm

## 🚀 Installation

```bash
git clone https://github.com/samaladyasa/Invitation-Card.git
cd Invitation-Card
npm install
npm run dev
```

Open the site at `http://localhost:5173`.

## 📁 Project Structure

```
src/
├── components/
│   ├── Background/      # Background visuals and hero backdrop
│   ├── Countdown/       # Wedding countdown timer
│   ├── Dividers/        # Section divider components
│   ├── Events/          # Wedding event listings
│   ├── Footer/          # Footer and navigation links
│   ├── Gallery/         # Image gallery section
│   ├── Gifts/           # Interactive scratch card gift section
│   ├── Hero/            # Hero section and scratch photo
│   ├── Intro/           # Opening envelope animation
│   ├── ScrollReveal.jsx # Reusable scroll reveal wrapper
│   ├── Venue/           # Venue information section
│   └── Icons/           # Custom icon components
├── data/
│   └── weddingData.js   # Wedding content and text data
├── hooks/
│   ├── useConfetti.js
│   ├── useEnvelopeTimeline.js
│   └── useScratchReveal.js
├── App.jsx
├── index.css
├── main.jsx
└── package.json
```

## 🎨 Customize the Invitation

### Wedding Details
Edit `src/data/weddingData.js` to update:
- Couple names
- Wedding date
- Venue details
- Event text

### Styling
Update Tailwind classes and CSS variables in `src/index.css` for colors, typography, and theme styles.

### Assets
Replace images in `public/images/` and update component references as needed.

## 🔧 Scripts

- `npm run dev` — start the development server
- `npm run build` — create a production build
- `npm run preview` — preview the production build locally

## 📄 License

Created for Tekkzy Intelligent Solutions. All rights reserved.
