# Anuj Bajracharya — Portfolio

A personal portfolio built with React, TypeScript, Tailwind CSS, and Three.js. Features a live 3D scene, project showcase, certifications, and a working contact form via EmailJS.



---

## Tech Stack

| Layer | Tech |
|---|---|
| Framework | React 19 + TypeScript |
| Styling | Tailwind CSS v4 |
| 3D | Three.js · React Three Fiber · Drei |
| Animation | Framer Motion · AOS |
| Contact | EmailJS |
| Build | Vite |

---

## Features

- **3D Scene** — Interactive octahedrons, torus knot, and wire sphere rendered with React Three Fiber, performance-tiered by device
- **Projects** — Hover-to-preview image cards with tilt effect and live/GitHub links
- **Certifications** — 3D tilt cert cards with verified badges and direct certificate links
- **Contact Form** — Live form connected to Gmail via EmailJS with loading and success states
- **Animations** — AOS scroll reveals, Framer Motion transitions, left-to-right shine sweeps

---

## Project Structure

```
src/
├── components/
│   ├── Hero.tsx              # Landing section with 3D scene
│   ├── Navbar.tsx
│   ├── Project.tsx           # Project cards with hover image preview
│   ├── TechStack.tsx
│   ├── Certifications.tsx    # Cert grid + participation badges
│   ├── CertCard.tsx          # 3D tilt card component
│   ├── Contact.tsx           # Contact section wrapper
│   ├── Message.tsx           # Contact left + right layout
│   ├── MessageInfo.tsx       # Left — links and availability
│   ├── MessageMail.tsx       # Right — EmailJS form
│   ├── HoverImage.tsx        # Cursor-following image preview
│   ├── Footer.tsx
│   ├── common/
│   │   ├── Title.tsx         # Section heading component
│   │   └── L2rshine.tsx      # Left-to-right shine sweep
│   └── three/
│       ├── Scene3D.tsx       # Main Three.js canvas
│       ├── Octahedrons.tsx
│       ├── TorusKnot.tsx
│       ├── WireSphere.tsx
│       └── MouseTracker.tsx
├── utils/
│   ├── CopyToClipboard.tsx
│   └── deviceTier.ts         # Performance tier detection
public/
└── certs/                    # Certificate PDFs and images
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
git clone https://github.com/D3cimal0312/Portfolio.git
cd anuj-portfolio
npm install
```

### Environment Variables

Create a `.env` file in the root:

```env
VITE_EMAILJS_SERVICE_ID=service_xxxxxxx
VITE_EMAILJS_TEMPLATE_ID=template_xxxxxxx
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

Get these from [emailjs.com](https://emailjs.com) — see [EmailJS setup](#emailjs-setup) below.

### Run

```bash
npm run dev
```

### Build

```bash
npm run build
```

---

## EmailJS Setup

1. Create an account at [emailjs.com](https://emailjs.com)
2. Add a **Gmail** email service → copy `service_id`
3. Create an email template with variables: `{{from_name}}` `{{from_email}}` `{{subject}}` `{{message}}` `{{time}}` → copy `template_id`
4. Go to **Account → API Keys** → copy your public key
5. Paste all three into your `.env` file

---

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start dev server |
| `npm run build` | Type-check and build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

---

## License

MIT — feel free to use this as a reference or template for your own portfolio.
