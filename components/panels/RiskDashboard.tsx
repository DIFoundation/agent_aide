export default function RiskDashboard() {

    return (
      <div className="p-4">
  
        <h3 className="text-sm font-semibold mb-4">
          Global Risk Overview
        </h3>
  
        <div className="grid grid-cols-2 gap-4">
  
          <div className="bg-gray-900 p-3 rounded">
            <p className="text-xs text-gray-400">Active Alerts</p>
            <p className="text-xl">12</p>
          </div>
  
          <div className="bg-gray-900 p-3 rounded">
            <p className="text-xs text-gray-400">High Risk Zones</p>
            <p className="text-xl text-red-400">4</p>
          </div>
  
        </div>
  
      </div>
    )
  }