"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";


export default function Home() {
  const [showDeanForm, setShowDeanForm] = useState(false);
  const [deanName, setDeanName] = useState("");
  const [deanSurname, setDeanSurname] = useState("");
  const [deans, setDeans] = useState<{ id: number; name: string; surname: string }[]>([]);
  const router = useRouter();

  useEffect(() => {
    axios.get("/api/dean")
      .then(function (response){
        setDeans(response.data);
      })
      .catch(function(error){
        console.log(error);
      });
  }, []);

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
  <div className="flex justify-between items-start">
    <div>
      <button
        onClick={() => setShowDeanForm(true)}
        className="bg-violet-800 text-white px-4 py-2 rounded"
      >
        Add Dean
      </button>

      {showDeanForm && (
        <form
          onSubmit={handleDeanSubmit}
          className="mt-5 flex flex-col gap-3 w-80"
        >
          <input
            placeholder="Name"
            className="border p-2 rounded"
            value={deanName}
            onChange={(e) => setDeanName(e.target.value)}
          />

          <input
            placeholder="Surname"
            className="border p-2 rounded"
            value={deanSurname}
            onChange={(e) => setDeanSurname(e.target.value)}
          />

          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Save Dean
          </button>
        </form>
      )}
    </div>
    <button
      onClick={handleLogout}
      className="bg-red-600 text-white px-4 py-2 rounded"
    >
      Logout
    </button>
  </div>

  <h2 className="text-xl font-bold mt-10 mb-4">Deans</h2>

  <table className="w-1/2 text-left">
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
  );
}