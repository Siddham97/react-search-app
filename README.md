# React Search App

A sleek and modern React + Vite application designed for efficient and responsive search experiences.  
Built using **React**, **TypeScript**, and **Material-UI (MUI)**, this app demonstrates clean architecture, modular code, and scalable frontend design patterns.

---

## 🚀 Features

- 🔍 **Instant Search** — Real-time debounced search input  
- ⚙️ **Sort & Filter** — Sort by price, relevance, or custom fields  
- ♾️ **Infinite Scroll** — Seamless loading of paginated results  
- 💅 **Material-UI Styling** — Beautiful, responsive components  
- ⚡ **Vite Build Tool** — Blazing fast startup and HMR  
- 🧩 **Modular Folder Structure** — Easy to extend and maintain  

---

## 🛠️ Getting Started

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/Siddham97/react-search-app.git
cd react-search-app

2️⃣ Install Dependencies

npm install
# or
yarn install

3️⃣ Run the Development Server

npm run dev

🏗️ Build for Production

npm run build

This command builds an optimized production bundle inside the dist/ folder.

To preview the production build:

npm run preview

⚙️ Environment Variables

If you’re integrating with an external API, create a .env file at the root:

VITE_API_BASE_URL=https://api.yourservice.com
VITE_SEARCH_ENDPOINT=/search
VITE_PAGE_SIZE=20


These values can be accessed using import.meta.env.

📁 Project Structure
react-search-app/
├── public/
│   └── index.html
├── src/
│   ├── api/
│   │   └── searchService.ts
│   ├── components/
│   │   ├── SearchBar.tsx
│   │   ├── SearchResults.tsx
│   │   ├── FilterPanel.tsx
│   │   └── InfiniteScrollList.tsx
│   ├── hooks/
│   │   └── useSearch.ts
│   ├── pages/
│   │   └── HomePage.tsx
│   ├── App.tsx
│   └── main.tsx
├── .gitignore
├── package.json
└── README.md

💻 Usage Instructions

Type in a search query and press Enter.

Results will automatically load and update.

Scroll down to trigger infinite scroll and load additional results.

Use available filters/sort options to refine the output.

🧪 Running Tests

If you have tests configured with Jest or Vitest:

npm test
