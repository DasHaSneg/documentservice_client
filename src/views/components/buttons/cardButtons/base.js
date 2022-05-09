import { Card, CardActionArea, CardContent, Grid, Typography, Avatar } from "@mui/material";

export const BaseButton = (props) => {
    const {handleAction, text, icon} = props;

    return(
        <Card
            sx={{ height: '100%' }}
            {...props}
        >
            <CardActionArea onClick={handleAction}>
                <CardContent>
                    <Grid
                        container
                        spacing={3}
                        sx={{ justifyContent: 'space-between' }}
                    >
                        <Grid item>
                            <Typography
                                color="textSecondary"
                                gutterBottom
                                variant="overline"
                            >
                                {text}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Avatar
                                sx={{
                                backgroundColor: icon.color,
                                height: 56,
                                width: 56
                                }}
                            >
                                {icon.image}
                            </Avatar>
                        </Grid>
                    </Grid>
                </CardContent>
            </CardActionArea>
        </Card>
    )
} 