"use client";

import { useState } from "react";

interface Props {
  onResult: (data: any) => void;
}

export default function ImageUpload({ onResult }: Props) {
  const [loading, setLoading] = useState(false);

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    setLoading(true);

    const res = await fetch("/api/analyze-image", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    onResult(data.data);

    setLoading(false);
  }

  return (
    <div className="p-4 border rounded-lg bg-gray-900">
      <p className="text-sm mb-2">Upload Disaster Image</p>

      <input
        type="file"
        accept="image/*"
        onChange={handleUpload}
        className="text-sm"
      />

      {loading && <p className="text-xs mt-2">Analyzing image...</p>}
    </div>
  );
}