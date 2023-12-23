import axios from "axios";

const GET_MILE_INFO_URL = "offer/get-mile-info-list";
const SEND_MILE_TYPE_URL = "miles-type-new/add-type/";
const SEND_MILE_URL = "miles-type-new/add-mile/";
const SEND_MILE_ACCOUNTING_URL = "miles-type-new/add-accounting/";


const axiosInstance = axios.create({
  baseURL: `/`,
});

const config = {
  headers: {
    "X-Requested-With": "XMLHttpRequest",
  },
};

export const getMileData = () => axiosInstance.get(GET_MILE_INFO_URL);

export const sendMileTypeData = (data) =>
  axiosInstance.post(SEND_MILE_TYPE_URL, data, config);

export const sendMileData = (data) =>
  axiosInstance.post(SEND_MILE_URL, data, config);

export const sendMileAccountingData = (data) =>
    axiosInstance.post(SEND_MILE_ACCOUNTING_URL, data, config);