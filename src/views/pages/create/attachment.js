import { Box, Container, Typography, Grid } from "@mui/material"
import { strings } from "../../../i18n";
import { BackButton} from "../../components/buttons";
import { CreateAttachmentForm } from "../../components/create/attachment";
import { DashboardLayout } from "../../layouts/dashboard";

export const CreateAttachment = () => {
    const strPrefix = "create_attachment";

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
                        {strings(`${strPrefix}.title`)}
                    </Typography>
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
                            <CreateAttachmentForm strPrefix={strPrefix} />
                        </Grid>
                        <Grid
                            item
                            lg={6}
                            md={6}
                            xs={6}
                        >
                           
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </DashboardLayout>                
    )
}