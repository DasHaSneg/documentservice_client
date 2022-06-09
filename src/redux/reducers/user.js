import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {getProfileById, sendUserAuth} from "../../requests";

export const getUserProfile = createAsyncThunk('user/profile', async (user, {rejectWithValue}) => {
    const {profile_id} = user;
    if (profile_id) {
        try {
            const [profile] = await getProfileById(profile_id);
            return profile;
        } catch (e) {
            return rejectWithValue(e.response?.data?.error);
        } 
    }
});

export const authUser = createAsyncThunk('user/auth', async (val, {rejectWithValue}) => {
    try {
        let result = await sendUserAuth(val);
        if (result.user) {
            localStorage.setItem('token', result.token);
            localStorage.setItem('user', JSON.stringify(result.user));
            return result.user;
        }
    } catch (e) {
        return rejectWithValue(e.response?.data?.error);
    }
});

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: JSON.parse(localStorage.getItem('user') || null),
        profile: null,
        error: null,
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
        },
        [authUser.rejected]: (state, action) => {
            state.error = action.payload;
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