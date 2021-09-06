import axios from "axios";

const url = process.env.REACT_APP_BASE_URL;

export const postVehicle = (body) => {
  const token = localStorage.getItem("token");
  return axios.post(`${url}/vehicles`, body, {
    headers: { "x-access-token": `Bearer ${token}` },
  });
};

export const patchVehicle = (body, params) => {
  const token = localStorage.getItem("token");
  return axios.patch(`${url}/vehicles/${params}`, body, {
    headers: { "x-access-token": `Bearer ${token}` },
  });
};
