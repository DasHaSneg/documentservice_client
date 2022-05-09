import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {getProfileById, sendUserAuth} from "../../requests";

export const getUserProfile = createAsyncThunk('user/profile', async user => {
    const {profile_id} = user;
    if (profile_id) {
        const [profile] = await getProfileById(profile_id);
        return profile;
    }
});

export const authUser = createAsyncThunk('user/auth', async val => {
    const { user } = await sendUserAuth(val);
    return user;
})

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: JSON.parse(localStorage.getItem('user') || null),
        profile: null
    },
    reducers: {
        setUser(state, action) {
            state.user = action.payload;
        },
        setProfile(state, action) {
            state.profile = action.payload;
        },
        updateUser(state, action) {
            state.user = {...state.user, ...action.payload};
        },
        updateProfile(state, action) {
            state.profile = {...state.profile, ...action.payload};
        }
    },
    extraReducers: {
        [getUserProfile.fulfilled]: (state, action) => {
            state.profile = action.payload;
        },
        [authUser.fulfilled]: (state, action) => {
            state.user = action.payload;
        }
    }
}); 

export const { setUser, setProfile, updateUser, updateProfile } = userSlice.actions;

export default userSlice.reducer;

// email: "",
//         publicAddress: "",
//         name: "",
//         address: "",
//         mailingAddress: "",
//         inn: "",
//         cpp: "",
//         bank: "",
//         settlementAccount: "",
//         correspondentAccount: "",
//         bic: ""