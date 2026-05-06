"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Footer from "@/components/footer";

export default function Home() {
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const router = useRouter();
  const [students, setStudents] = useState<{ id: number; name: string; surname: string }[]>([]);
  const [editingStudentId, setEditingStudentId] = useState<number | null>(null);
  
  useEffect(() => {
  axios
    .get("/api/student")
    .then(function (response){
     setStudents(response.data);
   })
    .catch(function(error){
     console.log(error);
    });
   }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (editingStudentId) {
      await axios.put("/api/student", {
        id: editingStudentId,
        name,
        surname,
      });
    } else {
      await axios.post("/api/student", {
        name,
        surname,
      });
    }
    
    const response = await axios.get("/api/student");
    setStudents(response.data);

    setName("");
    setSurname("");
    setEditingStudentId(null);
    setShowForm(false);
  };
    const handleEditStudent = (student: { id: number; name: string; surname: string }) => {
    setName(student.name);
    setSurname(student.surname);
    setEditingStudentId(student.id);
    setShowForm(true);
  };

  const handleDeleteStudent = async (id: number) => {
    const confirmDelete = confirm("Are you sure you want to delete this student?");
    if (!confirmDelete) return;
    await axios.delete("/api/student", {
      data: { id },
    });
    const response = await axios.get("/api/student");
    setStudents(response.data);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    router.push('/auth/login');
  }

  const HomeRedirect = () => {
    router.push('/Home');
  }
  
  return (
  <div className="min-h-screen bg-gray-100 flex flex-col">
    <main className="flex-1 p-10">
      <div className="flex justify-between items-start">
        <div>
          <button
            onClick={() => setShowForm(true)}
            className="bg-violet-800 text-white px-4 py-2 rounded"
          >
            Add Student
          </button>

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
                Save Student
              </button>
            </form>
          )}
        </div>

        <div className="flex gap-3">
          <button
            onClick={HomeRedirect}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Home
          </button>

          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-2 rounded"
          >
            Logout
          </button>
        </div>
      </div>

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
                  onClick={() => handleEditStudent(student)}
                  className="bg-yellow-400 text-white px-3 py-1 rounded"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDeleteStudent(student.id)}
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