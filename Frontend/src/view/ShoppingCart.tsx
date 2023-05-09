import Typography from '@mui/material/Typography';
import Topbar from '../topbar/Topbar';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { Button } from '@mui/material';
import { increment, decrement } from '../redux/ShoppingCartReducer';




function Koszyk() {

  const shoppingCart = useSelector((state: RootState) => state.shoppingCart);
  const dispatch = useDispatch();

  return (
    <div>
      <Topbar />

      <Typography variant="h4" align="center" sx={{ mt: 2 }}>
        Koszyk: ilosc to: {shoppingCart.quantity}
      </Typography>

      <Button  onClick={() => dispatch(increment())}> Increment </Button>
      <Button  onClick={() => dispatch(decrement())}> Decrement </Button>
    </div>
  );
}

export default Koszyk;


