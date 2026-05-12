"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function AddDeanPage() {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");

  const router = useRouter();

  const handleAddDean = async (e: React.FormEvent) => {
    e.preventDefault();

    await axios.post("/api/Dashboard/dean/add", {
      name,
      surname,
    });

    setName("");
    setSurname("");

    router.push("/Dashboard/dean/view");
  };

   return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-10">
      <div className="bg-white shadow-md rounded-2xl p-8 w-full max-w-md">
        <button
          onClick={() => router.push("/Dashboard/dean/view")}
          className="mb-8 bg-violet-800 text-white px-4 py-2 rounded-lg hover:bg-violet-900 transition"
        >
          Back
        </button>

        <h2 className="text-3xl font-bold text-violet-800 mb-2">
          Add Dean
        </h2>

        <p className="text-gray-500 mb-8">
          Fill in the dean information below.
        </p>

        <form onSubmit={handleAddDean} className="flex flex-col gap-4">
          <input
            placeholder="Name"
            className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            placeholder="Surname"
            className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
            required
          />

          <button
            type="submit"
            className="bg-violet-800 text-white p-3 rounded-lg font-semibold hover:bg-violet-900 transition"
          >
            Save Dean
          </button>
        </form>
      </div>
    </div>
  );
}