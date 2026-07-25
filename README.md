# 🌿 PlantPlanet

[![Vercel](https://therealsujitk-vercel-badge.vercel.app/?app=plant-planet-lemon)](https://plant-planet-lemon.vercel.app/)

An open-source community platform for plant lovers to share knowledge, document growth, and connect with growers worldwide.

🇹🇼 [中文說明](docs/README-zh-TW.md)

## ✨ Features

- **Community Forum** — Share your plant journey, get expert advice, and connect with fellow plant enthusiasts
- **Plant Encyclopedia** — Browse and explore a comprehensive collection of plants with care guides
- **Growth Journal** — Track your plants' growth with photos and notes over time
- **Exchange Network** — Trade cuttings, seeds, and plants with local growers
- **Responsive Design** — Beautiful interface that works seamlessly on desktop and mobile

## 🚀 Live Demo

Visit [plant-planet-lemon.vercel.app](https://plant-planet-lemon.vercel.app/)

## 🛠️ Tech Stack

- **Frontend:** React 19 + TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS v4
- **Routing:** React Router v7
- **Deployment:** Vercel

## 📦 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/HoDZadkiel/PlantPlanet.git
cd PlantPlanet

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
```

The built files are in the `dist/` directory, ready for deployment.

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

### Option 1: Submit an Issue (Recommended)

1. Go to the [Issues](https://github.com/HoDZadkiel/PlantPlanet/issues) tab
2. Click "New issue" → "Get started"
3. Choose the appropriate template:
   - **✨ Enhancement** — Improve existing features or text
   - **🐛 Bug Report** — Report errors or display issues
   - **🌐 Translation** — Fix translations or add new ones
   - **🚀 Feature Request** — Propose new features
   - **🎨 Design Change** — UI/UX suggestions
4. Fill in the template — our automation will handle the rest!

### Option 2: Pull Request

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Run `npm run build` to ensure everything compiles
5. Commit your changes (`git commit -m 'Add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

## 🔧 Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run linting |
| `npm run check` | Type check |

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Navbar.tsx       # Top navigation bar
│   └── MobileMenu.tsx   # Mobile navigation menu
├── pages/               # Route pages
│   ├── HomePage.tsx     # Landing page
│   ├── ForumPage.tsx    # Community forum
│   ├── PostPage.tsx     # Individual post view
│   ├── PlantLibraryPage.tsx  # Plant encyclopedia
│   ├── JournalPage.tsx  # Growth journal
│   └── CommunityPage.tsx    # Member community
├── data/
│   └── mockData.ts      # Mock data for development
├── types/
│   └── index.ts         # TypeScript type definitions
├── App.tsx              # App root and routing
├── main.tsx             # Entry point
└── index.css            # Global styles
```

## 🚀 Deployment

This project is deployed on Vercel and automatically publishes when changes are merged to the `main` branch.

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

Built with ❤️ by plant lovers, for plant lovers.
