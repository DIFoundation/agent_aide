"use client";

import { JSX } from "react";

export default function CommandBar({ textSearch }: { textSearch: () => JSX.Element }) {
    return (
        <div className="w-full h-16 bg-black border-b border-gray-800 flex items-center justify-between px-6">

            <div className="text-xl font-semibold text-orange-500">
                AIDE Command Center
            </div>

            {textSearch()}


            <div className="flex gap-3">
                <span className="text-xs bg-red-600 px-2 py-1 rounded">
                    LIVE
                </span>
            </div>

        </div>
    );
}



