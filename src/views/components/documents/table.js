import { strings } from '../../../i18n';
import { SimpleTable } from '../tables';

// const documents = [
//     {
//       number: "1",
//       inn: "123131234",
//       name: 'Ekaterina Tankova',
//       date: 1555016400000,
//       status: 'pending'
//     }
// ];




export const DocumentsTable = (props) => {
  const documents = [
    {
      number: "1",
      inn: "546391943410",
      name: 'Компания2',
      date: 1651743800000,
      status: strings(`statuses.waiting_for_signature_1_of_2`)
    }
  ];

  const {strPrefix} = props;

  const columns = {
    number: strings(`${strPrefix}.columns.number`),
    inn: strings(`${strPrefix}.columns.inn`),
    name: strings(`${strPrefix}.columns.name`),
    date: strings(`${strPrefix}.columns.date`),
    status: strings(`${strPrefix}.columns.status`)
  };

  return(
    <SimpleTable
      strPrefix={strPrefix}
      columns={columns}
      items={documents}
    />
  )
};