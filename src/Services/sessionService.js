import { successAlert } from "./alertService";
import { postData } from "./privateApiService";

export const loginService = async (userValues) => {
  let data = {};
  await postData("/login", userValues).then((res) => {
    if (res.data) {
      successAlert(
        "Se inició sesión con éxito",
        `${res.data.user.name} ha ingresado correctamente`,
        "Volver"
      );
      data = res.data;
    }
  });
  return data;
};

export const registerService = async (userValues) => {
  let data = {};
  await postData("/register", userValues).then((res) => {
    if (res.data) {
      successAlert(
        "Se registró con éxito",
        `${res.data.user.name} te has registrado correctamente`,
        "Volver"
      );
      data = res.data;
    }
  });
  return data;
};
