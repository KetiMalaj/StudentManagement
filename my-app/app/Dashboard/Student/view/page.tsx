"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Footer from "@/components/footer";
import Header from "@/components/header";
import { useRouter } from "next/dist/client/components/navigation";

type Student = {
  id: number;
  name: string;
  surname: string;
};

export default function View() {
    const [students, setStudents] = useState<Student[]>([]);
    const router = useRouter();

    useEffect(() => {
        axios
            .get("/api/Dashboard/student/view")
            .then((response) => {
                setStudents(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const handleDelete = async (id: number) => {
        const confirmDelete = confirm("Are you sure you want to delete this student?");
        if (!confirmDelete) return;

        await axios.delete("/api/Dashboard/student/view", {
            data: { id },
        });

        const response = await axios.get("/api/Dashboard/student/view");
        setStudents(response.data);
    }
    
    const gotoaddstudent = () => {
        router.push("/Dashboard/Student/add");
    }
    const gotoeditstudent = (id: number) => {
        router.push(`/Dashboard/Student/edit/${id}`);
    }
    return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <main className="flex-1 p-10">
        <Header
          addLabel="Add Student"
          onAddClick={gotoaddstudent}
        />

        <h2 className="text-xl font-bold mt-10 mb-4">Students</h2>

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
            {students.map((student) => (
              <tr key={student.id}>
                <td>{student.id}</td>
                <td>{student.name}</td>
                <td>{student.surname}</td>
                <td>
                  <button
                    onClick={() => gotoeditstudent(student.id)}
                    className="bg-yellow-400 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(student.id)}
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