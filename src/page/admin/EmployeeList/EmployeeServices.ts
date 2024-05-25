import axios, { AxiosError } from "axios";
import { apiPath } from "../../../shared/constant";

export class EmployeeServices {
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

  activationKeyList = async (payload: any) => {
    try {
      const response = await axios.post(`${apiPath}/user-datatable`, payload, {
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
  getAllCountry = async () => {
    try {
      const response = await axios.get(
        `https://api.countrystatecity.in/v1/countries`,
        {
          headers: {
            "X-CSCAPI-KEY":
              "OU5ycmZrek91NnpXVjdUTVJoUVZ1N3ZWWWJGM3lnQVB0N0djYngzMA==",
          },
        }
      );
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      throw err;
    }
  };
  getStateByCountry = async (country: any) => {
    try {
      const response = await axios.get(
        `https://api.countrystatecity.in/v1/countries/${country}/states`,
        {
          headers: {
            "X-CSCAPI-KEY":
              "OU5ycmZrek91NnpXVjdUTVJoUVZ1N3ZWWWJGM3lnQVB0N0djYngzMA==",
          },
        }
      );
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      throw err;
    }
  };

  getCityByState = async (country: any, state: any) => {
    try {
      const response = await axios.get(
        `https://api.countrystatecity.in/v1/countries/${country}/states/${state}/cities`,
        {
          headers: {
            "X-CSCAPI-KEY":
              "OU5ycmZrek91NnpXVjdUTVJoUVZ1N3ZWWWJGM3lnQVB0N0djYngzMA==",
          },
        }
      );
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      throw err;
    }
  };

  getBankDetails = async (ifsc: any) => {
    try {
      const response = await axios.get(`https://ifsc.razorpay.com/${ifsc}`);
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      throw err;
    }
  };
}
