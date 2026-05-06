"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

type HeaderProps = {
    addLabel?: string;
    onAddClick?: () => void;
}

export default function Header({ addLabel, onAddClick }: HeaderProps) {
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("token");
        
        if (!token) {
            router.push("/auth/login");
        }

    }, [router]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
        router.push("/auth/login");
    }

    const homeRedirect = () => {
        router.push("/Dashboard");
    }

    return (
    <div className="p-10">
  <div className="flex justify-between items-start">
     {addLabel && (
        <button onClick={onAddClick}
        className="bg-violet-800 text-white px-4 py-2 rounded">
          {addLabel}
        </button>
     )}
    <button
      onClick={homeRedirect}
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
  );
}