import Notloggedintopbar from './../topbar/Notloggedintopbar';
import * as React from 'react';
import Button from '@mui/material/Button';
import LinkMaterial from '@mui/material/Link';
import { Link } from "react-router-dom";
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Product from './../view/Product';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Grid, List, ListItem, ListItemText } from '@mui/material';
import Categorylist from "./Categorylist";

const categories = [
  {
    name: 'Komputery i tablety',
    subcategories: ['Laptopy', 'Komputery', 'Podzespoły komputerowe'],
  },
  {
    name: 'Kategoria 2',
    subcategories: ['Podkategoria 4', 'Podkategoria 5', 'Podkategoria 6'],
  },
  {
    name: 'Kategoria 3',
    subcategories: ['Podkategoria 7', 'Podkategoria 8', 'Podkategoria 9'],
  },
];

function Loginhome() {
  const [activeCategory, setActiveCategory] = React.useState('');

  return (
      <div>
        <Notloggedintopbar />
        <Grid container spacing={2} sx={{ height: '100vh' }}>
          <Categorylist/>
          <Grid item xs={12} md={10} sx={{marginTop: '5px'}}>
            <Product />
          </Grid>
        </Grid>
      </div>
  );
}

export default Loginhome;


