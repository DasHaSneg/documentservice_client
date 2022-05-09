import { EditableTable } from "../../tables";
import { strings } from "../../../../i18n";

export const EditableProductsTable = (props) => {
    const {strPrefix} = props;

    const strPrefixProducts = `${strPrefix}.products`

    const columns = [
        { field: 'name', headerName: strings(`${strPrefixProducts}.columns.name`), width: 180, editable: true },
        { field: 'amount', headerName: strings(`${strPrefixProducts}.columns.amount`), width: 180, type: 'number', editable: true },
        { field: 'price', headerName: strings(`${strPrefixProducts}.columns.price`), width: 180, type: 'number', editable: true }
    ];  

    return(
        <EditableTable
            strPrefix={strPrefixProducts}
            columns={columns} 
        />
    )
};