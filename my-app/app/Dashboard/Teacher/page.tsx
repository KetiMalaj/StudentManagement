"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import Footer from "@/components/footer";
import Header from "@/components/header";

export default function Teacher() {
    const [showForm, setShowForm] = useState(false);
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [teachers, setTeachers] = useState<{ id: number; name: string; surname: string }[]>([]);
    const [editingTeacherId, setEditingTeacherId] = useState<number | null>(null);
    

    useEffect(() => {
        axios
          .get("/api/teacher")
          .then((response) => {
            setTeachers(response.data);
          });
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (editingTeacherId) {
            await axios.put("/api/teacher", {
                id: editingTeacherId,
                name,
                surname,
            });
        } else {
            await axios.post("/api/teacher", {
                name,
                surname,
            });
        }

        const response = await axios.get("/api/teacher");
        setTeachers(response.data);

        setName("");
        setSurname("");
        setEditingTeacherId(null);
        setShowForm(false);
    };

    const handleEditTeacher = (teacher: { id: number; name: string; surname: string }) => {
        setName(teacher.name);
        setSurname(teacher.surname);
        setEditingTeacherId(teacher.id);
        setShowForm(true);
    };

    const handleDeleteTeacher = async (id: number) => {
        const confirmDelete = confirm("Are you sure you want to delete this teacher?");
        if (!confirmDelete) return;
        await axios.delete("/api/teacher", {
            data: { id },
        });
        const response = await axios.get("/api/teacher");
        setTeachers(response.data);
    };
     
   return (
  <div className="min-h-screen bg-gray-100 flex flex-col">
    <main className="flex-1 p-10">
      
        <Header
        addLabel="Add Teacher"
        onAddClick={() => setShowForm(true)}
         />
          {showForm && (
            <form
              onSubmit={handleSubmit}
              className="mt-5 flex flex-col gap-3 w-80"
            >
              <input
                placeholder="Name"
                className="border p-2 rounded"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <input
                placeholder="Surname"
                className="border p-2 rounded"
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
              />

              <button
                type="submit"
                className="bg-green-600 text-white px-4 py-2 rounded"
              >
                Save Teacher
              </button>
            </form>
          )}
      

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
                  onClick={() => handleEditTeacher(teacher)}
                  className="bg-yellow-400 text-white px-3 py-1 rounded"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDeleteTeacher(teacher.id)}
                  className="bg-red-700 text-white px-3 py-1 rounded ml-2"
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