import { Button} from "@mui/material";
import {useNavigate} from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { strings } from "../../../i18n";

export const BackButton = (props) => {
    const navigate = useNavigate();

    return(
        <Button
            component="a"
            startIcon={<ArrowBackIcon fontSize="small" />}
            onClick={() => navigate(-1)}
            >
                {strings('buttons.back')}
        </Button>
    )
}