import axios from "axios";

const url = process.env.REACT_APP_BASE_URL;

export const patchProfile = (body, params) => {
  const token = localStorage.getItem("token");
  return axios.patch(`${url}/users/${params}`, body, {
    headers: { "x-access-token": `Bearer ${token}` },
  });
};
