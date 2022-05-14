import { axiosGet} from "../helpers/api";

const blockchainModulePrefix = "cosmonaut/documentservice/documentservice/"

export const getBlockchainAnnexes = async() => await axiosGet(`annex`);

export const getBlockchainAnnex = async(blannex_id) => await axiosGet(`annex/${blannex_id}`);

export const getBlockchainContracts = async() => await axiosGet(`contract`);

export const getBlockchainContract = async(blcontract_id) => await axiosGet(`contract/${blcontract_id}`);

export const getBlockchainContractsByInn = async(inn) => await axiosGet(`contracts_by_inn/${inn}`);

