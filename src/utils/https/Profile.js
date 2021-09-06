import axios from "axios";

const url = process.env.REACT_APP_BASE_URL;

export const patchProfile = (body, params) => {
  const token = localStorage.getItem("token");
  console.log(params, body);
  return axios.patch(`${url}/users/${params}`, body, {
    headers: { "x-access-token": `Bearer ${token}` },
  });
};
