"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Sidebar() {
  const router = useRouter();
  const [role, setRole] = useState("");

  useEffect(() => {
    const savedRole = localStorage.getItem("role");
    setRole(savedRole || "");
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");

    document.cookie = "token=; path=/; max-age=0";

    router.push("/auth/login");
  };

  return (
    <aside className="w-64 min-h-screen bg-white text-violet-900 p-6 shadow-md">
      <h1 className="text-2xl font-bold mb-10 text-violet-800">
        UniHub
      </h1>

      <nav className="flex flex-col gap-4">
        <button
          onClick={() => router.push("/Dashboard")}
          className="text-left font-medium hover:text-violet-700 transition"
        >
          Dashboard
        </button>

        <p className="font-semibold mt-4 text-violet-600">
          View
        </p>

        <button
          onClick={() => router.push("/Dashboard/Student/view")}
          className="text-left pl-4 hover:text-violet-700 transition"
        >
          Students
        </button>

        <button
          onClick={() => router.push("/Dashboard/dean/view")}
          className="text-left pl-4 hover:text-violet-700 transition"
        >
          Deans
        </button>

        <button
          onClick={() => router.push("/Dashboard/Teacher/view")}
          className="text-left pl-4 hover:text-violet-700 transition"
        >
          Teachers
        </button>

        <button
          onClick={() => router.push("/Dashboard/class/view")}
          className="text-left pl-4 hover:text-violet-700 transition"
        >
          Classes
        </button>

        <button
          onClick={() => router.push("/Dashboard/faculty/view")}
          className="text-left pl-4 hover:text-violet-700 transition"
        >
          Faculties
        </button>

        {role === "admin" && (
          <>
            <p className="font-semibold mt-4 text-violet-600">
              Add
            </p>

            <button
              onClick={() => router.push("/Dashboard/Student/add")}
              className="text-left pl-4 hover:text-violet-700 transition"
            >
              Add Student
            </button>

            <button
              onClick={() => router.push("/Dashboard/dean/add")}
              className="text-left pl-4 hover:text-violet-700 transition"
            >
              Add Dean
            </button>

            <button
              onClick={() => router.push("/Dashboard/teacher/add")}
              className="text-left pl-4 hover:text-violet-700 transition"
            >
              Add Teacher
            </button>

            <button
              onClick={() => router.push("/Dashboard/class/add")}
              className="text-left pl-4 hover:text-violet-700 transition"
            >
              Add Class
            </button>

            <button
              onClick={() => router.push("/Dashboard/faculty/add")}
              className="text-left pl-4 hover:text-violet-700 transition"
            >
              Add Faculty
            </button>
          </>
        )}

        <button
          onClick={handleLogout}
          className="text-left mt-8 text-red-600 hover:text-red-800 transition"
        >
          Logout
        </button>
      </nav>
    </aside>
  );
}