import { Box, Button, TextField } from "@mui/material";
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { useEffect, useState } from "react";
import UserDataManager from "../../UserDataManager/UserDataManager";
import PersonInterface from "../shared/PersonInterface";

interface TransactionInterface {
    transactionId: string;
    transactions: TransactionInfoInterface[];
}

interface TransactionInfoInterface {
    transactionId: string;
    date: string;
    status: string;
}

interface ExtendedPersonInterface extends PersonInterface {
    personId: string;
    transactionsHistory: TransactionInterface;
}

const ManagePayments = () => {
    const [people, setPeople] = useState<ExtendedPersonInterface[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [expandedTransactionIds, setExpandedTransactionIds] = useState<string[]>([]);

    useEffect(() => {
        getUsers();
    }, []);

    const getUsers = () => {
        axios
            .get(process.env.REACT_APP_BACKEND_URL + "/persons", {
                auth: {
                    username: UserDataManager.getUsername(),
                    password: UserDataManager.getPassword()
                }
            })
            .then((response) => {
                setPeople(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    const handleSearchTermChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const toggleTransactionExpansion = (transactionId: string) => {
        if (expandedTransactionIds.includes(transactionId)) {
            setExpandedTransactionIds(expandedTransactionIds.filter(id => id !== transactionId));
        } else {
            setExpandedTransactionIds([...expandedTransactionIds, transactionId]);
        }
    };

    const filteredPeople = people.filter((person) => {
        const fullName = `${person.name} ${person.surname}`;
        return fullName.toLowerCase().includes(searchTerm.toLowerCase());
    });

    const handleAcceptTransaction = (transactionId: string) => {
        axios.post(
            process.env.REACT_APP_BACKEND_URL + "/transactions/" + transactionId + "/accept",
            {},
            {
                auth: {
                    username: UserDataManager.getUsername(),
                    password: UserDataManager.getPassword()
                }
            }
        )
            .then((response) => {
                getUsers();
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <>
            <Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} gap={2}>
                <Box flex="1">
                    <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                        <TextField
                            label="Wyszukaj osobę"
                            variant="outlined"
                            value={searchTerm}
                            onChange={handleSearchTermChange}
                            style={{ marginTop: '20px' }}
                        />
                        {filteredPeople.length === 0 ? (
                            <Typography>Nie znaleziono osób spełniających kryteria wyszukiwania</Typography>
                        ) : (
                            filteredPeople.map((person, index) => (
                                <div key={index} style={{
                                    border: '1px solid #ccc',
                                    borderRadius: '5px',
                                    padding: '10px',
                                    margin: '20px',
                                }}>
                                    <p style={{ fontSize: '20px' }}><strong>Imię:</strong> {person ? person.name : 'unknown'}</p>
                                    <p style={{ fontSize: '20px' }}><strong>Nazwisko:</strong> {person ? person.surname : 'unknown'}</p>
                                    <p style={{ fontSize: '20px' }}><strong>Email:</strong> {person ? person.email : 'unknown'}</p>
                                    <p style={{ fontSize: '20px' }}><strong>Numer telefonu:</strong> {person ? person.phoneNumber : 'unknown'}</p>
                                    {person.transactionsHistory.transactions ? (
                                        person.transactionsHistory.transactions.map((transaction, transactionIndex) => (
                                            <div key={transactionIndex} style={{ marginTop: '10px' }}>
                                                <Button
                                                    variant="outlined"
                                                    color="primary"
                                                    onClick={() => toggleTransactionExpansion(transaction.transactionId)}
                                                    style={{ marginBottom: '10px' }}
                                                >
                                                    {expandedTransactionIds.includes(transaction.transactionId) ? 'Ukryj' : 'Pokaż'} transakcję
                                                </Button>
                                                {expandedTransactionIds.includes(transaction.transactionId) && (
                                                    <>
                                                        <p style={{ fontSize: '16px' }}><strong>Id:</strong> {transaction.transactionId}</p>
                                                        <p style={{ fontSize: '16px' }}><strong>Data transakcji:</strong> {transaction.date}</p>
                                                        <p style={{ fontSize: '16px' }}><strong>Status transakcji:</strong> {transaction.status}</p>
                                                        {transaction.status === 'failed' && (
                                                            <Button
                                                                variant="contained"
                                                                color="primary"
                                                                size="small"
                                                                onClick={() => handleAcceptTransaction(transaction.transactionId)}
                                                            >
                                                                Zatwierdź
                                                            </Button>
                                                        )}
                                                    </>
                                                )}
                                            </div>
                                        ))
                                    ) : (
                                        <p>Brak historii transakcji dla tej osoby.</p>
                                    )}
                                </div>
                            ))
                        )}
                    </div>
                </Box>
            </Box>
        </>
    );
};

export default ManagePayments;