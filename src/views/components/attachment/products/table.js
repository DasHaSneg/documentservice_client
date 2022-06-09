import { strings } from "../../../../i18n";
import { SimpleTable } from "../../tables";

export const ProductsTable = (props) => {
  const {strPrefix, prod} = props;

  const prefix = `${strPrefix}.products`

  const spec = {
    "VAT": 0.2,
    products: prod,
  };

  const columns = {
    number: strings(`${prefix}.columns.number`),
    name: strings(`${prefix}.columns.name`),
    amount: strings(`${prefix}.columns.amount`),
    price: strings(`${prefix}.columns.price`),
    total1: strings(`${prefix}.columns.total1`),
    vat: strings(`${prefix}.columns.vat`),
    total2: strings(`${prefix}.columns.total2`)
  };

  const getProducts = () => {
    return spec.products.map(product => {
      let total1 = product.amount * product.price;
      let vat = total1 * spec.VAT;
      return {
        number: product.number,
        name: product.name,
        amount: product.amount,
        price: product.price,
        total1: total1,
        vat: vat,
        total2: total1 + vat
      };
    })
  }
  
  return(
    <SimpleTable
      strPrefix={prefix}
      columns={columns}
      items={getProducts()}
      handleItemClick={() => {}}
    />
  )
}