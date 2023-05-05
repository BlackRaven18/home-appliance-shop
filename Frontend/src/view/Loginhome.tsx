import { Grid, List, ListItem, ListItemText } from '@mui/material';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { Link } from "react-router-dom";
import Topbar from './../topbar/Topbar';
import Product from './../view/ProductsScreen/Product';

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
        <Topbar />
        <Grid container spacing={2} sx={{ height: '100vh' }}>
          <Grid item xs={12} md={2} sx={{ position: 'sticky', top: 0 }}>
            <Paper sx={{ backgroundColor: '#f5f5f5', padding: '16px', height: '100%' }}>
              <Typography variant="h6">Kategorie</Typography>
              <List sx={{ marginTop: '16px' }}>
                {categories.map((category) => (
                    <div key={category.name}>
                      <ListItem button onClick={() => setActiveCategory(category.name)}>
                        <ListItemText primary={category.name} />
                      </ListItem>
                      <List sx={{ marginTop: '8px' }}>
                        {activeCategory === category.name &&
                            category.subcategories.map((subcategory) => (
                                <ListItem
                                    key={subcategory}
                                    button
                                    component={Link}
                                    to={`/Loginhome?subcategory=${subcategory}`}
                                >
                                  <ListItemText primary={subcategory} />
                                </ListItem>
                            ))}
                      </List>
                    </div>
                ))}
              </List>
            </Paper>
          </Grid>
          <Grid item xs={12} md={10} sx={{marginTop: '5px'}}>
            <Product />
          </Grid>
        </Grid>
      </div>
  );
}

export default Loginhome;
