"use client";

import { useRouter } from "next/navigation";

export default function Sidebar() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    document.cookie = "token=; path=/; max-age=0";
    router.push("/auth/login");
  };

  return (
    <aside className="w-64 min-h-screen bg-white shadow-lg p-6">
      <h1 className="text-2xl font-bold text-violet-800 mb-10">
        University Dashboard
      </h1>

      <nav className="flex flex-col gap-4 text-gray-700">
        <button
          onClick={() => router.push("/Dashboard")}
          className="text-left hover:text-violet-800"
        >
          Dashboard
        </button>

        <p className="font-semibold mt-4">Show</p>

        <button
          onClick={() => router.push("/Dashboard/Student/view")}
          className="text-left pl-4 hover:text-violet-800"
        >
          Students
        </button>

        <button
          onClick={() => router.push("/Dashboard/dean/view")}
          className="text-left pl-4 hover:text-violet-800"
        >
          Deans
        </button>

        <button
          onClick={() => router.push("/Dashboard/Teacher/view")}
          className="text-left pl-4 hover:text-violet-800"
        >
          Teachers
        </button>

        <button
          onClick={() => router.push("/Dashboard/class/view")}
          className="text-left pl-4 hover:text-violet-800"
        >
          Classes
        </button>

        <p className="font-semibold mt-4">Add</p>

        <button
          onClick={() => router.push("/Dashboard/Student/add")}
          className="text-left pl-4 hover:text-violet-800"
        >
          Add Student
        </button>

        <button
          onClick={() => router.push("/Dashboard/dean/add")}
          className="text-left pl-4 hover:text-violet-800"
        >
          Add Dean
        </button>

        <button
          onClick={() => router.push("/Dashboard/Teacher/add")}
          className="text-left pl-4 hover:text-violet-800"
        >
          Add Teacher
        </button>

        <button
          onClick={() => router.push("/Dashboard/class/add")}
          className="text-left pl-4 hover:text-violet-800"
        >
          Add Class
        </button>

        <button
          onClick={handleLogout}
          className="text-left mt-8 text-red-600 hover:text-red-800"
        >
          Logout
        </button>
      </nav>
    </aside>
  );
}