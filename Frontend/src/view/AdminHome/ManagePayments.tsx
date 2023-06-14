import Typography from '@mui/material/Typography';
import { useState, useEffect } from "react";
import axios from 'axios';
import PersonInterface from "../shared/PersonInterface";
import { Button, TextField, Box } from "@mui/material";
import Grid from "@mui/material/Grid";
import UserDataManager from "../../UserDataManager/UserDataManager";

interface TransactionInterface {
    transactionId: string;
    transactions: string[];
}

interface ExtendedPersonInterface extends PersonInterface {
    personId: string;
    transactionsHistory: TransactionInterface;
}

const ManagePayments = () => {
    const [people, setPeople] = useState<ExtendedPersonInterface[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPerson, setCurrentPerson] = useState<ExtendedPersonInterface | null>(null);
    const [approvedTransactions, setApprovedTransactions] = useState<TransactionInterface[]>([]);


    useEffect(() => {
        if (people.length < 1)
            getUsers();

        getTrans("646d18b61cc8495ea08cf58e");
        getTrans("64679522e57752643a41b1dc");
        /*people.forEach((element) => {
            const transId = element.transactionsHistory.transactionId;

            console.log(transId);
            getTrans(transId);
        });*/
    }, [people]);

    const getUsers = () => {
        axios
            .get(`${process.env.REACT_APP_BACKEND_URL}/persons`,{
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

    const getTrans = ( id : string) => {
        axios
            .get(`${process.env.REACT_APP_BACKEND_URL}/persons/`+id+`/paymenthistory`,{
                auth: {
                    username: UserDataManager.getUsername(),
                    password: UserDataManager.getPassword()
                }
            })
            .then((response) => {
                setApprovedTransactions(oldArray  => [...oldArray, response.data]);
                //console.log(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    const handleSearchTermChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const filteredPeople = people.filter((person) => {
        const fullName = `${person.name} ${person.surname}`;
        return fullName.toLowerCase().includes(searchTerm.toLowerCase());
    });

    const handleTransactionApproval = (personId: string, date: string) => {
        // Znajdź osobę na podstawie personId
        //const person = people.find((person) => person.personId === personId);

        const person = {};
        console.log(person);
        if (person) {
            // Znajdź transakcję w historii transakcji osoby na podstawie daty
            //console.log(person.transactions_history);

            //const transaction = person.transactions_history.find((transaction) => transaction.date === date);

            /*if (transaction) {
                // Zaktualizuj status transakcji na "manually-accepted"
                transaction.status = 'manually-accepted';

                // Dodaj transakcję do zatwierdzonych transakcji
                setApprovedTransactions([...approvedTransactions, `${personId}_${date}`]);
            }*/
        }
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
                                    margin: '20px'
                                }}>
                                    <p style={{ fontSize: '20px' }}><strong>Imię:</strong> {person ? person.name : 'unknown'}</p>
                                    <p style={{ fontSize: '20px' }}><strong>Nazwisko:</strong> {person ? person.surname : 'unknown'}</p>
                                    <p style={{ fontSize: '20px' }}><strong>Email:</strong> {person ? person.email : 'unknown'}</p>
                                    <p style={{ fontSize: '20px' }}><strong>Numer telefonu:</strong> {person ? person.phoneNumber : 'unknown'}</p>
                                    {/*{person.transactions_history ? (*/}
                                    {/*    person.transactions_history.map((transaction, transactionIndex) => (*/}
                                    {/*        <div key={transactionIndex} style={{ marginTop: '10px' }}>*/}
                                    {/*            <p style={{ fontSize: '16px' }}><strong>Data transakcji:</strong> {transaction.date}</p>*/}
                                    {/*            <p style={{ fontSize: '16px' }}><strong>Status transakcji:</strong> {transaction.status}</p>*/}
                                    {/*            {transaction.status === 'failed' && (*/}
                                    {/*                <Button*/}
                                    {/*                    variant="contained"*/}
                                    {/*                    color="primary"*/}
                                    {/*                    size="small"*/}
                                    {/*                    onClick={() => handleTransactionApproval(person.personId, transaction.date)}*/}
                                    {/*                    disabled={approvedTransactions.includes(`${person.personId}_${transaction.date}`)}*/}
                                    {/*                >*/}
                                    {/*                    Zatwierdź*/}
                                    {/*                </Button>*/}

                                    {/*            )*/}
                                    {/*            }*/}
                                    {/*        </div>*/}
                                    {/*    ))*/}
                                    {/*) : (*/}
                                    {/*    <p>Brak historii transakcji dla tej osoby.</p>*/}
                                    {/*)}*/}
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
