import axios from "axios";

export type FacultyData = {
  facultyName: string;
  facultyHead: string;
};

export const getFaculties = async () => {
  const response = await axios.get("/api/Dashboard/faculty/view");
  return response.data;
};

export const getFacultyById = async (id: string | number) => {
  const response = await axios.get(`/api/Dashboard/faculty/edit?id=${id}`);
  return response.data;
};

export const addFaculty = async (facultyData: FacultyData) => {
  const response = await axios.post("/api/Dashboard/faculty/add", facultyData);
  return response.data;
};

export const editFaculty = async (
  id: string | number | null,
  facultyData: FacultyData
) => {
  const response = await axios.put("/api/Dashboard/faculty/edit", {
    id,
    ...facultyData,
  });

  return response.data;
};

export const deleteFaculty = async (id: number) => {
  const response = await axios.delete("/api/Dashboard/faculty/view", {
    data: { id },
  });

  return response.data;
};