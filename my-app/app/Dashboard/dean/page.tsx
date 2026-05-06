"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Footer from "@/components/footer";
import Header from "@/components/header";


export default function Home() {
  const [showDeanForm, setShowDeanForm] = useState(false);
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [deans, setDeans] = useState<{ id: number; name: string; surname: string }[]>([]);
  const [editingDeanId, setEditingDeanId] = useState<number | null>(null);
  
 

  useEffect(() => {
    axios.get("/api/Dashboard/dean")
      .then(function (response){
        setDeans(response.data);
      })
      .catch(function(error){
        console.log(error);
      });
  }, []);

  const handleDeanSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (editingDeanId) {
      await axios.put("/api/Dashboard/dean", {
        id: editingDeanId,
        name,
        surname,
      });
    } else {
      await axios.post("/api/Dashboard/dean", {
        name,
        surname,
      });
    }

    const response = await axios.get("/api/Dashboard/dean");
    setDeans(response.data);

    setName("");
    setSurname("");
    setEditingDeanId(null);
    setShowDeanForm(false);
  };


  const handleEditDean = (dean: { id: number; name: string; surname: string }) => {
    setName(dean.name);
    setSurname(dean.surname);
    setEditingDeanId(dean.id);
    setShowDeanForm(true);
  }; 

  const handleDeleteDean = async (id: number) => {
    const confirmDelete = confirm("Are you sure you want to delete this dean?");
    if (!confirmDelete) return;
    await axios.delete("/api/Dashboard/dean", {
      data: { id },
    });
    const response = await axios.get("/api/Dashboard/dean");
    setDeans(response.data);
  };


  
    return (
  <div className="min-h-screen bg-gray-100 flex flex-col">
    <main className="flex-1 p-10">

      <Header 
      addLabel= "Add Dean"
      onAddClick={() => setShowDeanForm(true)}
       />
          {showDeanForm && (
            <form
              onSubmit={handleDeanSubmit}
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
                Save Dean
              </button>
            </form>
          )}
        

      <h2 className="text-xl font-bold mt-10 mb-4">Deans</h2>

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
          {deans.map((dean) => (
            <tr key={dean.id}>
              <td>{dean.id}</td>
              <td>{dean.name}</td>
              <td>{dean.surname}</td>
              <td>
                <button
                  onClick={() => handleEditDean(dean)}
                  className="bg-yellow-400 text-white px-3 py-1 rounded"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDeleteDean(dean.id)}
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