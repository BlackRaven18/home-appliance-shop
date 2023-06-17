import { Grid, List, ListItem, ListItemText } from '@mui/material';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import { useState } from 'react';
import ManagePayments from "./ManagePayments";
import ManageProducts from "./ManageProducts";
import ManageUsers from "./ManageUsers";

const categories = ['Zarządzaj produktami', 'Zarządzaj użytkownikami', 'Zarządzaj płatnościami'];

const SearchField = styled(TextField)({
    marginLeft: 'auto',
});

const AdminCategoryList = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const handleCategorySelect = (category: string) => {
        setSelectedCategory(category);
    }

    const handleSearch = () => {
        // przekieruj użytkownika na stronę z wynikami wyszukiwania
        console.log(`Szukaj: ${searchQuery}`);
    };

    return(
        <>
            <Grid item xs={12} md={3} sx={{ position: 'sticky', top: 0 }}>
                <Paper sx={{ backgroundColor: '#f5f5f5', padding: '16px', height: '100%', width: '200px' }}>
                    <Typography variant="h5" sx={{ textAlign: 'center' }}>Wybierz</Typography>
                    <List sx={{ marginTop: '16px', maxHeight: '100%', overflowY: 'auto' }}>
                        {categories.map((category) => (
                            <ListItem button key={category} onClick={() => handleCategorySelect(category)}>
                                <ListItemText primary={category} sx={{ textAlign: 'center' }}/>
                            </ListItem>
                        ))}
                    </List>
                </Paper>
            </Grid>
            <div style={{ flexGrow: 1, marginTop: '5px' }}>
                {selectedCategory === 'Zarządzaj produktami' && <ManageProducts />}
                {selectedCategory === 'Zarządzaj użytkownikami' && <ManageUsers />}
                {selectedCategory === 'Zarządzaj płatnościami' && <ManagePayments />}
            </div>
        </>
    )
}

export default AdminCategoryList;
