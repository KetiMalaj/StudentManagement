"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "@/components/sidebar";
import { useRouter } from "next/navigation";

type Student = {
  id: number;
  name: string;
  surname: string;
  gpa?: number | null;
};

type StudentClass = {
  id: number;
  studentId: number;
  classId: number;
  student: Student;
};

type Teacher = {
  id: number;
  name: string;
  surname: string;
};

type ClassType = {
  id: number;
  name: string;
  teacherId: number;
  teacher?: Teacher;
  students: StudentClass[];
};

export default function ClassViewPage() {
  const [classes, setClasses] = useState<ClassType[]>([]);

  const router = useRouter();

  useEffect(() => {
    axios
      .get("/api/Dashboard/class/view")
      .then(function (response) {
        setClasses(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const handleDeleteClass = async (id: number) => {
    const confirmDelete = confirm("Are you sure you want to delete this class?");

    if (!confirmDelete) return;

    await axios.delete("/api/Dashboard/class/view", {
      data: {
        id,
      },
    });

    const response = await axios.get("/api/Dashboard/class/view");
    setClasses(response.data);
  };

  const goToEditClass = (id: number) => {
    router.push(`/Dashboard/class/edit?id=${id}`);
  };

  const goToShowClass = (id: number) => {
  router.push(`/Dashboard/class/show?id=${id}`);
};

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <Sidebar />

      <main className="flex-1 p-10">
  <div className="bg-white rounded-xl shadow-md p-6 w-full max-w-4xl">
    <h2 className="text-2xl font-bold text-violet-800 mb-6">
      Classes
    </h2>

    <table className="w-full text-left border-collapse">
      <thead>
        <tr className="bg-violet-800 text-white">
          <th className="p-3 rounded-tl-lg">ID</th>
          <th className="p-3">Name</th>
          <th className="p-3">Teacher</th>
          <th className="p-3">Average Gpa</th>
          <th className="p-3 ">Median Gpa</th>
          <th className="p-3 rounded-tr-lg">Actions</th>
        </tr>
      </thead>

      <tbody>
        {classes.map((classItem) => (
          <tr
            key={classItem.id}
            className="border-b hover:bg-violet-50 transition"
          >
            <td className="p-3">{classItem.id}</td>
            <td className="p-3">{classItem.name}</td>
            <td className="p-3">{classItem.teacher?.name}</td>
            <td className="p-3">
              {classItem.students.length > 0 ? (
                (classItem.students.reduce((sum, studentClass) => 
                  sum + (studentClass.student.gpa || 0), 0) / classItem.students.length).toFixed(2)
              ) : (
                "No students"
              )}
            </td>
            <td className="p-3">
              {classItem.students.length > 0 ? (
                 (() => {
                    const gpas = classItem.students
                      .map((item) => item.student.gpa)
                      .filter((gpa) => gpa !== null && gpa !== undefined)
                      .sort((a, b) => a - b);

                      if (gpas.length === 0) {
                        return "No GPA";
                      }

                        const middle = Math.floor(gpas.length / 2);

                        if (gpas.length % 2 === 1) {
                          return gpas[middle].toFixed(2);
                        }
                        return ((gpas[middle - 1] + gpas[middle]) / 2).toFixed(2);
                        })()
                      ) : (
                        "No GPA"
                      )}
            </td>
            <td className="p-3">
              <button
                onClick={() => goToShowClass(classItem.id)}
                className="bg-violet-700 text-white px-4 py-1 rounded-md hover:bg-violet-900 transition mr-2"
              >
                Show
              </button>

              <button
                onClick={() => goToEditClass(classItem.id)}
                className="bg-yellow-400 text-white px-4 py-1 rounded-md hover:bg-yellow-500 transition"
              >
                Edit
              </button>

              <button
                onClick={() => handleDeleteClass(classItem.id)}
                className="bg-red-600 text-white px-4 py-1 rounded-md hover:bg-red-700 transition ml-2"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</main>
    </div>
  );
}