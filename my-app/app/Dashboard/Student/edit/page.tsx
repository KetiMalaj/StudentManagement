"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";

type Faculty = {
  id: number;
  facultyName: string;
  facultyHead: string;
};

type ClassType = {
  id: number;
  name: string;
};

export default function EditStudentPage() {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");

  const [facultyId, setFacultyId] = useState("");
  const [classId, setClassId] = useState("");

  const [faculties, setFaculties] = useState<Faculty[]>([]);
  const [classes, setClasses] = useState<ClassType[]>([]);

  const router = useRouter();
  const searchParams = useSearchParams();

  const id = searchParams.get("id");

  useEffect(() => {
    if (!id) return;

    axios.get(`/api/Dashboard/student/edit?id=${id}`).then((response) => {
      setName(response.data.name);
      setSurname(response.data.surname);

      if (response.data.facultyId) {
        setFacultyId(String(response.data.facultyId));
      }

      if (response.data.classes?.length > 0) {
        setClassId(String(response.data.classes[0].classId));
      }
    });

    axios.get("/api/Dashboard/faculty/view").then((response) => {
      setFaculties(response.data);
    });

    axios.get("/api/Dashboard/class/view").then((response) => {
      setClasses(response.data);
    });
  }, [id]);

  const handleEditStudent = async (e: React.FormEvent) => {
    e.preventDefault();

    await axios.put("/api/Dashboard/student/edit", {
      id,
      name,
      surname,
      facultyId,
      classId,
    });

    router.push("/Dashboard/Student/view");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-10">
      <div className="bg-white shadow-md rounded-2xl p-8 w-full max-w-2xl">
        <button
          onClick={() => router.push("/Dashboard/Student/view")}
          className="mb-8 bg-violet-800 text-white px-4 py-2 rounded-lg hover:bg-violet-900 transition"
        >
          Back
        </button>

        <h2 className="text-3xl font-bold text-violet-800 mb-2">
          Edit Student
        </h2>

        <p className="text-gray-500 mb-8">
          Input student details
        </p>

        <form onSubmit={handleEditStudent} className="flex flex-col gap-4">
          <label className="font-semibold">ID</label>
          <input
            className="border border-gray-300 p-3 rounded-lg bg-gray-100"
            value={id || ""}
            disabled
          />

          <label className="font-semibold">Name</label>
          <input
            placeholder="Name"
            className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <label className="font-semibold">Surname</label>
          <input
            placeholder="Surname"
            className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
            required
          />

          <label className="font-semibold">Assign to Faculty</label>
          <select
            className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
            value={facultyId}
            onChange={(e) => setFacultyId(e.target.value)}
          >
            <option value="">Select Faculty</option>

            {faculties.map((faculty) => (
              <option key={faculty.id} value={faculty.id}>
                {faculty.facultyName}
              </option>
            ))}
          </select>

          <label className="font-semibold">Class</label>
          <select
            className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
            value={classId}
            onChange={(e) => setClassId(e.target.value)}
          >
            <option value="">Select Class</option>

            {classes.map((classItem) => (
              <option key={classItem.id} value={classItem.id}>
                {classItem.name}
              </option>
            ))}
          </select>

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