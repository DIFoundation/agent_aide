"use client";

import { useState } from "react";
import RiskCard from "@/components/command/RiskCard";
import DisasterMap from "@/components/map/DisasterMap";
import { DisasterResponse } from "@/types/disaster";
import ImageUpload from "@/components/vision/ImageUpload";
import CommandBar from "@/components/command/CommandBar";
import IntelligencePanel from "@/components/panels/IntelligencePanel";
import IncidentFeed from "@/components/panels/IncidentFeed";
import RiskDashboard from "@/components/panels/RiskDashboard";
import SmsExport from "@/components/alerts/SmsExport";

export default function Dashboard() {
    const [input, setInput] = useState("");
    const [response, setResponse] = useState<DisasterResponse | null>(null);
    const [mapCenter, setMapCenter] = useState<{ lat: number, lng: number } | undefined>();
    const [radius, setRadius] = useState<number | undefined>();
    const [riskLevel, setRiskLevel] = useState<any>();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        try {
            setLoading(true);
            const res = await fetch("/api/analyze-text", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: input }),
            });

            const data = await res.json();
            if (data.data == null) {
                console.log(data.error);
                setLoading(false);
                return;
            }
            const ai = data.data as DisasterResponse;

            setResponse(ai);

            // Temporary: default Lagos coordinates
            setMapCenter({ lat: ai.coordinates.lat, lng: ai.coordinates.lng });
            setRadius(ai.affected_radius_km);
            setRiskLevel(ai.risk_level)

            setLoading(false);
        } catch (error) {
            console.error("Error analyzing text:", error);
            setLoading(false);
        }
    };

    function textSearch() {
        return (
            <form className="flex gap-3 px-4 py-2 rounded-md justify-center w-1/3">
                <input
                    type="text"
                    className="text-sm p-2 bg-gray-800 text-white w-full"
                    placeholder="Ask about a disaster..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />

                {
                    loading ? (
                        <button
                            disabled
                            className="bg-orange-500 p-2 rounded"
                        >
                            Analyzing...
                        </button>
                    ) : (
                        <button
                            type="submit"
                            onClick={handleSubmit}
                            className="bg-orange-500 p-2 rounded"
                        >
                            Analyze
                        </button>
                    )
                }
            </form>
        )
    }

    function handleImageResult(data: any) {
        setResponse(data);
    }

    return (
        <div className="flex flex-col h-screen">

            <CommandBar textSearch={textSearch} />

            <div className="flex flex-1 h-[calc(100vh-56px)]">
                <div className="w-1/2">
                    <DisasterMap coordinates={mapCenter!} affected_radius_km={radius!} risk_level={riskLevel!} />
                </div>
                <div className="w-1/4 border-l border-gray-800">
                    <IntelligencePanel response={response} />
                </div>
                <div className="w-1/4 border-l border-gray-800">
                    <IncidentFeed />
                </div>
            </div>

            <div className="grid grid-cols-3 border-t border-gray-800">

                <ImageUpload onResult={handleImageResult} />

                <RiskDashboard />

                <SmsExport response={response} />

            </div>
            <div className="bg-gray-800 p-4 mt-4 rounded text-sm">
                <div className="bg-gray-800 p-4 mt-4 rounded text-sm">
                    {response && <RiskCard {...response} />}
                </div>
            </div>
        </div>
    );
}