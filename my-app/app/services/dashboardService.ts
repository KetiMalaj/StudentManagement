import axios from "axios";

export const getDashboardSummary = async () => {
  const response = await axios.get("/api/Dashboard/summary");
  return response.data;
};