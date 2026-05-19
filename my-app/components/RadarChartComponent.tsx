"use client";

import { useEffect, useState } from "react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";

const COLORS = ["#2563eb", "#e11d48", "#16a34a", "#f59e0b", "#8b5cf6"];

interface FacultyData {
  faculty: string;
  students: number;
  classes: number;
  teachers: number;
  avgGpa: number;
}

export default function FacultyRadarChart() {
  const [data, setData] = useState<FacultyData[]>([]);

  useEffect(() => {
    fetch("/api/Dashboard/radarchart")
      .then((res) => res.json())
      .then((result) => setData(result));
  }, []);

  if (data.length === 0) return null;

  // Find max values for normalization (radar charts work best with normalized data)
  const maxStudents = Math.max(...data.map((d) => d.students), 1);
  const maxClasses = Math.max(...data.map((d) => d.classes), 1);
  const maxTeachers = Math.max(...data.map((d) => d.teachers), 1);
  const maxGpa = 4;

  // Transform into radar format: each metric is a data point
  const radarData = [
    {
      metric: "Students",
      ...Object.fromEntries(
        data.map((d) => [d.faculty, Math.round((d.students / maxStudents) * 100)])
      ),
    },
    {
      metric: "Classes",
      ...Object.fromEntries(
        data.map((d) => [d.faculty, Math.round((d.classes / maxClasses) * 100)])
      ),
    },
    {
      metric: "Teachers",
      ...Object.fromEntries(
        data.map((d) => [d.faculty, Math.round((d.teachers / maxTeachers) * 100)])
      ),
    },
    {
      metric: "Avg GPA",
      ...Object.fromEntries(
        data.map((d) => [d.faculty, Math.round((d.avgGpa / maxGpa) * 100)])
      ),
    },
  ];

  return (
    <div className="w-full h-[350px] bg-white rounded-2xl p-4">
      <h3 className="text-lg font-semibold mb-2">Faculty Performance</h3>
      <ResponsiveContainer width="100%" height="90%">
        <RadarChart data={radarData} outerRadius="60%">
          <PolarGrid />
          <PolarAngleAxis dataKey="metric" tick={{ fontSize: 12 }} />
          <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} />
          <Tooltip formatter={(value: number) => `${value}%`} />
          {data.map((faculty, index) => (
            <Radar
              key={faculty.faculty}
              name={faculty.faculty}
              dataKey={faculty.faculty}
              stroke={COLORS[index % COLORS.length]}
              fill={COLORS[index % COLORS.length]}
              fillOpacity={0.15}
            />
          ))}
          <Legend />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
