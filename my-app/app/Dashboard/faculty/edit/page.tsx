"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getFacultyById, editFaculty } from "@/app/services/facultyService";

export default function EditFacultyPage() {
  const [facultyName, setFacultyName] = useState("");
  const [facultyHead, setFacultyHead] = useState("");

  const router = useRouter();
  const searchParams = useSearchParams();

  const id = searchParams.get("id");

  useEffect(() => {
    if (!id) return;

    getFacultyById(id)
      .then((data) => {
        setFacultyName(data.facultyName);
        setFacultyHead(data.facultyHead);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  const handleEditFaculty = async (e: React.FormEvent) => {
    e.preventDefault();

    await editFaculty(id, { facultyName, facultyHead });

    router.push("/Dashboard/faculty/view");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-10">
      <div className="bg-white shadow-md rounded-2xl p-8 w-full max-w-md">
        <button
          onClick={() => router.push("/Dashboard/faculty/view")}
          className="mb-8 bg-violet-800 text-white px-4 py-2 rounded-lg hover:bg-violet-900 transition"
        >
          Back
        </button>

        <h2 className="text-3xl font-bold text-violet-800 mb-2">
          Edit Faculty
        </h2>

        <p className="text-gray-500 mb-8">
          Update the faculty information below.
        </p>

        <form onSubmit={handleEditFaculty} className="flex flex-col gap-4">
          <input
            placeholder="Faculty Name"
            className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
            value={facultyName}
            onChange={(e) => setFacultyName(e.target.value)}
            required
          />

          <input
            placeholder="Faculty Head"
            className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
            value={facultyHead}
            onChange={(e) => setFacultyHead(e.target.value)}
            required
          />

          <button
            type="submit"
            className="bg-violet-800 text-white p-3 rounded-lg font-semibold hover:bg-violet-900 transition"
          >
            Update Faculty
          </button>
        </form>
      </div>
    </div>
  );
}