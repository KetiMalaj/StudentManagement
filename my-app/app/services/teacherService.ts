import axios from "axios";

export type TeacherData = {
  name: string;
  surname: string;
};

export type EditTeacherData = TeacherData & {
  id: string | number | null;
};

export const getTeachers = async () => {
  const response = await axios.get("/api/Dashboard/teacher/view");
  return response.data;
};

export const getTeacherById = async (id: string | number) => {
  const response = await axios.get(`/api/Dashboard/teacher/edit?id=${id}`);
  return response.data;
};

export const addTeacher = async (teacherData: TeacherData) => {
  const response = await axios.post("/api/Dashboard/teacher/add", teacherData);
  return response.data;
};

export const editTeacher = async (teacherData: EditTeacherData) => {
  const response = await axios.put("/api/Dashboard/teacher/edit", teacherData);
  return response.data;
};

export const deleteTeacher = async (id: number) => {
  const response = await axios.delete("/api/Dashboard/teacher/view", {
    data: { id },
  });

  return response.data;
};