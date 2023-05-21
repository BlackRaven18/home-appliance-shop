import { Box, Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { clearShoppingCart } from '../../redux/ShoppingCartReducer';
import { RootState } from '../../redux/store';
import Topbar from '../../topbar/Topbar';
import ShoppingCartElement from './ShoppingCartElement';
import PriceFormatter from '../../PriceFormattingUtils/PriceFormatter';

function ShoppingCart() {

  const shoppingCart = useSelector((state: RootState) => state.shoppingCart);
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const payForProducts = () => {
    navigate("/summary");
  }

  const resetCart = () => {
    dispatch(clearShoppingCart());
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

      <Box
        display='flex'
        justifyContent="flex-end"
        alignItems="center"
        margin='20px'
      >
        <Button
          variant="contained"
          color="primary"
          onClick={resetCart}
        >
          Usuń zawartość koszyka
        </Button>
      </Box>

      <Typography variant='h5' padding='10px'>
        Całkowity koszt: {PriceFormatter.getFormattedPrice(shoppingCart.totalAmount)}
      </Typography>

      {shoppingCart.productsNumber > 0 ? (
        <Button
          variant="contained"
          color="primary"
          onClick={payForProducts}
        >
          Zapłać
        </Button>
      ) : (
        <Button
          disabled
          variant="contained"
          color="primary"
          onClick={payForProducts}
        >
          Zapłać
        </Button>)}


    </>
  );
}


export default ShoppingCart;


