import axios, { AxiosError } from "axios";
import { apiPath } from "../../../shared/constant";

export class AttendanceService {
  token: string | null;
  headers: { "Content-type": string; Authorization: string };

  constructor() {
    this.token = sessionStorage.getItem("token");
    this.headers = {
      "Content-type": "application/json",
      Authorization: `Bearer ${this.token}`,
    };
  }

  createHolidayList = async (payload: any) => {
    try {
      const response = await axios.post(`${apiPath}/create-holiday`, payload, {
        headers: this.headers,
      });
      return response.data;
    } catch (error: any) {
      const err = error as AxiosError;
      throw err;
    }
  };

  getHolidayList = async (id: any) => {
    try {
      const response = await axios.get(`${apiPath}/holiday-list/${id}`, {
        headers: this.headers,
      });
      return response.data;
    } catch (error: any) {
      const err = error as AxiosError;
      throw err;
    }
  };

  deleteHolidayList = async (payload: any) => {
    try {
      const response = await axios.post(`${apiPath}/delete-holiday`, payload, {
        headers: this.headers,
      });
      return response.data;
    } catch (error: any) {
      const err = error as AxiosError;
      throw err;
    }
  };

  leaveApply = async (payload: any) => {
    try {
      const response = await axios.post(`${apiPath}/leave-apply`, payload, {
        headers: this.headers,
      });
      return response.data;
    } catch (error: any) {
      const err = error as AxiosError;
      throw err;
    }
  };
}
