"use client";
import axios from "axios";
import { useRouter } from "next/dist/client/components/navigation";
import { useEffect, useState } from "react";

export default function Teacher() {
    const [showForm, setShowForm] = useState(false);
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [teachers, setTeachers] = useState<{ id: number; name: string; surname: string }[]>([]);
    const router = useRouter();

    useEffect(() => {
        axios
          .get("/api/teacher")
          .then((response) => {
            setTeachers(response.data);
          });
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await axios.post("/api/teacher", {
            name,
            surname,
        });

        const response = await axios.get("/api/teacher");
        setTeachers(response.data);

        setName("");
        setSurname("");
        setShowForm(false);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        router.push('/auth/login');
    }
    const HomeRedirect = () => {
      router.push('/Home');
    }
     
    return (
    <div className="p-10">
  <div className="flex justify-between items-start">
    {/* LEFT SIDE */}
    <div>
      <button
        onClick={() => setShowForm(true)}
        className="bg-violet-800 text-white px-4 py-2 rounded"
      >
        Add Teacher
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
            Save Teacher
          </button>
        </form>
      )}
    </div>
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

  <h2 className="text-xl font-bold mt-10 mb-4">Teachers</h2>

  <table className="w-1/2 text-left">
    <thead>
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Surname</th>
      </tr>
    </thead>

    <tbody>
      {teachers.map((teacher) => (
        <tr key={teacher.id}>
          <td>{teacher.id}</td>
          <td>{teacher.name}</td>
          <td>{teacher.surname}</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
  );
}