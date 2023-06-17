
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Grid } from '@mui/material';
import { Accordion, AccordionDetails, AccordionSummary, Box, Typography } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import PriceFormatter from '../PriceFormattingUtils/PriceFormatter';
import TopBar from '../TopBar/TopBar';
import UserDataManager from '../UserDataManager/UserDataManager';
import LoadingSpinner from './LoadingSpinner';

interface HistoryI {
    transactionId: string,
    transactions: TransactionI[],
}

interface TransactionI {
    transactionId: string,
    date: string,
    status: string,
    totalAmount: number,
    deliveryMethod: string,
    products: ProductsInTransactionI[],
}

interface ProductsInTransactionI {
    productId: string,
    price: number,
    quantity: number,
    name: string,
    imageURL: string,
}

function History() {

    const [history, setHistory] = useState<HistoryI>();
    const [isLoading, setIsLoading] = useState(false);
    const userId = UserDataManager.getUserId();

    useEffect(() => {
        getHistory();
    }, []);

    const getHistory = async () => {
        setIsLoading(true);
        await axios
            .get(process.env.REACT_APP_BACKEND_URL + "/persons/"
                + userId + "/transactions-history", {
                auth: {
                    username: UserDataManager.getUsername(),
                    password: UserDataManager.getPassword()
                }
            })
            .then((response) => {
                setHistory(response.data);
                setIsLoading(false);
            })
            .catch((error) => {
                console.log(error);
            })

    }

    return (
        <div>
            <TopBar />
            <Typography variant="h4" align="center" sx={{ mt: 2 }}>
                Historia
            </Typography>

            {isLoading ? (
                <LoadingSpinner label='Trwa ładowanie historii transakcji...' />
            ) : <p></p>}

            {history ? (
                history.transactions.map((transaction) => (
                    <Box
                        sx={{
                            border: '1px solid grey',
                            padding: '15px',
                            marginLeft: 'auto',
                            marginRight: 'auto',
                            marginBottom: '15px',
                            borderRadius: '8px',
                            width: '90%',
                        }}
                    >
                        <Typography><strong>Data:</strong> {transaction.date}</Typography>
                        <Typography><strong>Status:</strong> {transaction.status}</Typography>
                        <Typography><strong>Metoda dostawy:</strong> {transaction.deliveryMethod}</Typography>
                        <Typography><strong>Kwota zamówienia:</strong> {PriceFormatter.getFormattedPrice(transaction.totalAmount)}</Typography>
                        <Typography
                            variant='h5'
                            margin="10px"
                        >
                            Produkty w zamówieniu
                        </Typography>
                        {transaction.products.map((product) => (
                            <Box>
                                <Accordion>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel1a-content"
                                        id="panel1a-header"
                                    >
                                        <Typography><strong>Produkt {product.name}</strong></Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12} md={4}>
                                                <Box
                                                    component="img"
                                                    src={product.imageURL}
                                                    sx={{
                                                        height: 173.5,
                                                        width: '80%',
                                                        maxWidth: { xs: 350, md: '100%' },
                                                    }}
                                                />
                                            </Grid>
                                            <Grid item xs={12} md={8} sx={{ textAlign: { xs: 'left', md: 'initial' } }}>
                                                <Typography><strong>Id produktu:</strong> {product.productId}</Typography>
                                                <Typography><strong>Cena:</strong> {PriceFormatter.getFormattedPrice(product.price)}</Typography>
                                                <Typography><strong>Ilosc:</strong> {product.quantity}</Typography>
                                            </Grid>
                                        </Grid>
                                    </AccordionDetails>


                                </Accordion>
                            </Box>
                        ))}

                    </Box>
                ))
            ) : (<></>)}



        </div>
    );
}

export default History;