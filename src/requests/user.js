import { axiosGet } from "../helpers/api";

export const getProfileById = async id => await axiosGet(`profile/${id}`);

export const getProfileByINN = async inn => await axiosGet(`profile/inn/${inn}`);