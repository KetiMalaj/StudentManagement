"use client";

import { useEffect, useState } from "react";
import axios from "axios";

type SummaryData = {
  totalStudents: number;
  totalTeachers: number;
  totalClasses: number;
  totalFaculties: number;
  totalDeans: number;
  averageGpa: string;
};

export default function Summary() {
  const [summary, setSummary] = useState<SummaryData | null>(null);

  useEffect(() => {
    axios
      .get("/api/Dashboard/summary")
      .then((response) => {
        setSummary(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-10">
      <div className="bg-white rounded-xl shadow-md p-6">
        <p className="text-gray-500 text-sm">Students</p>
        <h3 className="text-3xl font-bold text-violet-800">
          {summary ? summary.totalStudents : "..."}
        </h3>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6">
        <p className="text-gray-500 text-sm">Teachers</p>
        <h3 className="text-3xl font-bold text-violet-800">
          {summary ? summary.totalTeachers : "..."}
        </h3>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6">
        <p className="text-gray-500 text-sm">Classes</p>
        <h3 className="text-3xl font-bold text-violet-800">
          {summary ? summary.totalClasses : "..."}
        </h3>
      </div>
        
      <div className="bg-white rounded-xl shadow-md p-6">
        <p className="text-gray-500 text-sm">Faculties</p>
        <h3 className="text-3xl font-bold text-violet-800">
          {summary ? summary.totalFaculties : "..."}
        </h3>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6">
        <p className="text-gray-500 text-sm">Average GPA</p>
        <h3 className="text-3xl font-bold text-violet-800">
          {summary ? summary.averageGpa : "..."}
        </h3>
      </div>
    </div>
  );
}