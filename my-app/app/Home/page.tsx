"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Home() {
  //student
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const router = useRouter();
  const [students, setStudents] = useState<{ id: number; name: string; surname: string }[]>([]);
  //dean
  const [showDeanForm, setShowDeanForm] = useState(false);
  const [deanName, setDeanName] = useState("");
  const [deanSurname, setDeanSurname] = useState("");
  const [deans, setDeans] = useState<{ id: number; name: string; surname: string }[]>([]);

  useEffect(() => {
  axios
    .get("/api/student")
    .then(function (response){
     setStudents(response.data);
   })
    .catch(function(error){
     console.log(error);
    });
  axios.get("/api/dean")
    .then(function (response){
     setDeans(response.data);
   })
    .catch(function(error){
     console.log(error);
     }
    )
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await axios.post("/api/student", {
      name,
      surname,
    });

    const response = await axios.get("/api/student");
    setStudents(response.data);

    setName("");
    setSurname("");
    setShowForm(false);
  };

  const handleDeanSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await axios.post("/api/dean", {
      name: deanName,
      surname: deanSurname,
    });

    const response = await axios.get("/api/dean");
    setDeans(response.data);

    setDeanName("");
    setDeanSurname("");
    setShowDeanForm(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/auth/login');
  }

  return (
    <div className="p-10">
      <div className="flex justify-between items-center">
      <button
        onClick={() => setShowForm(true)}
        className="bg-violet-800 text-white px-4 py-2 rounded"
      >
        Add Student
      </button>
      <button
        onClick={() => setShowDeanForm(true)}
        className="bg-blue-800 text-white px-4 py-2 rounded"
      >
        Add Dean
      </button>
      {showDeanForm && (
        <form onSubmit={handleDeanSubmit} className="mt-5 space-y-4">
          <input
            placeholder="Dean Name"
            className="border p-2"
            value={deanName}
            onChange={(e) => setDeanName(e.target.value)}
          />
          <input
            placeholder="Dean Surname"
            className="border p-2"
            value={deanSurname}
            onChange={(e) => setDeanSurname(e.target.value)}
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Save Dean
          </button>
        </form>
      )}
      {showForm && (
        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <input
            placeholder="Name"
            className="border p-2"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            placeholder="Surname"
            className="border p-2"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
          />

          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Save
          </button>
        </form>
      )}
      <button
        onClick={handleLogout}
        className="bg-red-600 text-white px-4 py-2 rounded mt-5"
      >
        Logout
      </button>
      </div>
      <div className="mt-8 flex gap-10 items-start">
  {/* STUDENT TABLE - LEFT */}
  <div className="w-1/2">
    <h2 className="text-xl font-bold mb-3">Students</h2>

    <table className="w-full text-left">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Surname</th>
        </tr>
      </thead>

      <tbody>
        {students.map((student) => (
          <tr key={student.id}>
            <td>{student.id}</td>
            <td>{student.name}</td>
            <td>{student.surname}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>

  {/* DEAN TABLE - RIGHT */}
  <div className="w-1/2">
    <h2 className="text-xl font-bold mb-3">Deans</h2>

    <table className="w-full text-left">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Surname</th>
        </tr>
      </thead>

      <tbody>
        {deans.map((dean) => (
          <tr key={dean.id}>
            <td>{dean.id}</td>
            <td>{dean.name}</td>
            <td>{dean.surname}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>
</div>
  );
}