import axios from "axios";

export type DeanData = {
  name: string;
  surname: string;
};

export type EditDeanData = DeanData & {
  id: string | number | null;
};

export const getDeans = async () => {
  const response = await axios.get("/api/Dashboard/dean/view");
  return response.data;
};

export const getDeanById = async (id: string | number) => {
  const response = await axios.get(`/api/Dashboard/dean/edit?id=${id}`);
  return response.data;
};

export const addDean = async (deanData: DeanData) => {
  const response = await axios.post("/api/Dashboard/dean/add", deanData);
  return response.data;
};

export const editDean = async (deanData: EditDeanData) => {
  const response = await axios.put("/api/Dashboard/dean/edit", deanData);
  return response.data;
};

export const deleteDean = async (id: number) => {
  const response = await axios.delete("/api/Dashboard/dean/view", {
    data: { id },
  });

  return response.data;
};