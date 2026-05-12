"use client";

import { useEffect, useState } from "react";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function GpaChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("/api/Dashboard/gpachart")
      .then((res) => res.json())
      .then((result) => setData(result));
  }, []);

  return (
    <div className="w-full h-[300px] bg-white rounded-2xl p-4">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis dataKey="class" />
          <YAxis />
          <Tooltip />

          <Bar
            dataKey="gpa"
            fill="#2563eb"
            radius={[8, 8, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}