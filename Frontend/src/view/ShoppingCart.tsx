import Typography from '@mui/material/Typography';
import Topbar from '../topbar/Topbar';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { Button, Box } from '@mui/material';
import { decrementAmountOfProduct, incrementAmountOfProduct } from '../redux/ShoppingCartReducer';



interface Product {
  productId: string;
  name: string;
  brand: string;
  color: string;
  specification: string;
  price: number;
  imageURL: string;
  category: {
    categoryId: string;
    name: string;
  };
}

function Koszyk() {

  const shoppingCart = useSelector((state: RootState) => state.shoppingCart);
  const dispatch = useDispatch();

  const incrementAmount = (product: Product) => {
    dispatch(incrementAmountOfProduct(product));
  }

  const decrementAmount = (product: Product) => {
    dispatch(decrementAmountOfProduct(product))
  }

  return (
    <>
      <Topbar />

      {shoppingCart.cart.length > 0 ? (
        shoppingCart.cart.map((cartElement) => (
          <li key={cartElement.productDetails.productId}>
            <Typography>Nazwa: {cartElement.productDetails.name ?? 'unknown'}</Typography>
            <Typography>Marka: {cartElement.productDetails.brand ?? 'unknown'}</Typography>
            <Typography>Kolor: {cartElement.productDetails.color ?? 'unknown'}</Typography>
            <Typography>Specyfikacja: {cartElement.productDetails.specification ?? 'unknown'}</Typography>
            <Typography>Cena: {cartElement.productDetails.price ?? 'unknown'}</Typography>
            <Typography>Ilosc: {cartElement.quantity}</Typography>

            <Button
              variant="contained"
              color="primary"
              onClick={() => incrementAmount(cartElement.productDetails)}>+</Button>

            <Button
              variant="contained"
              color="primary"
              onClick={() => decrementAmount(cartElement.productDetails)}>-</Button>
          </li>
        ))

      ) : (
        <Typography>Koszyk jest pusty</Typography>
      )}


    </>
  );
}

export default Koszyk;


