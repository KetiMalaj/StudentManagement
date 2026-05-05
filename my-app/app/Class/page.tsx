"use-client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Home() {
    const [showForm, setShowForm] = useState(false);
    const [name, setName] = useState("");
    const router = useRouter();
    const [classes, setClasses] = useState<{ id: number; name: string }[]>([]);
    const [editingClassId, setEditingClassId] = useState<number | null>(null);

    useEffect(() => {
        axios.get("/api/class")
        .then(function (response) {
            setClasses(response.data);
        })
        .catch(function (error) {
            console.log(error);
        })
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (editingClassId) {
            await axios.put("/api/class", {
                id: editingClassId,
                name,
            });

        } else {
            await axios.post("/api/class", {
                name,
            });
        }

        const response = await axios.get("/api/class");
        setClasses(response.data);

        setName("");
        setEditingClassId(null);
        setShowForm(false);
    };

    const handleEditClass = (classItem: { id: number; name: string }) => {
        setName(classItem.name);
        setEditingClassId(classItem.id);
        setShowForm(true);
    };

    const handleDeleteClass = async (id: number) => {
        const confirmDelete = confirm("Are you sure you want to delete this class?");
        if (!confirmDelete) return;
        await axios.delete("/api/class", {
            data: { id },
        });
        const response = await axios.get("/api/class");
        setClasses(response.data);
    }

    const handleLogout = () => {
        localStorage.removeItem('token');
        document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
        router.push('/auth/login');
    }

    const HomeRedirect = () => {
        router.push('/Home');
    }
}