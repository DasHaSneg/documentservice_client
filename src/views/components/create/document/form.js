import { Card, CardContent, Grid, Box, TextField, Button, Autocomplete, CircularProgress, Typography } from "@mui/material"
import { useFormik } from "formik";
import { strings } from "../../../../i18n";
import * as Yup from 'yup';
import { useEffect, useRef, useState } from "react";
import React from "react";
import InputMask from 'react-input-mask';
import { useSelector } from "react-redux";
import { getProfileByINN } from "../../../../requests";
import { useApi } from "../../../../hooks/useApi";


const companies = [
    {
        inn: "121221323456",
        name: "Seller1",
        address: "sdsfsfsfdsfdsfgsdf",
        mail_address: "sfdsdffsdf",
        cpp: "12321324", 
        bank: "Sberbank",
        settlement_account: "sefsfs", 
        correspondent_account: "sdfsfs", 
        bic: "sdfsfsf"
    },
    {
        inn: "431221323435",
        name: "Buyer1",
        address: "sdsfsfsfdsfdsfgsdf",
        mail_address: "sfdsdffsdf",
        cpp: "12321324", 
        bank: "Sberbank",
        settlement_account: "sefsfs", 
        correspondent_account: "sdfsfs", 
        bic: "sdfsfsf"
    }
]

function sleep(delay = 0) {
    return new Promise((resolve) => {
      setTimeout(resolve, delay);
    });
}

export const CreateDocumentForm = (props) => {
    const {strPrefix, handleSubmit} = props;
    const {user} = useSelector(state => state.user);

    const [value, setValue] = useState(null);
    const [inputValue, setInputValue] = useState('');
    const [options, setOptions] = useState([]);
    // const loaded = useRef(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const profile = useApi(async (inn) => {
        const profile = await getProfileByINN(inn)
        if (profile) {
            setOptions(profile) 
        }
            
    });
    // const fetch = React.useMemo(
    //     () =>
    //       throttle((request, callback) => {
    //         autocompleteService.current.getPlacePredictions(request, callback);
    //       }, 200),
    //     [],
    //   );

    useEffect(() => {

        if (inputValue.length < 12) {
            return;
        }
        if (inputValue === user.inn) {
            setError('your inn')
            return;
        }

        setOptions([]);
        let active = true;

        setLoading(true);

        (async () => {
            await profile.fetch(inputValue)
      
            if (active) {
                setLoading(false);
            }
          })();
      
          return () => {
            
            active = false;
        };

    }, [inputValue]);

    return(
        <Card>
            <CardContent>
                <Grid container spacing={2}>
                    <Grid item xs container direction="column" spacing={2}>
                        <Grid
                            item
                            md={12}
                            xs={12}
                        >
                            <Autocomplete
                                id="buyer"
                                //sx={{ width: 300 }}
                                isOptionEqualToValue={(option, value) => option.inn === value.inn}
                                getOptionLabel={(option) => option.name}
                                filterOptions={(x) => x}
                                options={options}
                                autoComplete
                                includeInputInList
                                filterSelectedOptions
                                value={value}
                                onChange={(event, newValue) => {
                                    setValue(newValue);
                                }}
                                onInputChange={(event, newInputValue) => {
                                    setInputValue(newInputValue);
                                }}
                                loading={loading}
                                renderInput={(params) => (
                                    <TextField 
                                            {...params}
                                            label={strings(`${strPrefix}.fields.buyer.label`)}
                                            helperText={strings(`${strPrefix}.fields.buyer.description`)}
                                            fullWidth 
                                            InputProps={{
                                                ...params.InputProps,
                                                endAdornment: (
                                                <React.Fragment>
                                                    {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                                    {params.InputProps.endAdornment}
                                                </React.Fragment>
                                                ),
                                            }}
                                        /> 
                                )}
                                renderOption={(props, option) => {
                                    return (
                                        <li {...props}>
                                            <Grid container alignItems="center">
                                            <Typography utterBottom variant="subtitle1" component="div">
                                                {`${option.inn}, ${option.name}`}
                                                </Typography>
                                            </Grid>
                                        </li>
                                    );
                                }}
                                />
                        </Grid>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}