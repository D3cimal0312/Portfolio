export const Projects = [
  {
    index: 1,
    project_name: "Sizzly – Real-Time Pizza Ordering Platform",
    project_description:
      "A real-time pizza ordering platform with a custom Node.js server integrating Socket.IO for live order tracking includes an interactive Pizza Builder, role-based access control for admin dashboards, and automated inventory alerts via scheduled email checks.",
    details: [
      "Custom server.ts runs Socket.IO alongside Next.js so order status updates push live, no polling",
      "NextAuth.js with dual Credentials providers (user + admin) and RBAC gating the admin dashboard",
      "Interactive Pizza Builder with a multi-step cart and Khalti payment integration, verified server-side",
      "node-cron scheduled inventory checks trigger Nodemailer email alerts when stock runs low",
      "Kanban-style admin dashboard for moving orders through their lifecycle",
      "Zustand for client state, MongoDB/Mongoose for data, Tailwind CSS v4 for styling",
    ],
    github_link: "https://github.com/D3cimal0312/sizzly",
    tag: ["Next.js", "TypeScript", "Socket.IO"],
    image: ["sizzly/sizzly.png"],
  },
  {
    index: 2,
    project_name: "VAEL E-commerce",
    project_description:
      "A full-stack online store with product browsing, cart, and checkout flow, complete with user authentication, a database-backed product catalog, and an admin dashboard for managing orders and inventory.",
    details: [
      "Full MERN stack, split into separate frontend and backend codebases",
      "Product browsing, cart, and multi-step checkout flow",
      "Authentication layer protecting user and admin routes",
      "Admin dashboard for managing orders and inventory",
      "Database-backed product catalog",
      "Deployed live on Vercel, UI built with Mantine components",
    ],
    github_link: "https://github.com/D3cimal0312/VAEL",
    live_link: "https://vael-nine.vercel.app",
    tag: ["Full-Stack", "Mantine"],
    image: [
      "vael/vael.png",
      "vael/vael-productpage.png",
      "vael/vael_cartpage.png",
      "vael/vael-admin.png",
    ],
  },
  {
    index: 3,
    project_name: "Expense Tracker",
    project_description:
      "A full-stack expense management app built with React.js and Node.js. Features a live dashboard with charts and graphs for visualizing spending trends, category-based grouping (food, rent, transport, etc.), tabular transaction history, and a persistent database backend.",
    details: [
      "Category-based transaction logging (food, rent, transport, etc.)",
      "Live dashboard with charts and graphs for spending trends",
      "Tabular transaction history for line-by-line detail",
      "Persistent database backend",
      "React.js frontend with a Node.js/Express backend, written in TypeScript",
    ],
    github_link: "https://github.com/D3cimal0312/expense_tracker",
    tag: ["Typescript", "React"],
    image: ["expenseTracker/expenseTracker.jpg"],
  },
  {
    index: 4,
    project_name: "CinePro",
    project_description:
      "A movie discovery app that lets users search and filter films using a free movie API, making it easy to find titles by genre, rating, and other criteria.",
    details: [
      "Search and browse films using a free public movie API",
      "Filter results by genre, rating, and other criteria",
      "Clean, responsive browsing UI built with React",
      "Fast, scannable results for quick discovery",
    ],
    github_link: "https://github.com/D3cimal0312/CinePro",
    tag: ["UI", "API", "React"],
    image: [
      "cinepro/cinepro.png",
      "cinepro/cinepro_browse.png",
      "cinepro/cinepro_movieprofile.png",
      "cinepro/cinepro_movieprofile2.png",
    ],
  },
];

export const portfolio = {
  project_name: "Portfolio",
  project_description: "Personal Portfolio website",
  github_link: "https://github.com/D3cimal0312/Portfolio",
};
