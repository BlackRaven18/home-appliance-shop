import { Box, Grid, Typography } from "@mui/material";
import { StyleSheet } from 'react-native'
import Product from "./ProductInterface";


const ProductListElement = (product: Product) => {
    return(
        <Box sx={styles.parentBoxStyle}>
            <Grid container spacing = '2'>
                <Grid item  xs = {8}>
                    <Typography>Nazwa: {product.name ?? 'unknown'}</Typography>
                    <Typography>Marka: {product.brand ??'unknown'}</Typography>
                    <Typography>Kolor: {product.color ??'unknown'}</Typography>
                    <Typography>Specyfikacja: {product.specification ??'unknown'}</Typography>
                    <Typography>Cena: {product.price ??'unknown'}</Typography>
                </Grid>
                <Grid item xs = {4}>
                    <Box 
                        component="img"
                        sx={{
                            height: 200,
                            width: 300,
                            maxHeight: { xs: 233, md: 167 },
                            maxWidth: { xs: 350, md: 250 },
                        }}
                        src={product.imageURL}
                    />
                </Grid>
            </Grid>
        </Box>
    );
}

const styles = StyleSheet.create({
    parentBoxStyle:{
        border: '1px solid grey',
        margin: '5px', 
        padding:'17px',
        borderRadius:4,
    },
})




export default ProductListElement