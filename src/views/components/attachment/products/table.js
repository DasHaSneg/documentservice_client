import { strings } from "../../../../i18n";
import { SimpleTable } from "../../tables";

const products = [
  {
      "number": 1,
      "name": "ручка",
      "amount": 100,
      "price": 50,
  },
  {
      "number": 2,
      "name": "карандаш",
      "amount": 100,
      "price": 30,
  },
  {
      "number": 3,
      "name": "линейка",
      "amount": 100,
      "price": 20,
  }
]

export const ProductsTable = (props) => {
  const {strPrefix, prod} = props;

  const prefix = `${strPrefix}.products`

  const spec = {
    "VAT": 0.2,
    products: prod || products,
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
      product.total1 = product.amount * product.price;
      product.vat = product.total1 * spec.VAT;
      product.total2 = product.total1 + product.vat;
      return product;
    })
  }
  
  return(
    <SimpleTable
      strPrefix={prefix}
      columns={columns}
      items={getProducts()}
    />
  )
}