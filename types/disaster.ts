export interface DisasterResponse {
    incident_type: string
    location_name: string
    coordinates: {
      lat: number
      lng: number
    }
    risk_level: "Low" | "Moderate" | "High" | "Critical"
    confidence_score: number
    affected_radius_km: number
    recommended_actions: string[]
    reasoning_summary: string
  }