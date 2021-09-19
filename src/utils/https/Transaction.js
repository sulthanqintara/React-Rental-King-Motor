import axios from "axios";

const url = process.env.REACT_APP_BASE_URL;
const token = localStorage.getItem("token");

export const getTransaction = (params) => {
  return axios.get(`${url}/transactions`, {
    headers: { "x-access-token": `Bearer ${token}` },
    params: params,
  });
};
export const getTransactionByID = (id) => {
  return axios.get(`${url}/transactions/${id}`, {
    headers: { "x-access-token": `Bearer ${token}` },
  });
};
export const getLatestTransaction = (body) => {
  return axios.get(`${url}/transactions/latest`, body, {
    headers: { "x-access-token": `Bearer ${token}` },
  });
};

export const postTransactions = (body) => {
  return axios.post(`${url}/transactions`, body, {
    headers: { "x-access-token": `Bearer ${token}` },
  });
};
export const patchTransaction = (body) => {
  return axios.patch(`${url}/transactions`, body, {
    headers: { "x-access-token": `Bearer ${token}` },
  });
};
export const deleteTransaction = (body) => {
  console.log(body);
  return axios.delete(`${url}/transactions`, {
    headers: { "x-access-token": `Bearer ${token}` },
    data: body,
  });
};
