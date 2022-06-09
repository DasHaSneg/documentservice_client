import { axiosGet, axiosPost } from "../helpers/api";

export const getContracts = async() => await axiosGet(`contract`);

export const getContract = async (id) => await axiosGet(`contract/${id}`);

export const addContract = async ({
    sellerProfile,
    buyerProfile
}) => {
    const data = {
        sellerProfile,
        buyerProfile
    }

    return await axiosPost('contract/', data);
};

export const signContract = async (id) => await axiosPost(`contract/${id}`, {});

export const completeContract = async (id) => await axiosPost(`contract/${id}/sign`, {});





