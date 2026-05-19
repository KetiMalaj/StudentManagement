
import Sidebar from "@/components/sidebar";
import Chart from "@/components/Chart";
import GpaChart from "@/components/gpachart";
import StudentPieChart from "@/components/PieChartComponent";
import SeedButton from "@/components/SeedButton";
import Summary from "@/components/summary";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 flex">
      <Sidebar />

      <main className="flex-1 p-6">
        
        <Summary />
        <h2 className="text-2xl font-bold mb-4">Students per Class</h2>
        <Chart />

        <h2 className="text-2xl font-bold mb-4 mt-6">Students per Class</h2>
        <StudentPieChart />

        <h2 className="text-2xl font-bold mb-4 mt-6">Average GPA per Class</h2>
        <GpaChart />
        <SeedButton />
      </main>
    </div>
  );
}
