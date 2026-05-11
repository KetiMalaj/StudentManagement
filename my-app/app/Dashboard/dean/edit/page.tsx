"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Footer from "@/components/footer";
import { useRouter, useSearchParams } from "next/navigation";

export default function EditDeanPage() {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");

  const router = useRouter();
  const searchParams = useSearchParams();

  const id = searchParams.get("id");

  useEffect(() => {
    if (!id) return;

    axios
      .get(`/api/Dashboard/dean/edit?id=${id}`)
      .then(function (response) {
        setName(response.data.name);
        setSurname(response.data.surname);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [id]);

  const handleEditDean = async (e: React.FormEvent) => {
    e.preventDefault();

    await axios.put("/api/Dashboard/dean/edit", {
      id,
      name,
      surname,
    });

    router.push("/Dashboard/dean/view");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <main className="flex-1 p-10">
        <button
          onClick={() => router.push("/Dashboard/dean/view")}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Back
        </button>

        <h2 className="text-xl font-bold mt-10 mb-4">Edit Dean</h2>

        <form
          onSubmit={handleEditDean}
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
            Update Dean
          </button>
        </form>
      </main>

      <Footer />
    </div>
  );
}