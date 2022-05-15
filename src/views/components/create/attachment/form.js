import { Card, CardContent, Grid, Box, Button } from "@mui/material";
import { strings } from "../../../../i18n";
import { useState } from "react";
import LoadingButton from '@mui/lab/LoadingButton';
import { styled } from '@mui/material/styles';
import { ProductsTable } from "../../attachment";
// import csvToJson from "convert-csv-to-json";
import Papa from "papaparse";

const Input = styled('input')({
    display: 'none',
});

export const CreateAttachmentForm = (props) => {
    const {strPrefix} = props;
    const [products, setProducts] = useState([]);

    const [signButton, setSignButton] = useState({
        loading: false,
        error: false
    });

    const setSb = (field, val) => setSignButton({...signButton, [field]: val});

    const handleSignClick = () => {

    }

    const handleUpload = (e) => {
        const files = e.target.files;
        console.log(files);
        if (files) {
            console.log(files[0]);
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
                                    
                                    <Box sx={{ py: 2}}>
                                        <LoadingButton
                                            color="primary"
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