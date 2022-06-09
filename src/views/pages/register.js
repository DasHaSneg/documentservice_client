import { Box, Container, Typography, TextField, Button, Link } from "@mui/material";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { strings } from "../../i18n";
import * as Yup from 'yup';
import { useDispatch } from "react-redux";
import { useApi } from "../../hooks/useApi";
import { registerUser } from "../../requests";
import LoadingButton from '@mui/lab/LoadingButton';
import { errAlert, successAlert } from "../../redux/reducers/alert";

const fieldType = {
    email: 'email',
    password: 'password',
    inn: 'text',
    name: 'text',
    address: 'text',
    mail_address: 'text', 
    cpp: 'text',
    bank: 'text',
    settlement_account: 'text',
    correspondent_account: 'text',
    bic: 'text'
}

const strPrefix = "register";

export const Register = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const submitRegister = useApi(
        (...rest) => {
            registerUser(...rest).then(() => {
                dispatch(successAlert(strings('alerts.success')));
                navigate("/documents");
            })
            .catch(e => {
                dispatch(errAlert(e.response?.data?.error));
            })
                
        }
    )
 
    const formik = useFormik({
        initialValues: {
            email: 'company1@mail.ru',
            password: '1234',
            inn: "417405238280",
            name: "Компания 1",
            address: "014202, Курганская область, город Сергиев Посад, пл. Балканская, 36",
            mail_address: "014202, Курганская область, город Сергиев Посад, пл. Балканская, 36",
            cpp: "199743738", 
            bank: "Сбербанк",
            settlement_account: "50304330500000005598", 
            correspondent_account: "50804552700000001015", 
            bic: "307017935",
        },
        validationSchema: Yup.object({
            email: Yup
                .string()
                .email(
                strings(`${strPrefix}.fields.email.error`))
                .max(255)
                .required(
                strings(`${strPrefix}.fields.email.required`)),
            password: Yup
                .string()
                .max(255)
                .required(
                strings(`${strPrefix}.fields.password.required`)),
            inn: Yup
                .string()
                .max(255)
                .required(
                strings(`${strPrefix}.fields.inn.required`)),
            name: Yup
                .string()
                .max(255)
                .required(
                strings(`${strPrefix}.fields.name.required`)),
            address: Yup
                .string()
                .max(255)
                .required(
                strings(`${strPrefix}.fields.address.required`)),
            mail_address: Yup
                .string()
                .max(255)
                .required(
                strings(`${strPrefix}.fields.mail_address.required`)),
            cpp: Yup
                .string()
                .max(255)
                .required(
                strings(`${strPrefix}.fields.cpp.required`)),
            bank: Yup
                .string()
                .max(255)
                .required(
                strings(`${strPrefix}.fields.bank.required`)),
            settlement_account: Yup
                .string()
                .max(255)
                .required(
                strings(`${strPrefix}.fields.settlement_account.required`)),
            correspondent_account: Yup
                .string()
                .max(255)
                .required(
                strings(`${strPrefix}.fields.correspondent_account.required`)),
            bic: Yup
                .string()
                .max(255)
                .required(
                strings(`${strPrefix}.fields.bic.required`)),
        }),
        onSubmit: async (values) => {
            await submitRegister.fetch(values)
        }
    });

    
    return (
        <Box
            component="main"
            sx={{
                alignItems: 'center',
                display: 'flex',
                flexGrow: 1,
                minHeight: '100%'
            }}
        >
            <Container maxWidth="sm">
                <form onSubmit={formik.handleSubmit}>
                    <Box sx={{ my: 3 }}>
                        <Typography
                            color="textPrimary"
                            variant="h4"
                        >
                            {strings(`${strPrefix}.title`)}
                        </Typography>
                    </Box>
                    {Object.keys(formik.values).map((key, index) => {
                        return <TextField
                            key={index}
                            error={Boolean(formik.touched[key] && formik.errors[key])}
                            fullWidth
                            helperText={formik.touched[key] && formik.errors[key]}
                            label={strings(`${strPrefix}.fields.${key}.label`)}
                            margin="normal"
                            name={strings(`${strPrefix}.fields.${key}.name`)}
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            type={fieldType[key]}
                            value={formik.values[key]}
                            variant="outlined"
                        />
                    })}
                    <Box sx={{ py: 2 }}>
                        <LoadingButton
                            color="primary"
                            fullWidth
                            size="large"
                            type="submit"
                            variant="contained"
                            loading={formik.isSubmitting}
                        >
                            {strings(`${strPrefix}.submitButton`)}
                        </LoadingButton>
                    </Box>
                    <Typography
                        color="textSecondary"
                        variant="body2"
                    >
                        {strings(`${strPrefix}.haveAccount`)}
                    {' '}
                    
                        <Link
                            href="/login"
                            variant="subtitle2"
                            underline="hover"
                        >
                            {strings(`${strPrefix}.loginLink`)}
                        </Link>
                    </Typography>
                </form>
            </Container>
        </Box>
    )
}