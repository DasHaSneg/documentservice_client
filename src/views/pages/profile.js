import { Box, Container, Grid, Card, CardHeader, Divider, CardContent, TextField, Button } from '@mui/material';
import { DashboardLayout } from '../layouts/dashboard';
import { strings } from '../../i18n';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';



export const Profile = (props) => {
    
    const { profile } = useSelector(st => st.user)
    const [values, setValues] = useState(
    {
        inn: "",
        name: "",
        address: "",
        mail_address: "",
        cpp: "", 
        bank: "",
        settlement_account: "", 
        correspondent_account: "", 
        bic: ""
    });

    useEffect(() => {
        setValues(profile);
    }, [profile])
    // {
    //     inn: "12122132",
    //     name: "Buyer",
    //     address: "sdsfsfsfdsfdsfgsdf",
    //     mail_address: "sfdsdffsdf",
    //     cpp: "12321324", 
    //     bank: "Sberbank",
    //     settlement_account: "sefsfs", 
    //     correspondent_account: "sdfsfs", 
    //     bic: "sdfsfsf"
    // }
    // const Documents = useApi(() =>
    //   getTeamDocuments(team.id),
    //   { immediately: true })

    const strPrefix = "profile";

    const handleChange = (event) => {
        setValues({
          ...values,
          [event.target.name]: event.target.value
        });
    };

    return(
        <DashboardLayout>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    py: 8
                }}
            >
                <Container maxWidth={false}>
                    <Grid
                        item
                        lg={8}
                        md={12}
                        xl={9}
                        xs={12}
                    >
                         <form
                            autoComplete="off"
                            noValidate
                        >
                            <Card {...props}>
                                <CardHeader 
                                    title={strings(`${strPrefix}.title`)}
                                    subheader={strings(`${strPrefix}.subTitle`)}
                                />
                                <Divider />
                                <CardContent>
                                <Grid
                                    container
                                    spacing={3}
                                >
                                    {Object.keys(values).map(key => {
                                        if (key == 'id') {
                                            return
                                        }
                                        return <Grid
                                        item
                                        md={6}
                                        xs={12}
                                        >
                                            <TextField
                                                fullWidth
                                                label={strings(`${strPrefix}.fields.${key}.label`)}
                                                name={strings(`${strPrefix}.fields.${key}.name`)}
                                                onChange={handleChange}
                                                required
                                                value={values[key]}
                                                variant="outlined"
                                            />
                                        </Grid>
                                    })}
                                </Grid>
                                </CardContent>
                                <Divider />
                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'flex-end',
                                        p: 2
                                    }}
                                >
                                    <Button
                                        color="primary"
                                        variant="contained"
                                    >
                                        {strings(`${strPrefix}.saveButton`)}
                                    </Button>
                                </Box>
                            </Card>
                        </form>
                        
                    </Grid>
                </Container>
            </Box>
        </DashboardLayout>
    )    
}