import { createSlice } from "@reduxjs/toolkit";

export interface initialType {
  auth: { token: string | null; user: { role: string } | null };
}

const initialValue: initialType = {
  auth: { token: null, user: null },
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialValue,
  reducers: {
    setUser: (state, action) => {
      state.auth = action.payload;
    },
  },
});

export const { setUser } = authSlice.actions;

export default authSlice.reducer;
