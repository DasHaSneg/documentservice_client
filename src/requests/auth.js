import { axiosPost } from "../helpers/api"

export const sendUserAuth = val => {
    axiosPost('/auth/login', val).then(result => {
        localStorage.setItem('token', result.token);
        localStorage.setItem('user', JSON.stringify(result.user));
        return result;
    }); 
}

//const profileRequiredFields = ['inn', 'name', 'address', 'mail_address', 'cpp', 'bank', 'settlement_account', 'correspondent_account', 'bic']

export const registerUser = async ({
    email,
    password,
    inn,
    name,
    address,
    mail_address,
    cpp,
    bank,
    settlement_account, 
    correspondent_account, 
    bic
}) => {
    const data = {
        email,
        password,
        profile: {
            inn,
            name,
            address,
            mail_address,
            cpp, 
            bank,
            settlement_account, 
            correspondent_account, 
            bic
        }
    }

    return await axiosPost('auth/register', data);
};