import { Box, Container, Typography, Button, TextField, Link } from "@mui/material";
import { useFormik } from "formik";
import { strings } from '../../i18n';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { useApi } from "../../hooks/useApi";
import { authUser } from "../../redux/reducers/user";


export const Login = (props) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const strPrefix="login";

    const authLogin = useApi(authValues => dispatch(authUser(authValues)))
    
    const formik = useFormik({
        initialValues: {
            email: 'test1@mail.ru',
            password: '1234',
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
                strings(`${strPrefix}.fields.password.required`))
        }),
        onSubmit: async (values) => {
            //authLogin.fetch(formix.values);
            await authLogin.fetch(values);
            console.log('submit')
            navigate('/')
        }
    });

    return(
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
                    <TextField
                        error={Boolean(formik.touched.email && formik.errors.email)}
                        fullWidth
                        helperText={formik.touched.email && formik.errors.email}
                        label={strings(`${strPrefix}.fields.email.label`)}
                        margin="normal"
                        name={strings(`${strPrefix}.fields.email.name`)}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        type="email"
                        value={formik.values.email}
                        variant="outlined"
                    />
                    <TextField
                        error={Boolean(formik.touched.password && formik.errors.password)}
                        fullWidth
                        helperText={formik.touched.password && formik.errors.password}
                        label={strings(`${strPrefix}.fields.password.label`)}
                        margin="normal"
                        name={strings(`${strPrefix}.fields.password.name`)}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        type="password"
                        value={formik.values.password}
                        variant="outlined"
                    />
                    <Box sx={{ py: 2 }}>
                        <Button
                            color="primary"
                            disabled={formik.isSubmitting}
                            fullWidth
                            size="large"
                            type="submit"
                            variant="contained"
                        >
                            {strings(`${strPrefix}.submitButton`)}
                        </Button>
                    </Box>
                    <Typography
                        color="textSecondary"
                        variant="body2"
                    >
                        {strings(`${strPrefix}.haveAccount`)}
                        {' '}
                    <Link
                        href="/reg"
                        variant="subtitle2"
                        underline="hover"
                        sx={{
                            cursor: 'pointer'
                        }}
                    >
                        {strings(`${strPrefix}.link`)}
                    </Link>
                    </Typography>
                </form>
            </Container>
        </Box>
    )
};