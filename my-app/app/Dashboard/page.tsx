
import Sidebar from "@/components/sidebar";
import Chart from "@/components/Chart";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 flex">
      <Sidebar />

      <main className="flex-1 p-6">
        <h2 className="text-2xl font-bold mb-4">Students per Class</h2>
        <Chart />
      </main>
    </div>
  );
}
