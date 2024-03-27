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

  taskUpdate = async (payload: any) => {
    try {
      const response = await axios.post(`${apiPath}/task/update`, payload, {
        headers: this.headers,
      });
      return response.data;
    } catch (error: any) {
      const err = error as AxiosError;
      throw err;
    }
  };
  taskList = async (type: any, username: any, year: any, status: any) => {
    try {
      const response = await axios.get(
        `${apiPath}/task/list?${type}=${username}&year=${year}&status=${status}`,
        {
          headers: this.headers,
        }
      );
      return response.data;
    } catch (error: any) {
      const err = error as AxiosError;
      throw err;
    }
  };
}
