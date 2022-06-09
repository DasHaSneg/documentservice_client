import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { strings } from "../../i18n";
import { getAnnexes, getBlockchainAnnexes, getBlockchainContracts, getContract, getContracts } from "../../requests";


export const getUserContract = createAsyncThunk('contracts/new', async (id, {rejectWithValue}) => {
    try {
        let result = await getContract(id);
        console.log(result);
        //change status
        return result;
    } catch (e) {
        return rejectWithValue(e.response?.data?.error);
    }
});

export const getUserContracts = createAsyncThunk('contracts/all', async (val, {rejectWithValue}) => {
    try {
        let contracts = await getContracts();
        if (contracts.length === 0) return [];
        let blContractsInfo = await getBlockchainContracts();
        let blContracts = blContractsInfo['Contract'];
        let contractsWithMainInfo = contracts.map(contract => {
            let blContract = blContracts.filter(bc => bc.id === contract.blcontract_id.toString())[0];
            let status = blContract.state.replaceAll(" ", "_").toLowerCase();
            let seller = {...contract.seller};
            delete seller.id;
            let buyer = {...contract.buyer};
            delete buyer.id;
            return {
                id: contract.id,
                role: contract.role,
                main_details: {
                    date: blContract.createDate,
                    status: strings(`statuses.${status}`)
                },
                seller,
                buyer,
            }
        })
        console.log(contractsWithMainInfo)
        return contractsWithMainInfo;
    } catch (e) {
        console.log(e)
        return rejectWithValue(e.response?.data?.error);
    }
});

export const getUserAttachments = createAsyncThunk('attachment/all', async (data, {rejectWithValue}) => {
    try {
        let attachments = await getAnnexes(data.contract_id);
        if (attachments.length === 0) return [];
        let blAttachmentsInfo = await getBlockchainAnnexes();
        console.log(blAttachmentsInfo);
        let blAttachments = blAttachmentsInfo['Annex'];
        let attachmentsWithMainInfo = attachments.map(attach=> {
            let blAttachment = blAttachments.filter(bc => bc.id === attach.blannex_id.toString())[0];
            let status = blAttachment.state.replaceAll(" ", "_").toLowerCase();
            return {
                id: attach.id,
                contract_id: data.contract_id,
                main_details: {
                    date: blAttachment.createDate,
                    status: strings(`statuses.${status}`)
                },
                products: attach.products,
                role: data.role,
            }
        })
        console.log(attachmentsWithMainInfo)
        return attachmentsWithMainInfo;
    } catch (e) {
        console.log(e)
        return rejectWithValue(e.response?.data?.error);
    }
});


export const contractSlice = createSlice({
    name: 'contracts',
    initialState: {
        error: null,
        contracts: [],
        curAttachments: [],
    },
    reducers: {
        setContracts(state, action) {
            state.contracts = action.payload;
        },
        setContract(state, action) {
            state.contracts = [...state.contracts, action.payload];
        },
        setCurrAttachments(state, action) {
            state.curAttachments = action.payload;
        }
    },
    extraReducers: {
        [getUserContracts.fulfilled]: (state, action) => {
			state.contracts = action.payload;
		},
        [getUserContracts.rejected]: (state, action) => {
			state.error = action.payload;
		},
        [getUserAttachments.fulfilled]: (state, action) => {
			state.curAttachments = action.payload;
		},
        [getUserAttachments.rejected]: (state, action) => {
			state.error = action.payload;
		},
         // [getUserContract.fulfilled]: (state, action) => {
        //     state.contracts = [...state.contracts, action.payload];
        // },
        // [getUserContract.rejected]: (state, action) => {
        //     state.error  = action.payload;
        // },
    }
}); 

export const { setContract, setContracts, setCurrAttachments } = contractSlice.actions;

export default contractSlice.reducer;