import axios, { AxiosError } from "axios";
import { apiPath } from "../../../shared/constant";

export class PayrollService {
  token: string | null;
  headers: { "Content-type": string; Authorization: string };
  constructor() {
    this.token = sessionStorage.getItem("token");
    this.headers = {
      "Content-type": "application/json",
      Authorization: `Bearer ${this.token}`,
    };
  }

  payrollGenerate = async (payload: any) => {
    try {
      const response = await axios.post(
        `${apiPath}/payroll/generate`,
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

  payrollUpdate = async (payload: any) => {
    try {
      const response = await axios.post(`${apiPath}/payroll/update`, payload, {
        headers: this.headers,
      });
      return response.data;
    } catch (error: any) {
      const err = error as AxiosError;
      throw err;
    }
  };
  payrollMonthList = async (payload: any) => {
    try {
      const response = await axios.post(
        `${apiPath}/payroll/month/list`,
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
  payrollUserList = async (payload: any) => {
    try {
      const response = await axios.post(
        `${apiPath}/payroll/user/list`,
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
