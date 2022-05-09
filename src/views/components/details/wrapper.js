import { CardContent, Card, Grid } from "@mui/material";

export const WrapperDetails = ({children}) => {
    return (
        <Card>
            <CardContent>
                <Grid container spacing={2}>
                    <Grid item xs container direction="column" spacing={2}>
                        {children}
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}