import { createSlice } from "@reduxjs/toolkit";
import { loginService, registerService } from "../../Services/sessionService";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLogged: Boolean(localStorage.getItem("token")),
    userName: localStorage.getItem("userName") || "",
    userRole: parseInt(localStorage.getItem("userRole")) || 2,
    userId: localStorage.getItem("userId") || null,
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
    setUserId: (state, action) => {
      state.isLogged = action.payload;
    },
  },
});

export const { setIsLogged, setUserName, setUserRole, setUserId } =
  authSlice.actions;

export default authSlice.reducer;

export const login = (userValues) => (dispatch) => {
  loginService(userValues).then((data) => {
    if (data.token) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("userName", data.user.name);
      localStorage.setItem("userRole", data.user.role_id);
      localStorage.setItem("userId", data.user.id);
      dispatch(setIsLogged(true));
      dispatch(setUserName(data.user.name));
      dispatch(setUserRole(data.user.role_id));
      dispatch(setUserId(data.user.id));
    }
  });
};

export const register =
  ({ fullname: name, email, password }) =>
  (dispatch) => {
    registerService({ name, email, password }).then((data) => {
      if (data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("userName", data.user.name);
        localStorage.setItem("userRole", data.user.role_id);
        localStorage.setItem("userId", data.user.id);
        dispatch(setIsLogged(true));
        dispatch(setUserName(data.user.name));
        dispatch(setUserRole(data.user.role_id));
        dispatch(setUserId(data.user.id));
      }
    });
  };

export const logout = () => (dispatch) => {
  localStorage.removeItem("token");
  localStorage.removeItem("userName");
  localStorage.removeItem("userRole");
  localStorage.removeItem("userId");
  dispatch(setIsLogged(false));
  dispatch(setUserName(""));
  dispatch(setUserRole(2));
  dispatch(setUserId(null));
};
