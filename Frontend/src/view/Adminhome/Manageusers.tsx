import * as React from 'react';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import {useState} from "react";
import {Button, TextField} from "@mui/material";
import {FacebookLoginButton} from "react-social-login-buttons";
import Grid from "@mui/material/Grid";
import LinkMaterial from "@mui/material/Link";
import {Link} from "react-router-dom";
import Box from "@mui/material/Box";
import { useEffect } from "react";

let url = 'http://localhost:8080';

interface Person {
    personId: string;
    name: string;
    surname: string;
    email: string;
    phoneNumber: string;
    address: {
        state: string;
        city: string;
        street: string;
        postCode: string;
    };
}

const Manageusers = () => {
    const [people, setPeople] = useState<Person[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [personId, setPersonId] = useState("");

    React.useEffect(() => {
        getUsers();
    }, []);

    const getUsers = () => {
        axios
            .get(url + '/persons')
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

    const handleDeleteUser = async (personId: string) => {
        try {
            await axios.delete(url + '/persons/' + personId);
            getUsers(); // reload the user list after deleting the user
        } catch (error) {
            console.error(error);
        }
    }

    const filteredPeople = people.filter((person) => {
        const fullName = `${person.name} ${person.surname}`;
        return fullName.toLowerCase().includes(searchTerm.toLowerCase());
    });

    const [isModifyClicked, setIsModifyClicked] = useState(false);
    const [newFirstName, setNewFirstName] = useState("");
    const handleModifyClick = (personId: string) => {
        setIsModifyClicked(true);
        setPersonId(personId);
    };

    const handleModifySubmit = async () => {
        try {
            // Wyślij zmodyfikowane dane na serwer
            await axios.put(url + '/persons/' + personId, {
                name: newFirstName,
                // Dodaj inne pola, które mogą być modyfikowane
            });
            getUsers(); // załaduj ponownie listę użytkowników po modyfikacji
            setIsModifyClicked(false); // Zresetuj stan po zatwierdzeniu modyfikacji
        } catch (error) {
            console.error(error);
        }
    }

    const handleFirstNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewFirstName(event.target.value);
    };

    return (
        <>
            <div style={{display: 'flex', flexDirection: 'column', flex: 1}}>
                <TextField
                    label="Wyszukaj osobę"
                    variant="outlined"
                    value={searchTerm}
                    onChange={handleSearchTermChange}
                    style={{marginTop: '20px'}}
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
                            <p style={{fontSize: '20px'}}>Imię: {person ? person.name : 'unknown'}</p>
                            <p style={{fontSize: '20px'}}>Nazwisko: {person ? person.surname : 'unknown'}</p>
                            <p style={{fontSize: '20px'}}>Email: {person ? person.email : 'unknown'}</p>
                            <p style={{fontSize: '20px'}}>Numer telefonu: {person ? person.phoneNumber : 'unknown'}</p>
                            <p style={{fontSize: '20px'}}>Województwo: {person && person.address && person.address.state ? person.address.state : 'unknown'}</p>
                            <p style={{fontSize: '20px'}}>Miasto: {person && person.address && person.address.city ? person.address.city : 'unknown'}</p>
                            <p style={{fontSize: '20px'}}>Ulica: {person && person.address && person.address.street ? person.address.street : 'unknown'}</p>
                            <p style={{fontSize: '20px'}}>Kod pocztowy: {person && person.address && person.address.postCode ? person.address.postCode : 'unknown'}</p>
                            <Button variant="contained" style={{ margin: '15px' }} onClick={() => handleDeleteUser(person.personId)}>Usuń</Button>
                            <Button variant="contained" onClick={() => handleModifyClick(person.personId)}>Modyfikuj</Button>

                            {isModifyClicked && personId === person.personId && (
                                <>
                                    <TextField
                                        label="Nowe imię"
                                        variant="outlined"
                                        value={newFirstName}
                                        onChange={handleFirstNameChange}
                                        style={{ marginTop: '20px' }}
                                    />
                                    <Button variant="contained" onClick={handleModifySubmit}>
                                        Zatwierdź
                                    </Button>
                                </>
                            )}


                        </div>
                    ))
                )}
            </div>
            <Box
                component="form"
                noValidate
                sx={{
                    ml: 1,
                    width: '400px' // Add this line to set the width of the Box
                }}
                style={{ margin: '5px' }}
            >
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Adres email"
                    name="email"
                    autoComplete="email"
                    autoFocus
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Hasło"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="name"
                    label="Imię"
                    id="name"
                    autoComplete="Imię"
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="surname"
                    label="Nazwisko"
                    id="surname"
                    autoComplete="Nazwisko"
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Zarejestruj użytkownika
                </Button>

            </Box>
        </>
    );
};

export default Manageusers;
