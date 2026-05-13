"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import Sidebar from "@/components/sidebar";

type Teacher = {
  id: number;
  name: string;
  surname: string;
};

type Faculty = {
  id: number;
  facultyName: string;
  facultyHead: string;
};

type Student = {
  id: number;
  name: string;
  surname: string;
  gpa?: number | null;
  faculty?: Faculty | null;
};

type StudentClass = {
  studentId: number;
  classId: number;
  student: Student;
};

type ClassDetails = {
  id: number;
  name: string;
  teacherId: number;
  teacher: Teacher;
  students: StudentClass[];
};

export default function ShowClassPage() {
  const [classDetails, setClassDetails] = useState<ClassDetails | null>(null);

  const router = useRouter();
  const searchParams = useSearchParams();

  const id = searchParams.get("id");

  useEffect(() => {
    if (!id) return;

    axios
      .get(`/api/Dashboard/class/show?id=${id}`)
      .then((response) => {
        setClassDetails(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  if (!classDetails) {
    return (
      <div className="min-h-screen bg-gray-100 flex">
        <Sidebar />

        <main className="flex-1 p-10">
          <p>Loading class details...</p>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <Sidebar />

      <main className="flex-1 p-10">
        <button
          onClick={() => router.push("/Dashboard/class/view")}
          className="mb-6 bg-violet-800 text-white px-4 py-2 rounded-lg hover:bg-violet-900 transition"
        >
          Back
        </button>

        <div className="bg-white rounded-xl shadow-md p-6 w-full max-w-5xl">
          <h2 className="text-2xl font-bold text-violet-800 mb-2">
            {classDetails.name}
          </h2>

          <p className="text-gray-600 mb-8">
            Teacher: {classDetails.teacher.name} {classDetails.teacher.surname}
          </p>

          <h3 className="text-xl font-bold text-gray-800 mb-4">
            Students in this class
          </h3>

          {classDetails.students.length === 0 ? (
            <p className="text-gray-500">
              No students are assigned to this class yet.
            </p>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-violet-800 text-white">
                  <th className="p-3 rounded-tl-lg">ID</th>
                  <th className="p-3">Name</th>
                  <th className="p-3">Surname</th>
                  <th className="p-3">GPA</th>
                  <th className="p-3 rounded-tr-lg">Faculty</th>
                </tr>
              </thead>

              <tbody>
                {classDetails.students.map((item) => (
                  <tr
                    key={item.student.id}
                    className="border-b hover:bg-violet-50 transition"
                  >
                    <td className="p-3">{item.student.id}</td>
                    <td className="p-3">{item.student.name}</td>
                    <td className="p-3">{item.student.surname}</td>
                    <td className="p-3">
                      {item.student.gpa ?? "No GPA"}
                    </td>
                    <td className="p-3">
                      {item.student.faculty
                        ? item.student.faculty.facultyName
                        : "No faculty"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>
    </div>
  );
}