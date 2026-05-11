"use client";  
import { useState } from "react";
import axios from "axios";
import Footer from "@/components/footer";
import { useRouter } from "next/dist/client/components/navigation";

export default function Add() {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const router = useRouter();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await axios.post("/api/Dashboard/student", {
        name, 
        surname 
    });
    setName("");
    setSurname("");
    router.push("/Dashboard/Student/view");
  };
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <main className="flex-1 p-10">
        <button
          onClick={() => router.push("/dashboard/Student/view")}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Back
        </button>

        <h2 className="text-xl font-bold mt-10 mb-4">Add Student</h2>

        <form
          onSubmit={handleSubmit}
          className="mt-5 flex flex-col gap-3 w-80"
        >
          <input
            placeholder="Name"
            className="border p-2 rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            placeholder="Surname"
            className="border p-2 rounded"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
          />

          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Save Student
          </button>
        </form>
      </main>

      <Footer />
    </div>
  );
}