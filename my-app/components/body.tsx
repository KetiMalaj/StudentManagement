"use client";
import { useRouter } from "next/navigation";
function Body() {

  const router = useRouter();  

  const goToStudents = () => {
    router.push("/Dashboard/Student/view");
  };
  const goToDeans = () => {
    router.push("/Dashboard/Dean/view");
  };
  const goToTeachers = () => {
    router.push("/Dashboard/Teacher/view");
  };
  const goToClasses = () => {
    router.push("/Dashboard/Dean/classes");
  };

return (
   <div className="flex items-center justify-center flex-1 bg-gray-100">
        <div className="flex flex-col items-center m-6 p-10 space-y-8 bg-white shadow-2xl rounded-2xl">
          <div className="flex flex-col justify-center p-8 md:p-14">
            <h2 className="text-4xl font-bold text-violet-800 mb-3">Welcome</h2>
            <p className="font-light text-gray-500 mb-8">
              Select an option below to navigate to the respective section.
            </p>
            </div>
            <div className="flex flex-col gap-4 w-full sm:w-xs">
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
        <button
                onClick={goToTeachers}
                className="w-full bg-violet-800 text-white p-3 rounded-lg font-semibold hover:bg-white hover:text-violet-800 hover:border hover:border-violet-800 transition"
              >
                Teachers
              </button>
        <button
                onClick={goToClasses}
                className="w-full bg-violet-800 text-white p-3 rounded-lg font-semibold hover:bg-white hover:text-violet-800 hover:border hover:border-violet-800 transition"
              >
                Classes
              </button>
        </div>
      </div>
    </div>
  );
}

export default Body;