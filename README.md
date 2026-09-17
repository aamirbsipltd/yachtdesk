# YachtDesk — The Mediterranean Algorithmic Charter Desk & Fleet Network

An institutional-grade, luxury crewed yacht charter platform built with Next.js 16 (App Router), React 19, TypeScript, and Tailwind CSS. Designed specifically for instant deployment on Vercel.

---

## 🌟 Key Features

1. **Direct Central Agency Sourcing**: Connects private charterers and family offices directly to certified Central Agency fleets across Athens (Marina Alimos, Flisvos), Mykonos, Corfu, Rhodes, and Monaco with zero retail broker markups.
2. **Interactive Live APA & Greek VAT Calculator**: Real-time decomposition of weekly base charter rates, statutory Greek Maritime VAT (12% under Law 4926/2022), and Advance Provisioning Allowance (APA 25%–35% fuel/provisioning).
3. **Curated Mediterranean Fleet Showcase**: Realistic inventory of motor superyachts, mega yachts, luxury crewed catamarans (Sunreef 80 Eco), and high-performance sailing yachts with detailed cabin layouts, speeds, fuel burn, and water toy manifests.
4. **Interactive 7-Day Curated Itineraries**: Day-by-day nautical route guides for *The Classical Cyclades* and *The Sapphire Ionian*, engineered around prevailing summer Meltemi winds.
5. **Central Agency & Fleet Manager Portal**: A dedicated B2B gateway for Greek and Mediterranean fleet managers (e.g. Vernicos Yachts, Athenian, Istion) offering automated inquiry qualification, 30-second proposal decks, and guaranteed 5% Central Agency commission protection at €0/month SaaS cost.
6. **MYBA & Maritime Governance Standards**: Full compliance with the MYBA Worldwide Yachting Agreement (WYA) and segregated stakeholder client escrow protocols.

---

## 🚀 Instant Vercel Deployment

### Option 1: 1-Click via Vercel CLI
From the `yachtdesk` root directory:
```bash
npx vercel
```
Follow the interactive prompts to deploy directly to production.

### Option 2: Connect via GitHub
1. Push this repository to GitHub:
   ```bash
   git init
   git add .
   git commit -m "feat: initial YachtDesk luxury platform release"
   git remote add origin https://github.com/YOUR_USERNAME/yachtdesk.git
   git push -u origin main
   ```
2. In your [Vercel Dashboard](https://vercel.com/new), select **Import Git Repository** and pick `yachtdesk`.
3. Framework preset will automatically detect **Next.js**. Click **Deploy**.

---

## 💻 Local Development

```bash
# Install dependencies
npm install

# Start local development server
npm run dev

# Build for production
npm run build
```
Local development runs at `http://localhost:3000`.
