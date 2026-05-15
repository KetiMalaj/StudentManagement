"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "@/components/sidebar";
import { useRouter } from "next/navigation";
import { useRole } from "@/app/lib/useRole";

type Dean = {
  id: number;
  name: string;
  surname: string;
};

export default function DeanViewPage() {
  const [deans, setDeans] = useState<Dean[]>([]);
  const role = useRole();

  const router = useRouter();

  useEffect(() => {
    axios
      .get("/api/Dashboard/dean/view")
      .then(function (response) {
        setDeans(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const handleDeleteDean = async (id: number) => {
    const confirmDelete = confirm("Are you sure you want to delete this dean?");

    if (!confirmDelete) return;

    await axios.delete("/api/Dashboard/dean/view", {
      data: {
        id,
      },
    });

    const response = await axios.get("/api/Dashboard/dean/view");
    setDeans(response.data);
  };

  const goToEditDean = (id: number) => {
    router.push(`/Dashboard/dean/edit?id=${id}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <Sidebar />

      <main className="flex-1 p-10">
        <div className="bg-white rounded-xl shadow-md p-6 w-full max-w-4xl">
          <h2 className="text-2xl font-bold text-violet-800 mb-6">
            Deans
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
              {deans.map((dean) => (
                <tr
                  key={dean.id}
                  className="border-b hover:bg-violet-50 transition"
                >
                  <td className="p-3">{dean.id}</td>
                  <td className="p-3">{dean.name}</td>
                  <td className="p-3">{dean.surname}</td>

                  {role === "admin" && (
                    <td className="p-3">
                      <button
                        onClick={() => goToEditDean(dean.id)}
                        className="bg-yellow-400 text-white px-4 py-1 rounded-md hover:bg-yellow-500 transition"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDeleteDean(dean.id)}
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