import { DashboardLayout } from '../layouts/dashboard';
import { Box, Container, Grid } from '@mui/material';
import { DocumentsTable} from '../components/documents';
import { useNavigate } from 'react-router-dom';
import { CreateButton } from '../components/buttons';
import { errAlert } from '../../redux/reducers/alert';
import { getUserContracts, setCurrAttachments } from '../../redux/reducers/contract';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

const strPrefix = "documents";

export const ROLES = {
    seller: "seller",
    buyer: "buyer"
}

export const Documents = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [contractsInfo, setContractsInfo] = useState(null);
    const { contracts } = useSelector(st => st.contracts);

    useEffect(() => {
        if (contracts) {
            console.log(contracts)
            let contractsInfo = contracts.map(contract => {
                let otherCompanyRole = contract.role === ROLES.seller ? ROLES.buyer : ROLES.seller;
                return {
                    number: contract.id,
                    inn: contract[otherCompanyRole].inn, 
                    name: contract[otherCompanyRole].name,
                    date: contract.main_details.date,
                    status: contract.main_details.status
                }
            })
            setContractsInfo(contractsInfo);
        } else {
            dispatch(getUserContracts()).then((res) => { 
                if (res.error) {
                        dispatch(errAlert(res.payload));
                    }
            })
        }
    }, [contracts]);

    const handleCreateContract = () => {
        dispatch(setCurrAttachments([]));
        navigate('/create/document');
    }
    
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
                        container
                        spacing={3}
                    >
                        <Grid
                            item
                            lg={6}
                            sm={6}
                            xl={3}
                            xs={12}
                        >
                           
                        </Grid>
                        <Grid
                            item
                            lg={6}
                            sm={6}
                            xl={3}
                            xs={12}
                        >
                            <CreateButton handleCreate={handleCreateContract} strPrefix={strPrefix}/>
                        </Grid>
                    
                        <Grid
                            item
                            lg={12}
                            md={12}
                            xl={9}
                            xs={12}
                        >
                            {contractsInfo && contractsInfo.length > 0 && <DocumentsTable strPrefix={strPrefix} documents={contractsInfo}/>}
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </DashboardLayout>
    )
};