interface Props {
    response: any
  }
  
  export default function IntelligencePanel({ response }: Props) {
  
    if (!response) {
      return (
        <div className="p-4 text-sm text-gray-400">
          Awaiting AI analysis...
        </div>
      )
    }
  
    return (
      <div className="p-4 space-y-4">
  
        <div>
          <p className="text-xs text-gray-400">Incident Type</p>
          <p className="font-medium">{response.incident_type}</p>
        </div>
  
        <div>
          <p className="text-xs text-gray-400">Risk Level</p>
          <p className="text-red-400 font-semibold">{response.risk_level}</p>
        </div>
  
        <div>
          <p className="text-xs text-gray-400">Confidence</p>
          <p>{response.confidence_score}%</p>
        </div>
  
        <div>
          <p className="text-xs text-gray-400">Reasoning</p>
          <p className="text-sm">{response.reasoning_summary}</p>
        </div>
  
      </div>
    )
  }