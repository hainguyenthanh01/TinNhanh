import { useDispatch } from "react-redux";
import axiosClient from "./axiosClient";
import { addCart } from "../Redux/Action/ActionCart";
import { getUrlParamsFromJson } from "../helper";

const AddressAPI = {
  getProvince: () => {
    const url = `/api/address/province`;
    return axiosClient.get(url);
  },
  getDistrict: (query) => {
    const queryParams = getUrlParamsFromJson(query);
    const url = `/api/address/district?${queryParams}`;
    return axiosClient.get(url);
  },

  getWards: (query) => {
    const queryParams = getUrlParamsFromJson(query);
    const url = `/api/address/wards?${queryParams}`;
    return axiosClient.get(url);
  },
};

export default AddressAPI;
