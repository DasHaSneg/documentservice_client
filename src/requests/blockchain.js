import { axiosGet, axiosGetBl} from "../helpers/api";

const blockchainModulePrefix = "documentservice/documentservice/"

export const getBlockchainAnnexes = async() => await axiosGetBl(`${blockchainModulePrefix}annex`);

export const getBlockchainAnnex = async(blannex_id) => await axiosGetBl(`${blockchainModulePrefix}annex/${blannex_id}`);

export const getBlockchainContracts = async() => await axiosGetBl(`${blockchainModulePrefix}contract`);

export const getBlockchainContract = async(blcontract_id) => await axiosGet(`contract/${blcontract_id}`);

export const getBlockchainContractsByInn = async(inn) => await axiosGet(`contracts_by_inn/${inn}`);

