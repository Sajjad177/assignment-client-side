import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { User } from "@/types/globalType";

const initialState = {
  user: null,
  token: null,
  selectedUser: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
    },
    logOut: (state) => {
      state.user = null;
      state.token = null;
    },
    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload;
    },
  },
});

export const { setUser, logOut, setSelectedUser } = authSlice.actions;
export default authSlice.reducer;

export const useCurrentToken = (state: RootState) => state.auth.token;
export const selectCurrentUser = (state: RootState): User | null =>
  state?.auth?.user;
export const chatSelectedUser = (state: RootState): User | null =>
  state?.auth?.selectedUser;
