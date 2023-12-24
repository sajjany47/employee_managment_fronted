import axios, { AxiosError } from "axios";
import { apiPath } from "../../../shared/constant";

export class EmployeeService {
  token: string | null;
  headers: { "Content-type": string; Authorization: string };

  constructor() {
    this.token = sessionStorage.getItem("token");
    this.headers = {
      "Content-type": "application/json",
      Authorization: `Bearer ${this.token}`,
    };
  }

  employeeList = async () => {
    try {
      const response = await axios.get(`${apiPath}/employee-list`, {
        headers: this.headers,
      });
      return response.data;
    } catch (error: any) {
      const err = error as AxiosError;
      throw err;
    }
  };
}
