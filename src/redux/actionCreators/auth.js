import { signedIn, signIn, signOut, uploadProfile } from "./actionString";
import { deleteLogout, postLogin } from "../../utils/https/Auth";
import { patchProfile } from "../../utils/https/Profile";
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

export const profileAction = (body, params) => {
  return {
    type: uploadProfile,
    payload: patchProfile(body, params),
  };
};
export const logoutAction = () => {
  return {
    type: signOut,
    payload: deleteLogout(),
  };
};
