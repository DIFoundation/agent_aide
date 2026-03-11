export default function IncidentFeed() {

    const incidents = [
      { type: "Flood Risk", location: "Lagos Island", severity: "High" },
      { type: "Wildfire Smoke", location: "California", severity: "Moderate" },
    ]
  
    return (
      <div className="p-4 space-y-3">
  
        <h3 className="text-sm font-semibold">Active Incidents</h3>
  
        {incidents.map((i, idx) => (
          <div key={idx} className="p-3 bg-gray-900 rounded">
  
            <p className="text-sm">{i.type}</p>
  
            <p className="text-xs text-gray-400">
              {i.location}
            </p>
  
            <p className="text-xs text-red-400">
              {i.severity}
            </p>
  
          </div>
        ))}
  
      </div>
    )
  }