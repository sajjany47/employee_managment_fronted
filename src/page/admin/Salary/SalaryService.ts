import axios, { AxiosError } from "axios";
import { apiPath } from "../../../shared/constant";

export class SalaryServices {
  token: string | null;
  headers: { "Content-type": string; Authorization: string };

  constructor() {
    this.token = sessionStorage.getItem("token");
    this.headers = {
      "Content-type": "application/json",
      Authorization: `Bearer ${this.token}`,
    };
  }

  createSalaryStructure = async (payload: any) => {
    try {
      const response = await axios.post(
        `${apiPath}/salary/structure-create`,
        payload,
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

  userListSalary = async () => {
    try {
      const response = await axios.get(`${apiPath}/salary/user-list`, {
        headers: this.headers,
      });
      return response.data;
    } catch (error: any) {
      const err = error as AxiosError;
      throw err;
    }
  };

  salaryList = async (payload: any) => {
    try {
      const response = await axios.post(`${apiPath}/salary/list`, payload, {
        headers: this.headers,
      });
      return response.data;
    } catch (error: any) {
      const err = error as AxiosError;
      throw err;
    }
  };

  singleSalaryList = async (id: any) => {
    try {
      const response = await axios.get(`${apiPath}/salary/list/${id}`, {
        headers: this.headers,
      });
      return response.data;
    } catch (error: any) {
      const err = error as AxiosError;
      throw err;
    }
  };
}
