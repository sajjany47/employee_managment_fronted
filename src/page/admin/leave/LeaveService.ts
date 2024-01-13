import axios, { AxiosError } from "axios";
import { apiPath } from "../../../shared/constant";

export class LeaveService {
  token: string | null;
  headers: { "Content-type": string; Authorization: string };

  constructor() {
    this.token = sessionStorage.getItem("token");
    this.headers = {
      "Content-type": "application/json",
      Authorization: `Bearer ${this.token}`,
    };
  }

  userList = async () => {
    try {
      const response = await axios.get(`${apiPath}/userlist/leave`, {
        headers: this.headers,
      });
      return response.data;
    } catch (error: any) {
      const err = error as AxiosError;
      throw err;
    }
  };

  singleLeaveAlloted = async (payload: any) => {
    try {
      const response = await axios.post(
        `${apiPath}/single-user/leave-create`,
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
