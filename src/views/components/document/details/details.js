import { strings } from "../../../../i18n";
import { Details } from "../../details/details";

// const contract = {
//     // number: "1",
//     main_details: {
//         status: "created",
//         date: 1555016400000
//     },
//     seller: {
//         inn: "123298475775",
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
//         inn: "546391943410",
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

const contract = {
    // number: "1",
    main_details: {
        status: strings(`statuses.waiting_for_signature_1_of_2`),
        date: 1651743800000,
    },
    seller: {
        inn: "123298475775",
        name: "Компания1",
        address: "990426, Астраханская область, город Чехов, пл. Ленина, 54",
        mail_address: "633436, Ленинградская область, город Серебряные Пруды, въезд Будапештсткая, 55",
        cpp: "237645023", 
        bank: "Сбербанк",
        settlement_account: "50348608500000008107", 
        correspondent_account: "40562966200000006399", 
        bic: "173395572"
    },
    buyer: {
        inn: "546391943410",
        name: "Коипания2",
        address: "125495, Владимирская область, город Москва, проезд Балканская, 83",
        mail_address: "794509, Тюменская область, город Наро-Фоминск, пр. Космонавтов, 51",
        cpp: "744345371", 
        bank: "Сбербанк",
        settlement_account: "40847399200000005053", 
        correspondent_account: "40280938300000006356", 
        bic: "937063048"
    }
}

export const DocumentDetails = (props) => {
    const {strPrefix} = props;
    
    return(
        <Details
            strPrefix={strPrefix}
            item={contract}
        />
    )
}