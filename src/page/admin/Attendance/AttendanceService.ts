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

  applyLeaveList = async (payload: any) => {
    try {
      const response = await axios.post(
        `${apiPath}/leave-apply-list`,
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

  allUserLeaveList = async (year: any) => {
    try {
      const response = await axios.get(`${apiPath}/leave-apply-list/${year}`, {
        headers: this.headers,
      });
      return response.data;
    } catch (error: any) {
      const err = error as AxiosError;
      throw err;
    }
  };

  applyLeaveApproved = async (payload: any) => {
    try {
      const response = await axios.post(`${apiPath}/leave-approved`, payload, {
        headers: this.headers,
      });
      return response.data;
    } catch (error: any) {
      const err = error as AxiosError;
      throw err;
    }
  };
  attendanceDateCheck = async (payload: any) => {
    try {
      const response = await axios.post(`${apiPath}/date-check`, payload, {
        headers: this.headers,
      });
      return response.data;
    } catch (error: any) {
      const err = error as AxiosError;
      throw err;
    }
  };
  dailyAttendance = async (payload: any) => {
    try {
      const response = await axios.post(`${apiPath}/time-record`, payload, {
        headers: this.headers,
      });
      return response.data;
    } catch (error: any) {
      const err = error as AxiosError;
      throw err;
    }
  };
  userAttendanceList = async (payload: any) => {
    try {
      const response = await axios.post(
        `${apiPath}/user-attendance/details`,
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

  userInvalidAttendanceList = async () => {
    try {
      const response = await axios.get(
        `${apiPath}/user-invalid-attendance/details`,

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

  invalidAttendanceChange = async (payload: any) => {
    try {
      const response = await axios.post(
        `${apiPath}/invalid-attendance/change`,
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

  AttendanceAllList = async (payload: any) => {
    try {
      const response = await axios.post(
        `${apiPath}/time-record/list`,
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

  downloadHolidayList = async (payload: any) => {
    try {
      const response = await axios.post(
        `${apiPath}/excel-holiday/download`,
        payload,
        {
          headers: this.headers,
          responseType: "arraybuffer",
        }
      );
      return response.data;
    } catch (error: any) {
      const err = error as AxiosError;
      throw err;
    }
  };

  notificationList = async () => {
    try {
      const response = await axios.get(
        `${apiPath}/notification`,

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
