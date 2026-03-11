Below is your **production-grade folder structure** for AIDE.

---

# 🗂 AIDE Project Folder Structure

```
aide/
│
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── globals.css
│   │
│   ├── dashboard/
│   │   ├── page.tsx
│   │   ├── loading.tsx
│   │   └── error.tsx
│   │
│   ├── ngo/
│   │   └── page.tsx
│   │
│   └── api/
│       ├── analyze-text/
│       │   └── route.ts
│       │
│       ├── analyze-image/
│       │   └── route.ts
│       │
│       ├── generate-sms/
│       │   └── route.ts
│       │
│       └── incidents/
│           └── route.ts
│
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   ├── Sidebar.tsx
│   │   └── ModeToggle.tsx
│   │
│   ├── command/
│   │   ├── VoiceInput.tsx
│   │   ├── AIResponsePanel.tsx
│   │   └── RiskCard.tsx
│   │
│   ├── map/
│   │   ├── DisasterMap.tsx
│   │   ├── HeatmapLayer.tsx
│   │   ├── IncidentMarkers.tsx
│   │   └── EvacuationRoutes.tsx
│   │
│   ├── upload/
│   │   └── ImageUploader.tsx
│   │
│   └── dashboard/
│       ├── IncidentList.tsx
│       ├── SeverityChart.tsx
│       └── ResourceSuggestions.tsx
│
├── lib/
│   ├── ai/
│   │   ├── gemini.ts
│   │   ├── prompts.ts
│   │   └── responseParser.ts
│   │
│   ├── firestore/
│   │   ├── client.ts
│   │   └── incidents.ts
│   │
│   ├── storage/
│   │   └── upload.ts
│   │
│   └── utils/
│       ├── riskScoring.ts
│       ├── smsFormatter.ts
│       └── constants.ts
│
├── types/
│   ├── incident.ts
│   ├── ai.ts
│   └── map.ts
│
├── public/
│   ├── icons/
│   └── demo-data/
│
├── styles/
│   └── animations.css
│
├── .env.local
├── next.config.js
├── tailwind.config.ts
├── package.json
└── ARCHITECTURE.md
```

---

# 🔎 What Each Major Folder Does

## `/app`

Routing layer.

* `/dashboard` → Citizen Command Center
* `/ngo` → NGO/Government Mode
* `/api/*` → Backend intelligence endpoints

This keeps it clean and scalable.

---

## `/components`

Separated by domain:

* `command/` → Voice + AI panels
* `map/` → All geospatial logic
* `upload/` → Image-based assessment
* `dashboard/` → NGO analytics
* `layout/` → Navigation structure

This makes refactoring easy later.

---

## `/lib`

This is your **brain layer**.

### `lib/ai`

* Gemini initialization
* Disaster system prompts
* Structured response parsing

### `lib/firestore`

* Incident storage
* Query history
* NGO analytics aggregation

### `lib/storage`

* Image upload handling

### `lib/utils`

* Risk score normalization
* SMS alert formatting
* Shared constants

---

## `/types`

Critical for structured AI output.

Example:

```ts
export type RiskLevel = "Low" | "Moderate" | "High" | "Critical";

export interface Incident {
  id: string;
  incident_type: string;
  risk_level: RiskLevel;
  confidence_score: number;
  coordinates: {
    lat: number;
    lng: number;
  };
  recommended_actions: string[];
  reasoning_summary: string;
  createdAt: Date;
}
```
