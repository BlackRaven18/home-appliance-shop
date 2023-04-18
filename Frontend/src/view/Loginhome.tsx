import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import LinkMaterial from '@mui/material/Link';
import { Link } from "react-router-dom";
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Topbar from './../topbar/Topbar';
import Product from './../view/Product';
import { styled } from '@mui/material/styles';
import { useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Grid, List, ListItem, ListItemText } from '@mui/material';

const categories = [
  {
    name: 'Komputery i tablety',
    subcategories: ['Laptopy', 'Monitory', 'Podzespoły komputerowe'],
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

const SearchField = styled(TextField)({
  marginLeft: 'auto',
});

function Loginhome() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('');
  const handleSearch = () => {
    // przekieruj użytkownika na stronę z wynikami wyszukiwania
    console.log(`Szukaj: ${searchQuery}`);
  };

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
            <Grid container justifyContent='center'>
              <Grid item xs={12} md={6} >
                <SearchField
                  fullWidth
                  label="Wyszukaj produkt"
                  variant="standard"
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                />
              </Grid>
            </Grid>
                 <Product />
          </Grid>
        </Grid>
      </div>
    );
  }

export default Loginhome;

