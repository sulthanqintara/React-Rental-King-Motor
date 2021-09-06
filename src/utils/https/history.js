import axios from "axios";

const url = process.env.REACT_APP_BASE_URL;
export const getHistory = (params) => {
  return axios.get(`${url}/history/${params}`);
};

export const postHistory = (body) => {
  return axios.post(`${url}/history`, body);
};

export const deleteHistory = () => {
  const token = localStorage.getItem("token");
  return axios.delete(`${url}/auth/logout`, { token: token });
};
