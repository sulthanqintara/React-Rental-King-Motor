import { signedIn, signIn, signOut } from "./actionString";
import { deleteLogout, postLogin } from "../../utils/https/Auth";

export const loginAction = (body) => {
  return {
    type: signIn,
    payload: postLogin(body),
  };
};

export const loggedInAction = () => {
  return {
    type: signedIn,
  };
};

export const registerAction = () => {
  return {};
};

export const logoutAction = () => {
  return {
    type: signOut,
    payload: deleteLogout(),
  };
};
