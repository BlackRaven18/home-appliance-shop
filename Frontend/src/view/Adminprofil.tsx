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
import Product from './../view/Product';
import { styled } from '@mui/material/styles';
import { useState } from 'react';

import { Grid, List, ListItem, ListItemText } from '@mui/material';

function Adminprofil() {
  return (
    <div>
      <Admintopbar />
      <Typography variant="h4" align="center" sx={{ mt: 2 }}>
        Profil
      </Typography>
    </div>
  );
}

export default Adminprofil;


