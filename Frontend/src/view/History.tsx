
import { Typography, Box, Divider, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import TopBar from '../TopBar/TopBar';
import { useEffect, useState } from 'react';
import axios from 'axios';
import PriceFormatter from '../PriceFormattingUtils/PriceFormatter';

interface HistoryI {
    transactionId: string,
    transactions: TransactionI[],
}

interface TransactionI {
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
}

function History() {

    const [history, setHistory] = useState<HistoryI>();

    useEffect(() => {
        getHistory();
    }, []);

    const getHistory = async () => {

        await axios
            .get(process.env.REACT_APP_BACKEND_URL + "/persons"
                + "/64679522e57752643a41b1dc" + "/paymenthistory")
            .then((response) => {
                setHistory(response.data);
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
                        <Typography>Data: {transaction.date}</Typography>
                        <Typography>Status: {transaction.status}</Typography>
                        <Typography>Metoda dostawy: {transaction.deliveryMethod}</Typography>
                        <Typography>Kwota zamówienia: {transaction.totalAmount}</Typography>
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
                                        <Typography>Produkt {product.productId}</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Typography>Id produktu: {product.productId}</Typography>
                                        <Typography>Cena: {PriceFormatter.getFormattedPrice(product.price)}</Typography>
                                        <Typography>Ilosc: {product.quantity}</Typography>
                                    </AccordionDetails>
                                </Accordion>
                            </Box>
                        ))}

                    </Box>
                ))
            ) : (
                <p></p>
            )}



        </div>
    );
}

export default History;