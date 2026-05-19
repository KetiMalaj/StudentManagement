import axios from "axios";

export type StudentData = {
  name: string;
  surname: string;
  gpa?: string;
  facultyId?: string;
  classId?: string;
};

export type EditStudentData = StudentData & {
  id: string | number | null;
};

export const getStudents = async () => {
  const response = await axios.get("/api/Dashboard/student/view");
  return response.data;
};

export const getStudentById = async (id: string | number) => {
  const response = await axios.get(`/api/Dashboard/student/edit?id=${id}`);
  return response.data;
};

export const addStudent = async (studentData: StudentData) => {
  const response = await axios.post("/api/Dashboard/student/add", studentData);
  return response.data;
};

export const editStudent = async (studentData: EditStudentData) => {
  const response = await axios.put("/api/Dashboard/student/edit", studentData);
  return response.data;
};

export const deleteStudent = async (id: number) => {
  const response = await axios.delete("/api/Dashboard/student/view", {
    data: { id },
  });

  return response.data;
};