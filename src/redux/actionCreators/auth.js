import { signIn } from "./actionString";
import { postLogin } from "../../utils/https/Auth";

export const loginAction = (body) => {
  return {
    type: signIn,
    payload: postLogin(body),
  };
};

export const registerAction = () => {
  return {};
};

export const logoutAction = () => {
  return {};
};
