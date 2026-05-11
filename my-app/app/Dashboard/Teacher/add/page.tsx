"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import Footer from "@/components/footer";
import Header from "@/components/header";
import { useRouter } from "next/navigation";

export default function Teacher() {
    const [showForm, setShowForm] = useState(false);
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [editingTeacherId, setEditingTeacherId] = useState<number | null>(null);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (editingTeacherId) {
            await axios.put("/api/Dashboard/teacher/add", {
                id: editingTeacherId,
                name,
                surname,
            });
        } else {
            await axios.post("/api/Dashboard/teacher/add", {
                name,
                surname,
            });
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
          <main className="flex-1 p-10">
            <button
              onClick={() => router.push("/Dashboard/Teacher/view")}
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Back
            </button>
    
            <h2 className="text-xl font-bold mt-10 mb-4">Add Teacher</h2>
    
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
                Save Teacher
              </button>
            </form>
          </main>
    
          <Footer />
        </div>
      );
    }