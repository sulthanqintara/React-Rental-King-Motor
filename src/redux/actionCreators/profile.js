import { patchProfile } from "../../utils/https/Profile";
import { uploadProfile } from "./actionString";

export const profileAction = (body, params) => {
  return {
    type: uploadProfile,
    payload: patchProfile(body, params),
  };
};
