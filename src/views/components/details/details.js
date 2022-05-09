import { Divider } from "@mui/material";
import { BlockDetails } from "./block";
import { WrapperDetails } from "./wrapper";

export const Details = (props) => {
    const {strPrefix, item} = props;
    
    return(
        <WrapperDetails>
            {Object.keys(item).map((key, index) => {
                return <>
                        <BlockDetails title={key} key={key} fields={item[key]} strPrefix={strPrefix}/>
                        {index < Object.keys(item).length - 1 && <Divider/>}
                    </>
            })}
        </WrapperDetails>          
    )
}