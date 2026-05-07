"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Footer from "../../components/footer";


type Teacher = {
    id: number;
    name: string;
    surname: string;
};
type classType = {
    id: number;
    name: string; 
    teacherId: number;
    teacher?: Teacher;
}; 
        
export default function ClassTeacher() {
    const [showForm, setShowForm] = useState(false);
    const [name, setName] = useState("");
    const [teacherId, setTeacherId] = useState("");

    const [classes, setClasses] = useState<classType[]>([]);
    const [teachers, setTeachers] = useState<Teacher[]>([]);

    const [editingClassId, setEditingClassId] = useState<number | null>(null);
    const router = useRouter();


    useEffect(() => {
        axios.get("/api/classTeacher")
            .then((response) => {
                setClasses(response.data);
            });
        axios.get("/api/teacher")
            .then((response) => {
                setTeachers(response.data);
            });
    }, []);

    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (editingClassId) {
            await axios.put("/api/classTeacher", {
                id: editingClassId,
                name,
                teacherId,
            });
        } else {
            await axios.post("/api/classTeacher", {
                name,
                teacherId,
            });
        }
        const response = await axios.get("/api/classTeacher");
        setClasses(response.data);

        setName("");
        setTeacherId("");
        setEditingClassId(null);
        setShowForm(false);
    };

    const handleEditClass = (classItem: classType) => {
        setName(classItem.name);
        setTeacherId(String(classItem.teacherId));
        setEditingClassId(classItem.id);
        setShowForm(true);
    };

    const handleDeleteClass = async (id: number) => {
        const confirmDelete = confirm("Are you sure you want to delete this class?");
        if (!confirmDelete) return;
        await axios.delete("/api/classTeacher", {
            data: { id },
        });
        const response = await axios.get("/api/classTeacher");
        setClasses(response.data);
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
            onClick={() => {
              setShowForm(true);
              setEditingClassId(null);
              setName("");
              setTeacherId("");
            }}
            className="bg-violet-800 text-white px-4 py-2 rounded"
          >
            Add Class
          </button>

          {showForm && (
            <form onSubmit={handleSubmit} className="mt-5 space-y-4">
              <input
                placeholder="Class Name"
                className="border p-2"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />

              <select
                className="border p-2 ml-2"
                value={teacherId}
                onChange={(e) => setTeacherId(e.target.value)}
                required
              >
                <option value="">Select Teacher</option>

                {teachers.map((teacher) => (
                  <option key={teacher.id} value={teacher.id}>
                    {teacher.name} {teacher.surname}
                  </option>
                ))}
              </select>

              <button
                type="submit"
                className="bg-green-600 text-white px-4 py-2 rounded ml-2"
              >
                {editingClassId ? "Update" : "Save"}
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
            className="bg-red-700 text-white px-4 py-2 rounded"
          >
            Logout
          </button>
        </div>
      </div>

      <h2 className="text-2xl font-bold mt-10 mb-4">Classes</h2>

      <table border={1} style={{ width: "67%", textAlign: "left" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Class Name</th>
            <th>Teacher</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {classes.map((classItem) => (
            <tr key={classItem.id}>
              <td>{classItem.id}</td>
              <td>{classItem.name}</td>
              <td>
                {classItem.teacher
                  ? `${classItem.teacher.name} ${classItem.teacher.surname}`
                  : classItem.teacherId}
              </td>
              <td>
                <button
                  onClick={() => handleEditClass(classItem)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDeleteClass(classItem.id)}
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