import { Grid, List, ListItemButton, ListItemText } from '@mui/material';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Category, setActiveCategory } from '../../redux/CategoryReducer';


const Categorylist = () => {
    const [categoriesFromEndpoint, setCategoriesFromEndpoint] = useState<Category[]>([]);

    const dispatch = useDispatch();

    const setCategory = (category: Category) => {
        dispatch(setActiveCategory(category))
    }

    useEffect(() => {
        getCategories();
    }, [])

    const getCategories = () => {
        axios.get(process.env.REACT_APP_BACKEND_URL + "/categories")
            .then((response) => {
                setCategoriesFromEndpoint(response.data);
            })
            .catch((error) => {
                setCategoriesFromEndpoint([]);
            })
    }

    return (
        <Grid item xs={12} md={2} sx={{ position: 'sticky', top: 0 }}>
            <Paper sx={{ backgroundColor: '#f5f5f5', padding: '16px', height: '100%' }}>
                <Typography variant="h6">Kategorie</Typography>
                <List sx={{ marginTop: '16px' }}>
                    {categoriesFromEndpoint.map((category) => (
                        <div key={category.name}>
                    
                            <ListItemButton onClick={() => setCategory(category)}>
                                <ListItemText primary={category.name} />
                            </ListItemButton>
                        </div>
                    ))}
                </List>
            </Paper>
        </Grid>
    )
}

export default Categorylist;