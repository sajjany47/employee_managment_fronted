import axios, { AxiosError } from "axios";
import { apiPath } from "../../shared/constant";

export class UserService {
  headers: { "Content-type": string };
  constructor() {
    this.headers = {
      "Content-type": "application/json",
    };
  }
  login = async (payload: object) => {
    try {
      const response = await axios.post(`${apiPath}/sigin`, payload, {
        headers: this.headers,
      });
      return response.data;
    } catch (error: unknown) {
      const err = error as AxiosError;
      throw err;
    }
  };
}
