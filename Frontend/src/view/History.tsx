import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary, Box, Typography } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import PriceFormatter from '../PriceFormattingUtils/PriceFormatter';
import TopBar from '../TopBar/TopBar';
import UserDataManager from '../UserDataManager/UserDataManager';

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
    imageURL: string,
}

function History() {

    const [history, setHistory] = useState<HistoryI>();
    const userId = UserDataManager.getUserId();

    useEffect(() => {
        getHistory();
    }, []);

    const getHistory = async () => {

        await axios
            .get(process.env.REACT_APP_BACKEND_URL + "/persons/"
                + userId + "/paymenthistory", {
                auth: {
                    username: UserDataManager.getUsername(),
                    password: UserDataManager.getPassword()
                }
            })
            .then((response) => {
                console.log("response in history:" + response.data)
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
                        <Typography>Kwota zamówienia: {PriceFormatter.getFormattedPrice(transaction.totalAmount)}</Typography>
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
                                        <Typography>Produkt {product.name}</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Typography>Id produktu: {product.productId}</Typography>
                                        <Typography>Cena: {PriceFormatter.getFormattedPrice(product.price)}</Typography>
                                        <Typography>Ilosc: {product.quantity}</Typography>
                                        <Typography>Obrazek: {product.imageURL}</Typography>
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