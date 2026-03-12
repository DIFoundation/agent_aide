# **AIDE — Artificial Intelligence Disaster Emergency**

**AIDE is an AI-powered emergency intelligence platform that analyzes disasters in real time using voice, vision, and geospatial reasoning to deliver actionable decision support.**

```md
# 🧠 AIDE — Artificial Intelligence Disaster Emergency
Live Multimodal Disaster Intelligence & Emergency Command System

---

## 🌍 System Overview

AIDE is a real-time disaster intelligence platform that combines:

- 🎙 Voice-based interaction
- 📸 Image-based risk assessment
- 🗺 Geospatial visualization
- 📊 Emergency command dashboards
- 🧠 Multimodal AI reasoning

It provides actionable emergency insights for citizens, NGOs, and government agencies.

---

# 🏗 High-Level Architecture

```
User (Voice / Image / Map Interaction)
↓
Frontend (Next.js Command Center)
↓
Backend API Layer (Cloud Run / API Routes)
↓
AI Intelligence Layer (Gemini Multimodal)
↓
Data Layer (Firestore + Cloud Storage)
↓
External Disaster Data Sources (Optional)


```

# 🖥 1️⃣ Frontend Layer — Command Center UI

**Framework:** Next.js + Tailwind CSS  
**Deployment:** Vercel (or Cloud Run)

## Core Components

### 🎙 Voice Interaction Module
- Microphone access
- Real-time speech-to-text
- AI streaming response rendering

### 📸 Image Upload Module
- Upload disaster-related images
- Preview display
- Send to backend for vision analysis

### 🗺 Interactive Map Layer
- Mapbox or Google Maps API
- Risk heatmap overlays
- Incident markers
- Evacuation route visualization
- Timeline slider for simulation

### 📊 Dashboard Mode Toggle
- Citizen Mode
- NGO / Government Command Mode

### 📄 AI Response Panel
Displays structured AI output:

```json
{
  "incident_type": "",
  "risk_level": "Low | Moderate | High | Critical",
  "confidence_score": "",
  "affected_radius_km": "",
  "recommended_actions": [],
  "reasoning_summary": ""
}
````

---

# 🌐 2️⃣ Backend API Layer

**Environment:** Google Cloud Run or Next.js API routes

## API Endpoints

### POST /api/analyze-text

Handles:

* Voice-to-text disaster queries
* Context-aware AI reasoning
* Structured risk output

### POST /api/analyze-image

Handles:

* Image upload
* Vision-based damage detection
* Risk classification
* Bounding box data (optional)

### POST /api/generate-sms

Converts structured risk summary into:

* 160-character emergency alert format
* SMS-ready output for low-connectivity regions

### GET /api/incidents

Returns:

* Active incidents
* Historical data
* Risk levels
* Coordinates for map rendering

---

# 🧠 3️⃣ AI Intelligence Layer

**Model:** Gemini Multimodal API

## Capabilities

* Multimodal reasoning (text + image)
* Disaster classification
* Risk severity scoring
* Explainable AI output
* Context memory handling

## AI Processing Flow

1. Receive user input (text or image)
2. Classify disaster type
3. Estimate severity level
4. Generate structured risk summary
5. Provide actionable emergency instructions
6. Return confidence score

---

# 🗄 4️⃣ Data Layer

## 🔥 Firestore

Stores:

* Incident memory
* User query logs
* Risk history
* Location-tagged events

## ☁ Cloud Storage

Stores:

* Uploaded images
* Annotated image results
* Generated reports

## 📁 Static Simulation Dataset (Optional)

Used for:

* Flood expansion animation
* Wildfire spread modeling
* Population density overlays

---

# 🌍 5️⃣ External Data Integrations (Optional Advanced Layer)

* Weather APIs
* Flood alert feeds
* Elevation datasets
* Satellite imagery services

External APIs feed into:
Backend → AI Layer → Frontend Map Visualization

---

# 🔄 End-to-End Request Flow

## 🎙 Voice Query Example

User:
"What is the flood risk in Lagos?"

Flow:

1. Voice captured on frontend
2. Converted to text
3. Sent to `/api/analyze-text`
4. Backend sends prompt to Gemini
5. Gemini returns structured risk output
6. Backend stores incident in Firestore
7. Frontend updates:

   * Map heatmap
   * Risk card
   * Voice response playback

---

## 📸 Image Risk Assessment Flow

1. User uploads image
2. Frontend sends image to `/api/analyze-image`
3. Backend forwards image to Gemini Vision
4. AI detects damage patterns
5. Structured response returned
6. Map + UI update with severity badge

---

# 🛡 Security & Reliability

* Rate limiting on API endpoints
* Input validation
* Firestore rules for protected data
* Image size restrictions
* Secure environment variable handling

---

# 🚀 Scalability Considerations

Future expansion may include:

* Real-time satellite feeds
* Crowd-sourced reporting
* NGO multi-user accounts
* Predictive disaster modeling
* Offline-first emergency export

---

# 🎯 Deployment Architecture

```
Frontend (Vercel)
        ↓
Backend API (Cloud Run)
        ↓
Gemini API
        ↓
Firestore + Cloud Storage
```

---

# 📌 Design Philosophy

AIDE is designed as:

* A humanitarian AI infrastructure layer
* A transparent and explainable system
* A globally accessible emergency intelligence platform
* A decision-support tool, not just a chatbot
