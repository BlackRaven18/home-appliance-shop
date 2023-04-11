import * as React from 'react';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import LinkMaterial from '@mui/material/Link';
import { Link } from "react-router-dom";
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Notloggedintopbar from './../topbar/Notloggedintopbar';
import { styled } from '@mui/material/styles';
import { useState } from 'react';

import { Grid, List, ListItem, ListItemText } from '@mui/material';

const categories = [
  {
    name: 'Kategoria 1',
    subcategories: ['Podkategoria 1', 'Podkategoria 2', 'Podkategoria 3'],
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

function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('');
  const handleSearch = () => {
    // przekieruj użytkownika na stronę z wynikami wyszukiwania
    console.log(`Szukaj: ${searchQuery}`);
  };

    return (
      <div>
        <Notloggedintopbar />
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
                            to={`/category/${category.name}/${subcategory}`}
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
          </Grid>
        </Grid>
      </div>
    );
  }

export default Home;

