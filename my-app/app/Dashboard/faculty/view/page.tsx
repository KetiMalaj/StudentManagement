"use client";

import { useState, useEffect } from "react";
import Sidebar from "@/components/sidebar";
import { useRouter } from "next/navigation";
import { useRole } from "@/app/lib/useRole";
import { getFaculties, deleteFaculty } from "@/app/services/facultyService";

type Faculty = {
  id: number;
  facultyName: string;
  facultyHead: string;
};

export default function FacultyViewPage() {
  const [faculties, setFaculties] = useState<Faculty[]>([]);
  const role = useRole();

  const router = useRouter();

  useEffect(() => {
    getFaculties()
      .then((data) => setFaculties(data))
      .catch((error) => console.log(error));
  }, []);

  const handleDeleteFaculty = async (id: number) => {
    const confirmDelete = confirm(
      "Are you sure you want to delete this faculty?"
    );

    if (!confirmDelete) return;

    await deleteFaculty(id);
    const data = await getFaculties();
    setFaculties(data);
  };

  const goToAddFaculty = () => {
    router.push("/Dashboard/faculty/add");
  };

  const goToEditFaculty = (id: number) => {
    router.push(`/Dashboard/faculty/edit?id=${id}`);
  };

  const goToShowFaculty = (id: number) => {
    router.push(`/Dashboard/faculty/show?id=${id}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <Sidebar />

      <main className="flex-1 p-10">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-2xl font-bold text-gray-800">
            Faculties
          </h2>

          {role === "admin" && (
            <button
              onClick={goToAddFaculty}
              className="bg-violet-800 text-white px-4 py-2 rounded"
            >
              Add Faculty
            </button>
          )}
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 w-full max-w-4xl">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-violet-800 text-white">
                <th className="p-3 rounded-tl-lg">ID</th>
                <th className="p-3">Faculty Name</th>
                <th className="p-3">Faculty Head</th>
                <th className="p-3 rounded-tr-lg">Actions</th>
              </tr>
            </thead>

            <tbody>
              {faculties.map((faculty) => (
                <tr
                  key={faculty.id}
                  className="border-b hover:bg-violet-50 transition"
                >
                  <td className="p-3">{faculty.id}</td>
                  <td className="p-3">{faculty.facultyName}</td>
                  <td className="p-3">{faculty.facultyHead}</td>

                  <td className="p-3">
                    <button
                      onClick={() => goToShowFaculty(faculty.id)}
                      className="bg-violet-800 text-white px-4 py-1 rounded-md hover:bg-violet-900 transition"
                    >
                      Show
                    </button>

                    {role === "admin" && (
                      <>
                        <button
                          onClick={() => goToEditFaculty(faculty.id)}
                          className="bg-yellow-400 text-white px-4 py-1 rounded-md hover:bg-yellow-500 transition ml-2"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => handleDeleteFaculty(faculty.id)}
                          className="bg-red-600 text-white px-4 py-1 rounded-md hover:bg-red-700 transition ml-2"
                        >
                          Delete
                        </button>
                      </>
                    )}
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