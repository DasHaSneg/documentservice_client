import { useNavigate } from "react-router-dom";
import { strings } from "../../../../i18n";
import { SimpleTable } from "../../tables";

// const attachments = [
//     {
//       number: "0",
//       date: 1555016400000,
//       status: 'pending'
//     }
// ];

// const attachments = [
//   {
//     number: "1",
//     date: 1651743800000,
//     status: strings(`statuses.signed`)
//   }
// ];

export const AttachmentsTable = (props) => {
  const {strPrefix, attachments, handleItemClick} = props;
  const navigate = useNavigate();

  const prefix = `${strPrefix}.attachments`

  const columns = {
    number: strings(`${prefix}.columns.number`),
    date: strings(`${prefix}.columns.date`),
    status: strings(`${prefix}.columns.status`)
  };
  
  return(
    <SimpleTable
      strPrefix={prefix}
      columns={columns}
      items={attachments}
      handleItemClick={handleItemClick}
    />
  )
}