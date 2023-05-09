import Typography from '@mui/material/Typography';
import Topbar from '../topbar/Topbar';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { Button, Box } from '@mui/material';
import { increment, decrement } from '../redux/ShoppingCartReducer';




function Koszyk() {

  const shoppingCart = useSelector((state: RootState) => state.shoppingCart);
  const dispatch = useDispatch();

  return (
    <>
      <Topbar />

      <Typography variant="h4" align="center" sx={{ mt: 2 }}>
        Koszyk: ilosc to: {shoppingCart.quantity}
      </Typography>
  


      <Button  onClick={() => dispatch(increment())}> Increment </Button>
      <Button  onClick={() => dispatch(decrement())}> Decrement </Button>


      {shoppingCart.products.length > 0? (
        shoppingCart.products.map((product) => (
          <li key={product.productId}>
            <Typography>Nazwa: {product.name ?? 'unknown'}</Typography>
            <Typography>Marka: {product.brand ?? 'unknown'}</Typography>
            <Typography>Kolor: {product.color ?? 'unknown'}</Typography>
            <Typography>Specyfikacja: {product.specification ?? 'unknown'}</Typography>
            <Typography>Cena: {product.price ?? 'unknown'}</Typography>
          </li>
        ))

      ) : (
        <Typography>Koszyk jest pusty</Typography>
      )}
      
      
    </>
  );
}

export default Koszyk;


