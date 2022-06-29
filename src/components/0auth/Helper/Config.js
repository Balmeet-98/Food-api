import axios from "axios";
import { address } from "../Helper/HelperApi";
export const Config = () => {
  let token = JSON.parse(localStorage.getItem("token"));
  return axios.create({
    baseURL: `${address}`,
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
};
export const authHelper = () => {
  return axios.create({
    baseURL: `${address}`,
  });
};
