import { Box, Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import Topbar from '../../topbar/Topbar';
import ShoppingCartElement from './ShoppingCartElement';
import { useNavigate } from 'react-router';

function ShoppingCart() {

  const shoppingCart = useSelector((state: RootState) => state.shoppingCart);
  const navigate = useNavigate();

  const payForProducts = () => {
    navigate("/summary");
  }

  return (
    <>
      <Topbar />

      <Typography variant="h4" align="center" sx={{ mt: 2 }}>
        Koszyk
      </Typography>

      <Box
        display='flex'
        flexDirection='column'
        justifyContent='center'
        alignItems='center'
        padding='5px'
      >
        {shoppingCart.cart.length > 0 ? (
          shoppingCart.cart.map((cartElement) => (
            <ShoppingCartElement
              key={cartElement.productDetails.productId}
              quantity={cartElement.quantity}
              productDetails={cartElement.productDetails} />
          ))
        ) : (
          <Typography>Koszyk jest pusty</Typography>
        )}
      </Box>

      <Typography variant='h5' padding='10px'>
        Całkowity koszt: {shoppingCart.totalAmount}
      </Typography>

      <Button
        variant="contained"
        color="primary"
        onClick={payForProducts}
      >
        Zapłać
      </Button>


    </>
  );
}


export default ShoppingCart;


