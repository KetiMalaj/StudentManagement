"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Footer from "@/components/footer";
import { useRouter } from "next/navigation";

type Teacher = {
  id: number;
  name: string;
  surname: string;
};

export default function AddClassPage() {
  const [name, setName] = useState("");
  const [teacherId, setTeacherId] = useState("");
  const [teachers, setTeachers] = useState<Teacher[]>([]);

  const router = useRouter();

  useEffect(() => {
    axios
      .get("/api/Dashboard/teacher/view")
      .then(function (response) {
        setTeachers(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const handleAddClass = async (e: React.FormEvent) => {
    e.preventDefault();

    await axios.post("/api/Dashboard/class/add", {
      name,
      teacherId: Number(teacherId),
    });

    setName("");
    setTeacherId("");

    router.push("/Dashboard/class/view");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <main className="flex-1 p-10">
        <button
          onClick={() => router.push("/Dashboard/class/view")}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Back
        </button>

        <h2 className="text-xl font-bold mt-10 mb-4">Add Class</h2>

        <form
          onSubmit={handleAddClass}
          className="mt-5 flex flex-col gap-3 w-80"
        >
          <input
            placeholder="Class Name"
            className="border p-2 rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <select
            className="border p-2 rounded"
            value={teacherId}
            onChange={(e) => setTeacherId(e.target.value)}
            required
          >
            <option value="">Select Teacher</option>

            {teachers.map((teacher) => (
              <option key={teacher.id} value={teacher.id}>
                {teacher.name} {teacher.surname}
              </option>
            ))}
          </select>

          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Save Class
          </button>
        </form>
      </main>

      <Footer />
    </div>
  );
}