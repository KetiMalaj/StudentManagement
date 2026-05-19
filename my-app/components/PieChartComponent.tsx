"use client";

import { useEffect, useState } from "react";
import { PieChart } from "@mui/x-charts/PieChart";

export default function StudentPieChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("/api/Dashboard/chart")
      .then((res) => res.json())
      .then((result) => setData(result));
  }, []);

  const pieData = data.map((item: { class: string; students: number }, index: number) => ({
    id: index,
    value: item.students,
    label: item.class,
  }));

  return (
    <div className="w-full bg-white rounded-2xl p-4">
      <h3 className="text-lg font-semibold mb-2"></h3>
      {pieData.length > 0 ? (
        <PieChart
          series={[{ data: pieData }]}
          width={500}
          height={300}
        />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}