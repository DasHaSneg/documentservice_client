import { Container, Box, Typography, Grid} from "@mui/material";
import { BackButton, CreateButton, FinishButton, SignButton } from "../components/buttons";
import { AttachmentsTable, DocumentDetails } from "../components/document";
import { DashboardLayout } from "../layouts/dashboard";

export const Document = () => {

    const strPrefix = "document";

    const handleCreate = () => {

    }

    const handleSign = () => {

    }

    const handleFinish = () => {

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
                
                <Container maxWidth="lg">
                    <BackButton />
                    <Typography
                            sx={{ mb: 3 }}
                            variant="h4"
                        >
                        Договор 1
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
                            <DocumentDetails strPrefix={strPrefix}/>
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
                                    <SignButton strPrefix={strPrefix} handleSign={handleSign}/>
                                </Grid>
                                <Grid
                                    item
                                    lg={6}
                                    md={6}
                                    xs={6}
                                >
                                    <FinishButton strPrefix={strPrefix} handleFinish={handleFinish}/>
                                </Grid>
                                <Grid
                                    item
                                    lg={12}
                                    md={12}
                                    xs={12}
                                >
                                    <CreateButton strPrefix={strPrefix} handleCreate={handleCreate}/>
                                </Grid>
                                <Grid
                                    item
                                    lg={12}
                                    md={12}
                                    xs={12}
                                >
                                    <AttachmentsTable strPrefix={strPrefix} />
                                </Grid>
                            </Grid>
                        </Grid>
                       
                    </Grid>
                </Container>
            </Box>
        </DashboardLayout>                
    )
}