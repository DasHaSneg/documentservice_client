import { Grid, Typography } from "@mui/material";

export const DetailsField = (props) => {

    const {title, value} = props;

    return(
        <Grid item xs container direction="row" spacing={2}>
            <Grid item xs>
                <Typography gutterBottom variant="subtitle1" component="div">
                    {title}
                </Typography>
            </Grid>
            <Grid item xs>
                <Typography gutterBottom variant="subtitle1" component="div">
                    {value}
                </Typography>
            </Grid>
        </Grid>
    )
}