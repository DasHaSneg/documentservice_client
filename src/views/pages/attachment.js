import { Container, Box, Typography, Grid} from "@mui/material";
import { AttachmentDetails, ProductsTable } from "../components/attachment";
import { BackButton, SignButton } from "../components/buttons";
import { DashboardLayout } from "../layouts/dashboard";

export const Attachment = () => {
    const strPrefix = "attachment";

    const handleSign = () => {

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
                    <BackButton/>
                    <Typography
                            sx={{ mb: 3 }}
                            variant="h4"
                        >
                        Приложение 1 к Договору 1
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
                            <AttachmentDetails strPrefix={strPrefix}/>
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
                                    lg={12}
                                    md={12}
                                    xs={12}
                                >
                                    <ProductsTable strPrefix={strPrefix} />
                                </Grid>
                            </Grid>
                        </Grid>
                       
                    </Grid>
                </Container>
            </Box>
        </DashboardLayout>                
    )
}