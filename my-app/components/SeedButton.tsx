"use client";

import { useState } from "react";

export default function SeedButton() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  async function handleSeed() {
    if (!confirm("This will clear all existing data and seed the database with sample data. Continue?")) {
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const res = await fetch("/api/Dashboard/seed", { method: "POST" });
      const data = await res.json();

      if (res.ok) {
        setResult(`Seeded: ${data.data.students} students, ${data.data.teachers} teachers, ${data.data.classes} classes, ${data.data.deans} deans, ${data.data.faculties} faculties`);
      } else {
        setResult("Error: " + (data.message || "Failed to seed"));
      }
    } catch {
      setResult("Error: Failed to connect to server");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mb-6">
      <button
        onClick={handleSeed}
        disabled={loading}
        className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-semibold py-2 px-4 rounded transition-colors"
      >
        {loading ? "Seeding..." : "Seed Database"}
      </button>
      {result && (
        <p className={`mt-2 text-sm ${result.startsWith("Error") ? "text-red-600" : "text-green-600"}`}>
          {result}
        </p>
      )}
    </div>
  );
}
