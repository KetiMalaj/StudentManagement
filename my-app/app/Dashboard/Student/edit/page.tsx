"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import Footer from "@/components/footer";

export default function Edit() {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");

  const router = useRouter();
  const searchParams = useSearchParams();

  const id = searchParams.get("id");

  useEffect(() => {
    if (!id) return;

    axios
      .get(`/api/Dashboard/student/edit?id=${id}`)
      .then(function (response) {
        setName(response.data.name);
        setSurname(response.data.surname);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [id]);

  const handleEditStudent = async (e: React.FormEvent) => {
    e.preventDefault();

    await axios.put("/api/Dashboard/student/edit", {
      id,
      name,
      surname,
    });

    router.push("/Dashboard/Student/view");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <main className="flex-1 p-10">
        <button
          onClick={() => router.push("/Dashboard/Student/view")}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Back
        </button>

        <h2 className="text-xl font-bold mt-10 mb-4">Edit Student</h2>

        <form
          onSubmit={handleEditStudent}
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
            Update Student
          </button>
        </form>
      </main>

      <Footer />
    </div>
  );
}