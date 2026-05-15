"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "@/components/sidebar";
import { useRouter } from "next/navigation";
import { useRole } from "@/app/lib/useRole";

type Student = {
  id: number;
  name: string;
  surname: string;
  gpa?: number | null;
  faculty?: {
    id: number;
    facultyName: string;
    facultyHead: string;
  } | null;
  classes: {
    class: {
      id: number;
      name: string;
    };
  }[];
};

export default function StudentViewPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const role = useRole();

  const router = useRouter();

  useEffect(() => {
    axios
      .get("/api/Dashboard/student/view")
      .then((response) => {
        setStudents(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleDelete = async (id: number) => {
    const confirmDelete = confirm(
      "Are you sure you want to delete this student?"
    );

    if (!confirmDelete) return;

    await axios.delete("/api/Dashboard/student/view", {
      data: {
        id,
      },
    });

    const response = await axios.get("/api/Dashboard/student/view");
    setStudents(response.data);
  };

  const goToEditStudent = (id: number) => {
    router.push(`/Dashboard/Student/edit?id=${id}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <Sidebar />

      <main className="flex-1 p-10">
        <div className="bg-white rounded-xl shadow-md p-6 w-full max-w-4xl">
          <h2 className="text-2xl font-bold text-violet-800 mb-6">
            Students
          </h2>

          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-violet-800 text-white">
                <th className="p-3 rounded-tl-lg">ID</th>
                <th className="p-3">Name</th>
                <th className="p-3">Surname</th>
                <th className="p-3">GPA</th>
                <th className="p-3">Faculty</th>
                <th className="p-3">Class</th>

                {role === "admin" && (
                  <th className="p-3 rounded-tr-lg">Actions</th>
                )}
              </tr>
            </thead>

            <tbody>
              {students.map((student) => (
                <tr
                  key={student.id}
                  className="border-b hover:bg-violet-50 transition"
                >
                  <td className="p-3">{student.id}</td>

                  <td className="p-3">{student.name}</td>

                  <td className="p-3">{student.surname}</td>

                  <td className="p-3">{student.gpa ?? "No GPA"}</td>

                  <td className="p-3">
                    {student.faculty
                      ? student.faculty.facultyName
                      : "Not assigned"}
                  </td>

                  <td className="p-3">
                    {student.classes?.length > 0
                      ? student.classes[0].class.name
                      : "Not assigned"}
                  </td>

                  {role === "admin" && (
                    <td className="p-3">
                      <button
                        onClick={() => goToEditStudent(student.id)}
                        className="bg-yellow-400 text-white px-4 py-1 rounded-md hover:bg-yellow-500 transition"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(student.id)}
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