import { Card, CardContent, Grid, Box, Button } from "@mui/material";
import { strings } from "../../../../i18n";
import { useEffect, useState } from "react";
import LoadingButton from '@mui/lab/LoadingButton';
import { styled } from '@mui/material/styles';
import { ProductsTable } from "../../attachment";
import Papa from "papaparse";
import { addAnnex } from "../../../../requests";
import { useNavigate, useParams } from "react-router-dom";
import { setContracts, setCurrAttachments } from "../../../../redux/reducers/contract";
import { useDispatch, useSelector } from "react-redux";
import { errAlert } from "../../../../redux/reducers/alert";
import { useApi } from "../../../../hooks/useApi";

const Input = styled('input')({
    display: 'none',
});

const testProducts = [
    {
        "number": 1,
        "name": "ручка",
        "amount": 100,
        "price": 50,
    },
    {
        "number": 2,
        "name": "карандаш",
        "amount": 100,
        "price": 30,
    },
    {
        "number": 3,
        "name": "линейка",
        "amount": 100,
        "price": 20,
    }
];

export const CreateAttachmentForm = (props) => {
    const {strPrefix, docId} = props;
    const [products, setProducts] = useState([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [contract, setContract] = useState(null);

    const { contracts } = useSelector(st => st.contracts);

    useEffect(() => {
        let contract = {...contracts.filter(contract => contract.id.toString() === docId)[0]};
        setContract(contract);
    }, [contracts]);

    const [signButton, setSignButton] = useState({
        loading: false,
        error: false
    });

    const setSb = (field, val) => setSignButton({...signButton, [field]: val});

    const add = useApi(async () => {
        console.log({
            contract_id: docId,
            products,
            buyer_public_address: contract.buyer.public_address
        });
        try {
            const result = await addAnnex({
                contract_id: docId,
                products,
                buyer_public_address: contract.buyer.public_address
            });
    
            if (result) {
                let newContracts = contracts.filter(contract => contract.id.toString() !== docId);
                let newContract = {...contract};
                let status = strings(`statuses.${result.contractState.replaceAll(" ", "_").toLowerCase()}`)
                let mainDetails = {...newContract.main_details};
                mainDetails.status = status;
                newContract.main_details = mainDetails;
                newContracts.push(newContract);
                dispatch(setContracts(newContracts));
                dispatch(setCurrAttachments([result]));
                navigate(`/attachment/${docId}/${result.id}`);
            }
        } catch (err) {
            console.log(err)
            dispatch(errAlert(err.response?.data?.error));
        }  
    });

    const handleSignClick = async () => {
        if (products.length === 0) {
            return;
        }
        setSb('loading', true);
     
        await add.fetch();

        setSb('loading', false);
    }

    const handleUpload = (e) => {
        const files = e.target.files;
        if (files) {
            Papa.parse(files[0], {
            complete: function(results) {
                if (results && results.data) {
                    let products = [];
                    let fields = [];
                    results.data.forEach((element, index) => {

                        if (index === 0) {
                            fields = element;
                            return
                        }
                            
                        if (element.length < fields.length)
                            return
                        let product = {};
                        fields.forEach((field, index) => {
                            product[field] = element[index];
                        })
                        products.push(product);
                    });

                    setProducts(products);
                }
            }}
            )
        }
    }

    return(
        <Grid
            container
            spacing={3}
            >
            <Grid
                item
                lg={12}
                md={12}
                xs={12}
            >
                <Card>
                    <CardContent>
                        <Grid container spacing={2}>
                            <Grid item xs container direction="column" spacing={2}>
                                <Grid
                                    item
                                    md={12}
                                    xs={12}
                                >
                                    <label htmlFor="contained-button-file">
                                        <Input id="contained-button-file" multiple type="file" onChange={handleUpload} accept=".csv,.xlsx,.xls"/>
                                        <Button color="primary" variant="outlined" component="span">
                                            {strings(`${strPrefix}.upload`)}
                                        </Button>
                                    </label>

                                    <Button
                                        onClick={() => setProducts(testProducts)}
                                        >
                                            {strings('buttons.testData')}
                                    </Button>
                                    
                                    <Box sx={{ py: 2}}>
                                        <LoadingButton
                                            color="primary"
                                            fullWidth
                                            size="large"
                                            type="submit"
                                            variant="contained"
                                            loading={signButton.loading}
                                            onClick={handleSignClick}
                                            disabled={products.length === 0}
                                        >
                                            {strings(`${strPrefix}.signButton`)}
                                        </LoadingButton>
                                    </Box>

                                    
                                </Grid>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </Grid>
            <Grid
                item
                lg={12}
                md={12}
                xs={12}
            >
                <ProductsTable strPrefix={'attachment'} prod={products} />
            </Grid>
    </Grid>
        
    )
}