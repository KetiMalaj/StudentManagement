"use client";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import Footer from "@/components/footer";
import Header from "@/components/header";

export default function DeanClass() {
    const [showForm, setShowForm] = useState(false);
    const [name, setName] = useState("");
    const [teacherId, setTeacherId] = useState<number | null>(null);
    const [editingClassId, setEditingClassId] = useState<number | null>(null);
    const [students, setStudents] = useState<{ id: number; name: string; surname: string }[]>([]);
    const [selectedStudents, setSelectedStudents] = useState<number[]>([]);
    const [classes, setClasses] = useState< { id: number; name: string; teacherId: number }[] >([]);


    useEffect(() => {
        axios
            .get("/api/Dashboard/dean/classes")
            .then((response) => {
                setClasses(response.data);
            });

            axios.get("/api/Dashboard/dean/students").then((response) => {
                setStudents(response.data);
            });
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (editingClassId) {
            await axios.put("/api/Dashboard/dean/classes", {
                id: editingClassId,
                name,
                teacherId,
                students: selectedStudents,
            });
        } else {
            await axios.post("/api/Dashboard/dean/classes", {
                name,
                teacherId,
                students: selectedStudents,
            });
        }

        const response = await axios.get("/api/Dashboard/dean/classes");

        setClasses(response.data);
        setName("");
        setTeacherId(null);
        setEditingClassId(null);
        setShowForm(false);
        setSelectedStudents([]);
    };

    const handleEditClass = (schoolClass: { id: number; name: string; teacherId: number }) => {
        setName(schoolClass.name);
        setTeacherId(schoolClass.teacherId);
        setEditingClassId(schoolClass.id);
        setShowForm(true);
    }

    const handleDeleteClass = async (id: number) => {
        const confirmDelete = confirm("Are you sure you want to delete this class?");
        if (!confirmDelete) return;
        await axios.delete("/api/Dashboard/dean/classes", {
            data: { id },
        });
        const response = await axios.get("/api/Dashboard/dean/classes");
        setClasses(response.data);
    }

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
            <main className="flex-1 p-10">
              
                <Header
                addLabel="Add Class"
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
                        placeholder="Teacher ID"
                        className="border p-2 rounded"
                        value={teacherId ?? ""}
                        onChange={(e) => setTeacherId(Number(e.target.value))}
                      />


                      {students.map((student) => (
                        <label key={student.id} className="flex gap-2">
                          <input
                           type="checkbox"
                           checked={selectedStudents.includes(student.id)}
                          onChange={(e) => {
                                if (e.target.checked) {
                                setSelectedStudents([...selectedStudents, student.id]);
                                } else {
                                setSelectedStudents(
                                selectedStudents.filter((id) => id !== student.id));
                                }
                                }}
                                 />
                               {student.name} {student.surname}
                        </label>
                     ))}

  
        
                      <button
                        type="submit"
                        className="bg-green-600 text-white px-4 py-2 rounded"
                      >
                        Save Class
                      </button>
                    </form>
                  )}
              
        
              <h2 className="text-xl font-bold mt-10 mb-4">Classes</h2>
        
              <table className="w-1/2 text-left">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Teacher ID</th>
                    <th>Actions</th>
                  </tr>
                </thead>
        
                <tbody>
                  {classes.map((schoolClass) => (
                    <tr key={schoolClass.id}>
                      <td>{schoolClass.id}</td>
                      <td>{schoolClass.name}</td>
                      <td>{schoolClass.teacherId}</td>
                      <td>
                        <button
                          onClick={() => handleEditClass(schoolClass)}
                          className="bg-yellow-400 text-white px-3 py-1 rounded"
                        >
                          Edit
                        </button>
        
                        <button
                          onClick={() => handleDeleteClass(schoolClass.id)}
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