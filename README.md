# 🏔️ Momentum — Visual Productivity Planner

> *"A visual productivity planner that turns your goals, streaks, and monthly progress into a climb you can actually see."*
Quick Start

```bash
# Clone
git clone https://github.com/saketX01/momentum.git
cd momentum

# Install
npm install

# Run
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) and start climbing.

## 📂 Project Structure

```
momentum/
├── src/
│   ├── Pages/
│   │   ├── Home.jsx          # Landing page with GSAP animations
│   │   └── Calendar.jsx      # Calendar dashboard + sidebar
│   ├── components/
│   │   ├── Navbar.jsx         # Responsive navbar + hamburger
│   │   ├── calendar/
│   │   │   ├── CalendarGrid.jsx  # Wall calendar with hero image
│   │   │   ├── DayCell.jsx       # Individual day cells
│   │   │   └── EventModal.jsx    # Bottom-sheet event creation
│   │   └── preloader/
│   │       └── Preloader.jsx     # Animated loading screen
│   ├── features/
│   │   └── calendarSlice.js      # Redux state management
│   ├── store/
│   │   └── store.js              # Redux store config
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css                 # Global styles + responsive utils
├── index.html
├── package.json
└── vite.config.js

