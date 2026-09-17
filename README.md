# 🛡️ CivicShield

**Public Procurement Anomaly Detection — Hackathon Prototype**

CivicShield creates an evidence-based audit trail of Companies → Bids → Projects → Materials → Payments → Asset History and identifies projects that deserve human investigation.

> ⚠️ This prototype uses **synthetic demo data** — not real government records.

## 🚀 Quick Start

```bash
npm install
npm run dev
```

Open **https://temporary-snappy-jade-yae20ny.vercel.app/**

## ✨ Features

| Page | Description |
|------|-------------|
| **Overview** | KPI dashboard with charts for project status, funds, costs, and review signals |
| **Companies** | 10 synthetic companies with searchable performance table & drill-down profiles |
| **Projects** | 28 searchable/filterable projects with detailed contract, cost, timeline, and materials views |
| **Procurement** | Bid comparison and contract award analysis with visual charts |
| **Materials Audit** | Price deviation tracking across all materials with supplier verification |
| **Asset History** | Visual timeline of infrastructure assets tracking re-interventions |
| **⚡ Anomaly Detector** | Rule-based analysis engine with explainable review signals |

## 🔍 Anomaly Detection Rules

The system uses **deterministic, explainable rules** — no ML/AI:

| Signal | Condition |
|--------|-----------|
| Cost Variation | Final cost > 10% above original |
| Material Price | Purchase price > 15% above reference |
| Early Re-Intervention | Related work within 24 months |
| Progress/Funds Mismatch | Funds utilized - progress > 15% |
| Vendor History | Contractor has ≥2 late projects |

## 🎨 Tech Stack

- **React** + **TypeScript** + **Vite**
- **Tailwind CSS** v4 (dark/light mode)
- **Recharts** for data visualization
- **Lucide** icons
- **React Router** v7 for navigation

## 📋 Important Notes

- Uses terms like "Review Signal", "Anomaly Detected", "Investigation Priority"
- **Never** claims corruption or fraud
- All signals are explainable with evidence
- Dark/Light mode persisted via localStorage
- Fully responsive layout

## License

MIT
