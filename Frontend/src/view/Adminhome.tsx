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
import Admintopbar from './../topbar/Admintopbar';
import { styled } from '@mui/material/styles';
import { useState } from 'react';

import { Grid, List, ListItem, ListItemText } from '@mui/material';

const categories = ['Zarządzaj produktami', 'Zarządzaj użytkownikami', 'Zarządzaj płatnościami'];

const SearchField = styled(TextField)({
  marginLeft: 'auto',
});

function Adminhome() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    // przekieruj użytkownika na stronę z wynikami wyszukiwania
    console.log(`Szukaj: ${searchQuery}`);
  };

  return (
    <div>
      <Admintopbar/>
      <Grid container spacing={2} sx={{height: '100vh'}}>
        <Grid item xs={12} md={2} sx={{ position: 'sticky', top: 0 }}>
          <Paper sx={{ backgroundColor: '#f5f5f5', padding: '16px', height: '100%' }}>
            <Typography variant="h6">Wybierz</Typography>
            <List sx={{ marginTop: '16px' }}>
              {categories.map((category) => (
                <ListItem button key={category} component={Link} to={`/category/${category}`}>
                  <ListItemText primary={category} />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>

      </Grid>
    </div>
  );
}


export default Adminhome;