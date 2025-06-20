import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  user: string | null;
}

const inittialState: AuthState = {
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: inittialState,
  reducers: {
    login(state, action: PayloadAction<{ user: string }>) {
      state.user = action.payload.user;
    },
    logout(state) {
      state.user = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
