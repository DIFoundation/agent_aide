"use client";

import { useState } from "react";
import RiskCard from "@/components/command/RiskCard";
import DisasterMap from "@/components/map/DisasterMap";
// import ReactMarkdown from 'react-markdown';

export default function Dashboard() {
    const [input, setInput] = useState("");
    const [response, setResponse] = useState<any>(null);
    const [mapCenter, setMapCenter] = useState<[number, number] | undefined>();
    const [radius, setRadius] = useState<number | undefined>();

    const handleSubmit = async () => {
        const res = await fetch("/api/analyze-text", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: input }),
        });

        const data = await res.json();
        setResponse(data.data);

        // Temporary: default Lagos coordinates
        setMapCenter([3.3792, 6.5244]);
        setRadius(data.data.affected_radius_km);

        // setMapCenter(data.data.center);
        // setRadius(data.data.radius);
    };

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