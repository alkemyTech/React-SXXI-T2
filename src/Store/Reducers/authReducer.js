import { createSlice } from "@reduxjs/toolkit";
import { loginService, registerService } from "../../Services/sessionService";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLogged: false,
    userName: "",
    userRole: 0,
  },
  reducers: {
    setIsLogged: (state, action) => {
      state.isLogged = action.payload;
    },
    setUserName: (state, action) => {
      state.userName = action.payload;
    },
    setUserRole: (state, action) => {
      state.userRole = action.payload;
    },
  },
});

export const { setIsLogged, setUserName, setUserRole } = authSlice.actions;

export default authSlice.reducer;

export const login = (userValues) => (dispatch) => {
  loginService(userValues).then((data) => {
    localStorage.setItem("token", data.token);
    dispatch(setIsLogged(true));
    dispatch(setUserName(data.name));
    dispatch(setUserRole(data.role_id));
  });
};

export const register = (userValues) => (dispatch) => {
  registerService(userValues).then((data) => {
    localStorage.setItem("token", data.token);
    dispatch(setIsLogged(true));
    dispatch(setUserName(data.name));
    dispatch(setUserRole(data.role_id));
  });
};

export const logout = () => (dispatch) => {
  localStorage.removeItem("token");
  dispatch(setIsLogged(false));
  dispatch(setUserName(""));
  dispatch(setUserRole(0));
};
