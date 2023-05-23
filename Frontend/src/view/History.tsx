
import Typography from '@mui/material/Typography';
import TopBar from '../TopBar/TopBar';
import { useEffect, useState } from 'react';
import axios from 'axios';

interface HistoryI{
    transactionId: string,
    totalAmount: number,
    deliveryMethod: string,
    transactions: [
        date: string,
        status: string,
        products: [
            productId: string,
            price: number,
            quantity: number,
        ]
    ]
}

function History() {

    const [history, setHistory] = useState<HistoryI>();

    useEffect(() => {
        getHistory();
    },[]);

    const getHistory = async () => {

        axios
        .get(process.env.REACT_APP_BACKEND_URL + "/persons" 
            + "/64679522e57752643a41b1dc" + "/paymenthistory")
        .then((response) => {
            console.log(response.data);
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

            

        
        </div>
    );
}

export default History;