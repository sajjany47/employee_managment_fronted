import axios, { AxiosError } from "axios";
import { apiPath } from "../../../shared/constant";

export class TaskService {
  token: string | null;
  headers: { "Content-type": string; Authorization: string };

  constructor() {
    this.token = sessionStorage.getItem("token");
    this.headers = {
      "Content-type": "application/json",
      Authorization: `Bearer ${this.token}`,
    };
  }

  taskCreate = async (payload: any) => {
    try {
      const response = await axios.post(`${apiPath}/task/create`, payload, {
        headers: this.headers,
      });
      return response.data;
    } catch (error: any) {
      const err = error as AxiosError;
      throw err;
    }
  };
}