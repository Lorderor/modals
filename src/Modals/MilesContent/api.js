import axios from "axios";

const GET_MILE_INFO_URL = "offer/get-mile-info-list";
const GET_MILE_FULL_INFO_URL = "offer/get-miles-full-info";
const SEND_MILE_TYPE_URL = "miles-type-new/add-type/";
const GET_OFFER_INFO_URL = "offer/get-info-offer";

const SEND_MILE_URL = "miles-type-new/add-mile/";
const CHANGE_MILE_URL = "miles-type-new/change-mile/";

const SEND_MILE_ACCOUNTING_URL = "miles-type-new/add-accounting/";
const CHANGE_MILE_ACCOUNTING_URL= "miles-type-new/change-mile-accounting/";

const axiosInstance = axios.create({
  baseURL: `/`,
});

const config = {
  headers: {
    "X-Requested-With": "XMLHttpRequest",
  },
};

export const getMileData = () => axiosInstance.get(GET_MILE_INFO_URL);

export const getMileFullData = (milesTypeId, ticketInfoId) =>
  axiosInstance.get(
    `${GET_MILE_FULL_INFO_URL}/?milesTypeId=${milesTypeId}&ticketInfoId=${ticketInfoId}`
  );

export const sendMileTypeData = (data) =>
  axiosInstance.post(SEND_MILE_TYPE_URL, data, config);

export const sendMileData = (data) =>
  axiosInstance.post(SEND_MILE_URL, data, config);

export const changeMileData = (data) =>
    axiosInstance.post(CHANGE_MILE_URL, data, config);

export const sendMileAccountingData = (data) =>
  axiosInstance.post(SEND_MILE_ACCOUNTING_URL, data, config);

export const changeMileAccountingData= (data) =>
    axiosInstance.post(CHANGE_MILE_ACCOUNTING_URL, data, config);

export const getInfoOfferData= (id) =>
    axiosInstance.get(`${GET_OFFER_INFO_URL}/?offerID=${id}`);