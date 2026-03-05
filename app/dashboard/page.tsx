"use client";

import { useState } from "react";
import RiskCard from "@/components/command/RiskCard";
import DisasterMap from "@/components/map/DisasterMap";
import { DisasterResponse } from "@/types/disaster";
import ImageUpload from "@/components/vision/ImageUpload";

export default function Dashboard() {
    const [input, setInput] = useState("");
    const [response, setResponse] = useState<DisasterResponse | null>(null);
    const [mapCenter, setMapCenter] = useState<[number, number] | undefined>();
    const [radius, setRadius] = useState<number | undefined>();

    const handleSubmit = async () => {
        const res = await fetch("/api/analyze-text", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: input }),
        });

        const data = await res.json();
        const ai = data.data as DisasterResponse;

        setResponse(ai);

        // Temporary: default Lagos coordinates
        setMapCenter([ai.coordinates.lng, ai.coordinates.lat]);
        setRadius(ai.affected_radius_km);

        // setMapCenter(data.data.center);
        // setRadius(data.data.radius);
    };

    function handleImageResult(data: any) {
        setResponse(data);
      }

    return (
        <div className="flex h-screen">
            <div className="w-2/3 h-screen bg-gray-900 text-white flex items-center justify-center">
                <DisasterMap center={mapCenter} radiusKm={radius} />
            </div>

            <div className="w-1/3 bg-black p-6 flex flex-col gap-4">
                <h1 className="text-xl font-bold text-orange-500">AIDE Command Panel</h1>

                <textarea
                    className="p-2 bg-gray-800 text-white"
                    placeholder="Ask about a disaster..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />

                <button
                    onClick={handleSubmit}
                    className="bg-orange-500 p-2 rounded"
                >
                    Analyze
                </button>

                <ImageUpload onResult={handleImageResult} />

                <div className="bg-gray-800 p-4 mt-4 rounded text-sm">
                    <div className="bg-gray-800 p-4 mt-4 rounded text-sm">
                        {response && <RiskCard {...response} />}
                    </div>
                    {/* <ReactMarkdown>
                        {response}
                    </ReactMarkdown> */}
                </div>
            </div>
        </div>
    );
}