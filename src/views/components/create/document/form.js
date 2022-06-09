import { Card, CardContent, Grid, Box, TextField, Button, Autocomplete, CircularProgress, Typography } from "@mui/material";
import { strings } from "../../../../i18n";
import { useEffect, useState } from "react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addContract, getProfileById, getProfileByINN } from "../../../../requests";
import { useApi } from "../../../../hooks/useApi";
import LoadingButton from '@mui/lab/LoadingButton';
import { errAlert } from "../../../../redux/reducers/alert";
import { setContract } from "../../../../redux/reducers/contract";
import { useNavigate } from "react-router-dom";


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

export const CreateDocumentForm = (props) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {strPrefix} = props;
    const {user} = useSelector(state => state.user);

    const [value, setValue] = useState(null);
    const [inputValue, setInputValue] = useState('');
    const [options, setOptions] = useState([]);
  
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const [signButton, setSignButton] = useState({
        loading: false,
        error: false
    });

    const setSb = (field, val) => setSignButton({...signButton, [field]: val});

    const profileByInn = useApi(async (inn) => {
        const profile = await getProfileByINN(inn)
        if (profile) {
            setOptions(profile);
        }
            
    });

    const profile = useApi(async (id) => {
        try {
            const profile = await getProfileById(id);
            if (profile) {
                return profile;
            }
        } catch (err) {
            dispatch(errAlert(err.response?.data?.error));
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
        if (inputValue.length > 13) {
            return;
        }
        if (inputValue === user.inn) {
            setError('ypur inn');
            return;
        }

        setOptions([]);
        let active = true;

        setLoading(true);

        (async () => {
            await profileByInn.fetch(inputValue)
      
            if (active) {
                setLoading(false);
            }
          })();
      
          return () => {
            
            active = false;
        };
        

    }, [inputValue]);

    const sign = useApi(async (userProfile) => {
        try {
            const result = await addContract({
                sellerProfile: userProfile,
                buyerProfile: value 
            });
    
            if (result) {
                dispatch(setContract(result));
                navigate(`/document/${result.id}`);
            }
        } catch (err) {
            dispatch(errAlert(err.response?.data?.error));
        }  
    });

    const handleSignClick = async () => {
       
        if (!value) {
            return;
        }
        setSb('loading', true);
     
        let [userProfile] = await profile.fetch(JSON.parse(localStorage.getItem('user')).profile_id)
        await sign.fetch(userProfile);

        setSb('loading', false);
    }

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
                                    setInputValue(newInputValue)
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
                                <Box sx={{ py: 2}}>
                                    <LoadingButton
                                        color="primary"
                                        //disabled={signButton.loading}
                                        fullWidth
                                        size="large"
                                        type="submit"
                                        variant="contained"
                                        loading={signButton.loading}
                                        onClick={handleSignClick}
                                    >
                                        {strings(`${strPrefix}.signButton`)}
                                    </LoadingButton>
                                </Box>
                        </Grid>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}