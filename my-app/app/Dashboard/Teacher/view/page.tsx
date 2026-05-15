"use client";

import Sidebar from "@/components/sidebar";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

type Teacher = {
  id: number;
  name: string;
  surname: string;
};

export default function TeacherViewPage() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [role, setRole] = useState("");

  const router = useRouter();

  useEffect(() => {
    const savedRole = localStorage.getItem("role");
    setRole(savedRole || "");

    axios
      .get("/api/Dashboard/teacher/view")
      .then((response) => {
        setTeachers(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleDelete = async (id: number) => {
    const confirmDelete = confirm(
      "Are you sure you want to delete this teacher?"
    );

    if (!confirmDelete) return;

    await axios.delete("/api/Dashboard/teacher/view", {
      data: {
        id,
      },
    });

    const response = await axios.get("/api/Dashboard/teacher/view");
    setTeachers(response.data);
  };

  const goToEditTeacher = (id: number) => {
    router.push(`/Dashboard/Teacher/edit?id=${id}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <Sidebar />

      <main className="flex-1 p-10">
        <div className="bg-white rounded-xl shadow-md p-6 w-full max-w-4xl">
          <h2 className="text-2xl font-bold text-violet-800 mb-6">
            Teachers
          </h2>

          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-violet-800 text-white">
                <th className="p-3 rounded-tl-lg">ID</th>
                <th className="p-3">Name</th>
                <th className="p-3">Surname</th>

                {role === "admin" && (
                  <th className="p-3 rounded-tr-lg">Actions</th>
                )}
              </tr>
            </thead>

            <tbody>
              {teachers.map((teacher) => (
                <tr
                  key={teacher.id}
                  className="border-b hover:bg-violet-50 transition"
                >
                  <td className="p-3">{teacher.id}</td>
                  <td className="p-3">{teacher.name}</td>
                  <td className="p-3">{teacher.surname}</td>

                  {role === "admin" && (
                    <td className="p-3">
                      <button
                        onClick={() => goToEditTeacher(teacher.id)}
                        className="bg-yellow-400 text-white px-4 py-1 rounded-md hover:bg-yellow-500 transition"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(teacher.id)}
                        className="bg-red-600 text-white px-4 py-1 rounded-md hover:bg-red-700 transition ml-2"
                      >
                        Delete
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}