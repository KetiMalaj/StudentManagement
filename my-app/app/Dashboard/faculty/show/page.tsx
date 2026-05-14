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

type Student = {
  id: number;
  name: string;
  surname: string;
  gpa?: number | null;
};

type StudentClass = {
  studentId: number;
  classId: number;
  student: Student;
};

type ClassType = {
  id: number;
  name: string;
  teacher?: Teacher;
  students: StudentClass[];
};

type Faculty = {
  id: number;
  facultyName: string;
  facultyHead: string;
  classes: ClassType[];
};

export default function ShowFacultyPage() {
  const [faculty, setFaculty] = useState<Faculty | null>(null);

  const router = useRouter();
  const searchParams = useSearchParams();

  const id = searchParams.get("id");

  useEffect(() => {
    if (!id) return;

    axios
      .get(`/api/Dashboard/faculty/show?id=${id}`)
      .then((response) => {
        setFaculty(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  if (!faculty) {
    return (
      <div className="min-h-screen bg-gray-100 flex">
        <Sidebar />

        <main className="flex-1 p-10">
          <p>Loading faculty details...</p>
        </main>
      </div>
    );
  }
  

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <Sidebar />

      <main className="flex-1 p-10">
        <button
          onClick={() => router.push("/Dashboard/faculty/view")}
          className="mb-6 bg-violet-800 text-white px-4 py-2 rounded-lg hover:bg-violet-900 transition"
        >
          Back
        </button>

        <div className="bg-white rounded-xl shadow-md p-6 w-full max-w-5xl">
          <h2 className="text-2xl font-bold text-violet-800 mb-2">
            {faculty.facultyName}
          </h2>

          <p className="text-gray-600 mb-8">
            Faculty Head: {faculty.facultyHead}
          </p>

          <h3 className="text-xl font-bold text-gray-800 mb-4">
            Classes in this faculty
          </h3>

          {faculty.classes.length === 0 ? (
            <p className="text-gray-500">
              No classes are assigned to this faculty yet.
            </p>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-violet-800 text-white">
                  <th className="p-3 rounded-tl-lg">ID</th>
                  <th className="p-3">Class Name</th>
                  <th className="p-3">Teacher</th>
                  <th className="p-3">Number of Students</th>
                  <th className="p-3">Median GPA</th>
                  <th className="p-3 rounded-tr-lg">Average GPA</th>
                </tr>
              </thead>

              <tbody>
                {faculty.classes.map((classItem) => (
                  <tr
                    key={classItem.id}
                    className="border-b hover:bg-violet-50 transition"
                  >
                    <td className="p-3">{classItem.id}</td>

                    <td className="p-3">{classItem.name}</td>

                    <td className="p-3">
                      {classItem.teacher
                        ? `${classItem.teacher.name} ${classItem.teacher.surname}`
                        : "No teacher"}
                    </td>

                    <td className="p-3">
                        {classItem.students.length}
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
                      {classItem.students.length > 0 ? (
                          (
                            classItem.students.reduce(
                              (sum, studentClass) =>
                                sum + (studentClass.student.gpa || 0),
                              0
                            ) / classItem.students.length
                          ).toFixed(2)
                      ) :  "No students"
                      }
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