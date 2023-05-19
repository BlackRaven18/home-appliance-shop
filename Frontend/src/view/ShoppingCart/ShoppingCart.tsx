import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useDispatch, useSelector } from 'react-redux';
import { decrementAmountOfProduct, incrementAmountOfProduct } from '../../redux/ShoppingCartReducer';
import { RootState } from '../../redux/store';
import TopBar from '../../TopBar/TopBar';
import ShoppingCartElement from './ShoppingCartElement';




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

function ShoppingCart() {

  const shoppingCart = useSelector((state: RootState) => state.shoppingCart);
  const dispatch = useDispatch();

  return (
    <>
      <TopBar />

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


    </>
  );
}


export default ShoppingCart;


