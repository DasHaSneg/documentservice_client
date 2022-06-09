import { Grid, Typography } from "@mui/material";
import { strings } from "../../../i18n";
import { DetailsField } from "./field";
import { SeverityPill } from "../severity-pill";
import { format } from 'date-fns';

export const BlockDetails = (props) => {
 
    const {strPrefix, title, fields} = props;

    const strPrefixDetails = `${strPrefix}.details`;

    return(
        <Grid item xs container direction="column" spacing={2}>
            {title && <Grid item xs>
                <Typography gutterBottom variant="subtitle1" component="div">
                    {strings(`${strPrefix}.details_titles.${title}`)}
                </Typography>
            </Grid>}
            
            {Object.keys(fields).map(field => {
                switch(field) {
                    case "date":
                        return <DetailsField
                                    title={`${strings(`${strPrefixDetails}.${title}.${field}`)}:`}
                                    // value={format(fields[field], 'dd/MM/yyyy')}
                                    value={fields[field]}
                        />
                    case "status":
                        return  <DetailsField
                                    title={`${strings(`${strPrefixDetails}.${title}.${field}`)}:`}
                                    value={<SeverityPill
                                    color={(fields[field] === 'Подписан' && 'success')
                                    || (fields[field] === 'refunded' && 'error')
                                    || 'warning'}
                                >
                                    {fields[field]}
                                </SeverityPill>}
                            />
                    default: 
                        return <DetailsField
                                    title={`${strings(`${strPrefixDetails}.${title}.${field}`)}:`}
                                    value={fields[field]}
                            />
                }
            })}
        </Grid>
    )
}