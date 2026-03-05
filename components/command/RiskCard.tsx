type RiskLevel = "Low" | "Moderate" | "High" | "Critical";

interface Props {
  incident_type: string;
  risk_level: RiskLevel;
  confidence_score: number;
  affected_radius_km: number;
  recommended_actions: string[];
  reasoning_summary: string;
}

export default function RiskCard(props: Props) {
  const riskColors = {
    Low: "bg-green-500",
    Moderate: "bg-yellow-500",
    High: "bg-orange-500",
    Critical: "bg-red-600",
  };

  return (
    <div className="bg-gray-900 p-4 rounded-lg space-y-3">
      <div className="flex justify-between items-center">
        <h2 className="font-bold text-lg">{props.incident_type}</h2>
        <span
          className={`px-2 py-1 text-xs rounded text-white ${riskColors[props.risk_level]}`}
        >
          {props.risk_level}
        </span>
      </div>

      <p className="text-sm text-gray-300">
        {props.reasoning_summary}
      </p>

      <div className="text-xs text-gray-400">
        Affected Radius: {props.affected_radius_km} km
      </div>

      <div className="text-xs text-gray-400">
        Confidence: {props.confidence_score}%
      </div>

      <ul className="text-sm list-disc pl-4 space-y-1">
        {props.recommended_actions.map((action, i) => (
          <li key={i}>{action}</li>
        ))}
      </ul>
    </div>
  );
}