import { strings } from "../../../../i18n";
import { Details } from "../../details/details";

// const attachment = {
//     // number: "1",
//     main_details: {
//         contract_number: 1,
//         status: "created",
//         date: 1555016400000
//     },
//     seller: {
//         inn: "12122132",
//         name: "Seller1",
//         address: "sdsfsfsfdsfdsfgsdf",
//         mail_address: "sfdsdffsdf",
//         cpp: "12321324", 
//         bank: "Sberbank",
//         settlement_account: "sefsfs", 
//         correspondent_account: "sdfsfs", 
//         bic: "sdfsfsf"
//     },
//     buyer: {
//         inn: "12122132",
//         name: "Buyer1",
//         address: "sdsfsfsfdsfdsfgsdf",
//         mail_address: "sfdsdffsdf",
//         cpp: "12321324", 
//         bank: "Sberbank",
//         settlement_account: "sefsfs", 
//         correspondent_account: "sdfsfs", 
//         bic: "sdfsfsf"
//     }
// }


// const attachment = {
//     // number: "1",
//     main_details: {
//         contract_number: 1,
//         status: strings(`statuses.signed`),
//         date: 1651743800000,
//     },
//     seller: {
//         inn: "123298475775",
//         name: "Компания1",
//         address: "990426, Астраханская область, город Чехов, пл. Ленина, 54",
//         mail_address: "633436, Ленинградская область, город Серебряные Пруды, въезд Будапештсткая, 55",
//         cpp: "237645023", 
//         bank: "Сбербанк",
//         settlement_account: "50348608500000008107", 
//         correspondent_account: "40562966200000006399", 
//         bic: "173395572"
//     },
//     buyer: {
//         inn: "546391943410",
//         name: "Коипания2",
//         address: "125495, Владимирская область, город Москва, проезд Балканская, 83",
//         mail_address: "794509, Тюменская область, город Наро-Фоминск, пр. Космонавтов, 51",
//         cpp: "744345371", 
//         bank: "Сбербанк",
//         settlement_account: "40847399200000005053", 
//         correspondent_account: "40280938300000006356", 
//         bic: "937063048"
//     }
// }

export const AttachmentDetails = (props) => {
    const {strPrefix, attachment} = props;
    
    return(
        <Details
            strPrefix={strPrefix}
            item={attachment}
        />
    )
}