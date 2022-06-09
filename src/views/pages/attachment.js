import { Container, Box, Typography, Grid} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { strings } from "../../i18n";
import { errAlert } from "../../redux/reducers/alert";
import { getUserAttachments, getUserContracts, setCurrAttachments } from "../../redux/reducers/contract";
import { AttachmentDetails, ProductsTable } from "../components/attachment";
import { BackButton, SignButton } from "../components/buttons";
import { DashboardLayout } from "../layouts/dashboard";
import { ROLES } from "./documents";

export const Attachment = () => {
    const strPrefix = "attachment";
    const dispatch = useDispatch();
    const {id: attachId, contract_id: docId} = useParams();
    const [attach, setAttach] = useState(null);
    const [role, setRole] = useState();
    const {curAttachments, contracts } = useSelector(st => st.contracts);
    
    const handleSign = () => {

    }

    useEffect(() => {
        if (contracts.length > 0) {
            setRole(contracts.filter(contract => contract.id.toString() === docId)[0].role);
        } else {
            dispatch(getUserContracts()).then((res) => {
                if (res.error) {
                        dispatch(errAlert(res.payload));
                    }
            })
        }

        if (contracts.length > 0 && curAttachments.length > 0) {
            let contract = {...contracts.filter(contract => contract.id.toString() === docId)[0]};
            let attach = {...curAttachments[0]};
            attach.buyer = contract.buyer;
            attach.seller = contract.seller;
            attach.role = contract.role;
            delete attach.id;
            setAttach(attach);
        } else {
            dispatch(getUserAttachments({contract_id: docId, role})).then((res) => {
                console.log(res)
                if (res.error) {
                        dispatch(errAlert(res.payload));
                    }
            })
        }
    }, [contracts]);

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
                    <BackButton/>
                    <Typography
                            sx={{ mb: 3 }}
                            variant="h4"
                        >
                        {`${strings(`${strPrefix}.title.attachment`)} ${attachId} ${strings(`${strPrefix}.title.contract`)} ${docId}`}
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
                           {attach && <AttachmentDetails strPrefix={strPrefix} attachment={{main_details: attach.main_details, seller: attach.seller, buyer: attach.buyer}}/>}
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
                                    <SignButton strPrefix={strPrefix} handleSign={handleSign} disabled={!attach || (attach && (attach.role === ROLES.seller || attach.main_details.status === strings('statuses.signed')))}/>
                                </Grid>
                                <Grid
                                    item
                                    lg={12}
                                    md={12}
                                    xs={12}
                                >
                                    {attach && <ProductsTable strPrefix={strPrefix} prod={attach.products}/>}
                                </Grid>
                            </Grid>
                        </Grid>
                       
                    </Grid>
                </Container>
            </Box>
        </DashboardLayout>                
    )
}