import { BaseButton } from "./base";
import CallMadeIcon from '@mui/icons-material/CallMade';
import { strings } from "../../../../i18n";

export const SignButton = (props) => {
    const {strPrefix, handleSign, disabled} = props;

    return (
        <BaseButton
            handleAction={handleSign}
            text={strings(`${strPrefix}.signButton`)}
            icon={{
                color: 'warning.main',
                image: <CallMadeIcon /> 
            }}
            disabled={disabled}
        />
    )
}