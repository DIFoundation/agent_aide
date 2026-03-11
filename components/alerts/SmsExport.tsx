interface Props {
    response: any
  }
  
  export default function SmsExport({ response }: Props) {
  
    if (!response) return null
  
    const sms = `ALERT: ${response.incident_type} risk is ${response.risk_level}. Follow safety instructions immediately.`
  
    return (
      <div className="p-4">
  
        <h3 className="text-sm font-semibold mb-2">
          Emergency SMS Alert
        </h3>
  
        <textarea
          value={sms}
          readOnly
          className="w-full p-2 bg-gray-900 text-sm rounded"
        />
  
      </div>
    )
  }