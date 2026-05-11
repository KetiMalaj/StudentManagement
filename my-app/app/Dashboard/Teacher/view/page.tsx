"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Footer from "@/components/footer";
import Header from "@/components/header";
import { useRouter } from "next/dist/client/components/navigation";

type Teacher = {
  id: number;
  name: string;
  surname: string;
};

export default function View() {
    const [teachers, setTeachers] = useState<Teacher[]>([]);
    const router = useRouter();

    useEffect(() => {
        axios
            .get("/api/Dashboard/teacher/view")
            .then((response) => {
                setTeachers(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const handleDelete = async (id: number) => {
        const confirmDelete = confirm("Are you sure you want to delete this teacher?");
        if (!confirmDelete) return;

        await axios.delete("/api/Dashboard/teacher/view", {
            data: { id },
        });

        const response = await axios.get("/api/Dashboard/teacher/view");
        setTeachers(response.data);
    }

    const gotoaddteacher = () => {
                router.push("/Dashboard/Teacher/add");
    }
    const gotoeditteacher = (id: number) => {
            router.push(`/Dashboard/Teacher/edit?id=${id}`);
    }
    return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <main className="flex-1 p-10">
        <Header
          addLabel="Add Teacher"
          onAddClick={gotoaddteacher}
        />

        <h2 className="text-xl font-bold mt-10 mb-4">Teachers</h2>

        <table className="w-1/2 text-left">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Surname</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {teachers.map((teacher) => (
              <tr key={teacher.id}>
                <td>{teacher.id}</td>
                <td>{teacher.name}</td>
                <td>{teacher.surname}</td>
                <td>
                  <button
                    onClick={() => gotoeditteacher(teacher.id)}
                    className="bg-yellow-400 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                        onClick={() => handleDelete(teacher.id)}
                    className="bg-red-600 text-white px-3 py-1 rounded ml-2"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>

      <Footer />
    </div>
  );
}
