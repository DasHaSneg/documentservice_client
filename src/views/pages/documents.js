import { DashboardLayout } from '../layouts/dashboard';
import { Box, Container, Grid } from '@mui/material';
import { DocumentsTable} from '../components/documents';
import { useNavigate } from 'react-router-dom';
import { CreateButton } from '../components/buttons';

const strPrefix = "documents";

export const Documents = () => {
    const navigate = useNavigate();

    const handleCreateContract = () => {
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
                            <DocumentsTable strPrefix={strPrefix}/>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </DashboardLayout>
    )
};