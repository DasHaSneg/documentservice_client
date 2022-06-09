import { BaseButton } from "./base";
import CheckIcon from '@mui/icons-material/Check';
import { strings } from "../../../../i18n";

export const FinishButton = (props) => {
    const {strPrefix, handleFinish, disabled} = props;

    return (
        <BaseButton
            handleAction={handleFinish}
            text={strings(`${strPrefix}.finishButton`)}
            icon={{
                color: 'error.main',
                image: <CheckIcon /> 
            }}
            disabled={disabled}
        />
    )
}