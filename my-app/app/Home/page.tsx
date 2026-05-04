"use client";
import { useRouter } from "next/navigation";
export default function Home() {

  const router = useRouter();  
  const goToStudents = () => {
    router.push("/Student");
  };
  const goToDeans = () => {
    router.push("/Dean");
  };

return (
   <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="relative flex flex-col m-6 space-y-8 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0">
          <div className="flex flex-col justify-center p-8 md:p-14">
            <h2 className="text-4xl font-bold text-violet-800 mb-3">Welcome</h2>
            <p className="font-light text-gray-500 mb-8">
              Select an option below to navigate to the respective section.
            </p>
            </div>
        <div className="flex flex-col gap-4">
         <button
                onClick={goToStudents}
                className="w-full bg-violet-800 text-white p-3 rounded-lg font-semibold hover:bg-white hover:text-violet-800 hover:border hover:border-violet-800 transition"
              >
                Students
              </button>

         <button
                onClick={goToDeans}
                className="w-full bg-violet-800 text-white p-3 rounded-lg font-semibold hover:bg-white hover:text-violet-800 hover:border hover:border-violet-800 transition"
              >
                Deans
              </button>
        </div>
      </div>
    </div>
  );
}