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

  sendMessage = async (payload: any) => {
    try {
      const response = await axios.post(`${apiPath}/chat/send`, payload, {
        headers: this.headers,
      });
      return response.data;
    } catch (error: any) {
      const err = error as AxiosError;
      throw err;
    }
  };

  receiveMessage = async (payload: any) => {
    try {
      const response = await axios.post(`${apiPath}/chat/receive`, payload, {
        headers: this.headers,
      });
      return response.data;
    } catch (error: any) {
      const err = error as AxiosError;
      throw err;
    }
  };

  adminPasswordChange = async (payload: any) => {
    try {
      const response = await axios.post(
        `${apiPath}/admin-change-password`,
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
  userPasswordChange = async (payload: any) => {
    try {
      const response = await axios.post(
        `${apiPath}/user-change-password`,
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
}
