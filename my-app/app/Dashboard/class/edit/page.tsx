"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";

type Teacher = {
  id: number;
  name: string;
  surname: string;
};

export default function EditClassPage() {
  const [name, setName] = useState("");
  const [teacherId, setTeacherId] = useState("");
  const [teachers, setTeachers] = useState<Teacher[]>([]);

  const router = useRouter();
  const searchParams = useSearchParams();

  const id = searchParams.get("id");

  useEffect(() => {
    if (!id) return;

    axios
      .get(`/api/Dashboard/class/edit?id=${id}`)
      .then(function (response) {
        setName(response.data.name);
        setTeacherId(String(response.data.teacherId));
      })
      .catch(function (error) {
        console.log(error);
      });

    axios
      .get("/api/Dashboard/teacher/view")
      .then(function (response) {
        setTeachers(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [id]);

  const handleEditClass = async (e: React.FormEvent) => {
    e.preventDefault();

    await axios.put("/api/Dashboard/class/edit", {
      id,
      name,
      teacherId: Number(teacherId),
    });

    router.push("/Dashboard/class/view");
  };

  return (
  <div className="min-h-screen bg-gray-100 flex items-center justify-center p-10">
    <div className="bg-white shadow-md rounded-2xl p-8 w-full max-w-md">
      <button
        onClick={() => router.push("/Dashboard/class/view")}
        className="mb-8 bg-violet-800 text-white px-4 py-2 rounded-lg hover:bg-violet-900 transition"
      >
        Back
      </button>

      <h2 className="text-4xl font-bold text-violet-800 mb-2">
        Edit Class
      </h2>

      <p className="text-gray-500 mb-8">
        Update class details.
      </p>

      <form onSubmit={handleEditClass} className="flex flex-col gap-4">
        <div className="flex flex-col">
          <label className="font-semibold mb-2">ID</label>
          <input
            value={id || ""}
            disabled
            className="border border-gray-300 p-3 rounded-lg bg-gray-100 text-gray-500"
          />
        </div>

        <div className="flex flex-col">
          <label className="font-semibold mb-2">Class Name</label>
          <input
            placeholder="Class Name"
            className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="font-semibold mb-2">Teacher</label>
          <select
            className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
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
        </div>

        <button
          type="submit"
          className="bg-violet-800 text-white p-3 rounded-lg font-semibold hover:bg-violet-900 transition mt-4"
        >
          Submit
        </button>
      </form>
    </div>
  </div>
);
}