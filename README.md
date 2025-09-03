# D&D Spell Compendium

A web application to browse, search, and favorite Dungeons & Dragons spells. Built with **React**, **Vite**, and **TypeScript**.

---

## 📌 Features

- Browse all D&D spells from [D&D API](https://www.dnd5eapi.co/api)
- Search spells by name
- Filter spells by level
- Favorite/unfavorite spells
- View favorite spells separately
- Pagination for large spell lists
- Spell detail modal with additional information

- ---

## 💻 Tech Stack

- **Frontend:** React, TypeScript, Vite
- **UI:** Tailwind CSS, Material UI
- **State Management:** React hooks (`useState`, `useEffect`)
- **API:** [D&D API](https://www.dnd5eapi.co/api)
- **Routing:** React Router DOM

- ---

## ⚙️ Installation

1. Clone the repository:
```bash
git clone git@github.com:asmriti/spell-app.git
cd spell-app
```

2. Install the dependencies:
```bash
npm install
# or
yarn install
```

3. Create a .env file in the root (based on .env.example):
```bash
VITE_BASE_URL = https://www.dnd5eapi.co/
```

4. Start the development server:
```bash
npm run dev
# or
yarn dev
```
