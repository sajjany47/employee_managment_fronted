import axios, { AxiosError } from "axios";
import { apiPath } from "../../../shared/constant";

export class ActivationService {
  token: string | null;
  headers: { "Content-type": string; Authorization: string };

  constructor() {
    this.token = sessionStorage.getItem("token");
    this.headers = {
      "Content-type": "application/json",
      Authorization: `Bearer ${this.token}`,
    };
  }

  generateActivationKey = async (payload: any) => {
    try {
      const response = await axios.post(`${apiPath}/activation-code`, payload, {
        headers: this.headers,
      });
      return response.data;
    } catch (error: any) {
      const err = error as AxiosError;
      throw err;
    }
  };

  activationKeyList = async (id: any) => {
    try {
      const response = await axios.get(`${apiPath}/activation-key-list/${id}`, {
        headers: this.headers,
      });
      return response.data;
    } catch (error: any) {
      const err = error as AxiosError;
      throw err;
    }
  };
  userUpdate = async (payload: any) => {
    try {
      const response = await axios.post(`${apiPath}/user-update`, payload, {
        headers: this.headers,
      });
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      throw err;
    }
  };
  statusChange = async (payload: any) => {
    try {
      const response = await axios.post(`${apiPath}/change-status`, payload, {
        headers: this.headers,
      });
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      throw err;
    }
  };

  userVerified = async (payload: any) => {
    try {
      const response = await axios.post(`${apiPath}/user-verified`, payload, {
        headers: this.headers,
      });
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      throw err;
    }
  };

  singleUser = async (id: any) => {
    try {
      const response = await axios.get(`${apiPath}/single-user/${id}`, {
        headers: this.headers,
      });
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      throw err;
    }
  };
}
