import { BaseButton } from "./base";
import AddIcon from '@mui/icons-material/Add';
import { strings } from "../../../../i18n";

export const CreateButton = (props) => {
    const {strPrefix, handleCreate, disabled} = props;

    return (
        <BaseButton
            handleAction={handleCreate}
            text={strings(`${strPrefix}.createButton`)}
            icon={{
                color: 'success.main',
                image: <AddIcon /> 
            }}
            disabled={disabled}
        />
    )
}