import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Typography from '@mui/material/Typography';

function Products() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const subcategory = searchParams.get('subcategory');

  let text = '';
  let productList = null;
  if (subcategory === 'Laptopy') {
    text = 'jedynka';
    productList = (
      <ul>
        <li>Product 1</li>
        <li>Product 2</li>
        <li>Product 3</li>
      </ul>
    );
  } else if (subcategory === 'Monitory') {
    text = 'dwójka';
    productList = (
      <ul>
        <li>Product 4</li>
        <li>Product 5</li>
        <li>Product 6</li>
      </ul>
    );
  }

  return (
    <div>
      <Typography variant="h4" align="center" sx={{ mt: 2 }}>
        {text}
      </Typography>
      {productList}
    </div>
  );
}

export default Products;
