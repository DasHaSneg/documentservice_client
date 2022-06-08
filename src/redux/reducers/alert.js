import { createSlice } from "@reduxjs/toolkit";

const ALERT_TYPE = {
    info: 'info',
	success: 'success',
	error: 'error',
}

export const successAlert = (message) =>
	showAlert({ status: ALERT_TYPE.success, message, open: true})

export const errAlert = (message) =>
	showAlert({ status: ALERT_TYPE.error, message, open: true })

const alertsSlice = createSlice({
	name: 'alerts',
	initialState: {
        status:  ALERT_TYPE.success,
        message: "",
        open: false
    },
	reducers: {
		showAlert(state, action) {
			return action.payload;
		},
        closeAlert(state) {
            return {...state, open: false}
        }
	},
})

export const { showAlert, closeAlert } = alertsSlice.actions;

export default alertsSlice.reducer;