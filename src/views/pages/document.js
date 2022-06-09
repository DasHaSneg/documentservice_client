import { Container, Box, Typography, Grid} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { strings } from "../../i18n";
import { errAlert } from "../../redux/reducers/alert";
import { getUserAttachments, getUserContracts } from "../../redux/reducers/contract";
import { BackButton, CreateButton, FinishButton, SignButton } from "../components/buttons";
import { AttachmentsTable, DocumentDetails } from "../components/document";
import { DashboardLayout } from "../layouts/dashboard";
import { ROLES } from "./documents";

export const Document = (props) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {id: docId} = useParams();
    const [contract, setContract] = useState(null);
    const { contracts, curAttachments } = useSelector(st => st.contracts);
    const [attach, setAttach] = useState([]);

    const strPrefix = "document";

    const handleCreate = () => {
        navigate(`/create/attachment/${docId}`);
    }

    const handleSign = () => {

    }

    const handleFinish = () => {

    }

    useEffect(() => {
        if (contract) {
            let contract = {...contracts.filter(contract => contract.id.toString() === docId)[0]};
            delete contract.id;
            setContract(contract);
        } else {
            dispatch(getUserContracts()).then((res) => {   
                if (res.error) {
                        dispatch(errAlert(res.payload));
                } else {
                    let contracts = res.payload;
                    let contract = {...contracts.filter(contract => contract.id.toString() === docId)[0]};
                    delete contract.id;
                    setContract(contract);
                }
            })
        }
        
        if (attach.length > 0 && attach[0].contract_id === docId) 
            return;
        dispatch(getUserAttachments({contract_id: docId, role: attach.role})).then((res) => {
            if (res.error) {
                    dispatch(errAlert(res.payload));
            } else {
                if (res.payload.length > 0) {
                    let attach = res.payload[0];
                    setAttach([{
                        number: attach.id,
                        date: attach.main_details.date,
                        status: attach.main_details.status,
                    }]);
                }
            }
        })
    }, [])

    // useEffect(() => {
    //     if (contracts.length > 0) {
    //         console.log(contracts)
    //         let contract = {...contracts.filter(contract => contract.id.toString() === docId)[0]};
    //         delete contract.id;
    //         setContract(contract);
    //     } else {
    //         dispatch(getUserContracts()).then((res) => {
    //             console.log(res)    
    //             if (res.error) {
    //                     dispatch(errAlert(res.payload));
    //                 }
    //         })
    //     }
        
    //     if (curAttachments.length > 0) {
    //         //&& curAttachments[0].contract_id === docId
    //         let attach = curAttachments[0];
    //         setAttach([{
    //             number: attach.id,
    //             date: attach.main_details.date,
    //             status: attach.main_details.status,
    //         }]);
    //     } else {
    //         dispatch(getUserAttachments({contract_id: docId, role: attach.role})).then((res) => {
    //             if (res.error) {
    //                     dispatch(errAlert(res.payload));
    //             } else {
    //                 let attach = res.payload[0];
    //                 setAttach([{
    //                     number: attach.id,
    //                     date: attach.main_details.date,
    //                     status: attach.main_details.status,
    //                 }]);
    //             }
    //         })
    //     }

    // }, [contracts]);
    
    return(
        <DashboardLayout>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    py: 8
                }}
            >
                <Container maxWidth="lg">
                    <BackButton />
                    <Typography
                            sx={{ mb: 3 }}
                            variant="h4"
                        >
                        {`${strings(`${strPrefix}.title`)} ${docId}`}
                    </Typography>
                    <Grid
                        container
                        spacing={3}
                        >
                        <Grid
                            item
                            lg={5}
                            md={5}
                            xs={12}
                        >
                            {contract && <DocumentDetails strPrefix={strPrefix} document={contract}/>}
                        </Grid>
                        <Grid 
                            spacing={3} 
                            item
                            lg={7}
                            md={7}
                            xs={12} 
                        >
                            <Grid
                                container
                                spacing={3}
                            >
                                <Grid
                                    item
                                    lg={6}
                                    md={6}
                                    xs={6}
                                >
                                    <SignButton strPrefix={strPrefix} handleSign={handleSign} disabled={!contract || (contract && (contract.role === ROLES.seller || contract.main_details.status === strings('statuses.signed')))}/>
                                </Grid>
                                <Grid
                                    item
                                    lg={6}
                                    md={6}
                                    xs={6}
                                >
                                    <FinishButton strPrefix={strPrefix} handleFinish={handleFinish} disabled={!contract || (contract && contract.main_details.status !== strings('statuses.signed'))}/>
                                </Grid>
                                <Grid
                                    item
                                    lg={12}
                                    md={12}
                                    xs={12}
                                >
                                    <CreateButton strPrefix={strPrefix} handleCreate={handleCreate} disabled={attach.length > 0}/>
                                </Grid>
                                <Grid
                                    item
                                    lg={12}
                                    md={12}
                                    xs={12}
                                >
                                    {curAttachments && <AttachmentsTable strPrefix={strPrefix} attachments={attach} handleItemClick={(item) => navigate(`/attachment/${docId}/${item.number}`)}/> }
                                </Grid>
                            </Grid>
                        </Grid>
                       
                    </Grid>
                </Container>
            </Box>
        </DashboardLayout>                
    )
}