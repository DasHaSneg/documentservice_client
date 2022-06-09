import { axiosGet, axiosPost } from "../helpers/api";

export const getAnnexes = async(contract_id) => await axiosGet(`contract/${contract_id}/annex`);

export const getAnnex = async (contract_id, id) => await axiosGet(`contract/${contract_id}/annex/${id}`);

export const addAnnex = async ({
    contract_id,
    products,
    buyer_public_address
}) => {
    const data = {
        products,
        buyer_public_address
    }

    return await axiosPost(`contract/${contract_id}/annex`, data);
};

export const signAnnex = async (contract_id) => await axiosPost(`contract/${contract_id}/annex/sign`, {});