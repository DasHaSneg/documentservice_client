import { axiosGet } from "../helpers/api";

export const getProfileById = id => axiosGet(`profile/${id}`);

export const getProfileByINN = inn => axiosGet(`profile/inn/${inn}`);