import axios from "axios";

export type ClassData = {
  name: string;
  teacherId: string | number;
  facultyId?: string | number;
};

export type EditClassData = ClassData & {
  id: string | number | null;
};

export const getClasses = async () => {
  const response = await axios.get("/api/Dashboard/class/view");
  return response.data;
};

export const getClassById = async (id: string | number) => {
  const response = await axios.get(`/api/Dashboard/class/edit?id=${id}`);
  return response.data;
};

export const getClassDetails = async (id: string | number) => {
  const response = await axios.get(`/api/Dashboard/class/show?id=${id}`);
  return response.data;
};

export const addClass = async (classData: ClassData) => {
  const response = await axios.post("/api/Dashboard/class/add", {
    ...classData,
    teacherId: Number(classData.teacherId),
    facultyId: classData.facultyId ? Number(classData.facultyId) : null,
  });

  return response.data;
};

export const editClass = async (classData: EditClassData) => {
  const response = await axios.put("/api/Dashboard/class/edit", {
    ...classData,
    teacherId: Number(classData.teacherId),
    facultyId: classData.facultyId ? Number(classData.facultyId) : null,
  });

  return response.data;
};

export const deleteClass = async (id: number) => {
  const response = await axios.delete("/api/Dashboard/class/view", {
    data: { id },
  });

  return response.data;
};