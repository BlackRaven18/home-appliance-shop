import { Button, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import axios from 'axios';
import * as React from 'react';
import { useState } from "react";
import LoadingSpinner from "../LoadingSpinner";
import PersonInterface from '../shared/PersonInterface';

interface ExtendedPersonInterface extends PersonInterface {
    personId: string,
}

const ManageUsers = () => {
    const [people, setPeople] = useState<ExtendedPersonInterface[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [personId, setPersonId] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const [isModifyClicked, setIsModifyClicked] = useState(false);
    const [newFirstName, setNewFirstName] = useState("");
    const [newLastName, setNewLastName] = useState("");
    const [newEmail, setNewEmail] = useState("");
    const [newNumber, setNewNumber] = useState("");
    const [newState, setNewState] = useState("");
    const [newCity, setNewCity] = useState("");
    const [newStreet, setNewStreet] = useState("");
    const [newPostCode, setNewPostCode] = useState("");

    React.useEffect(() => {
        getUsers();
    }, []);

    const getUsers = () => {
        setIsLoading(true)

        axios
            .get(process.env.REACT_APP_BACKEND_URL + '/persons')
            .then((response) => {
                setPeople(response.data);
                setIsLoading(false);
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
            await axios.delete(process.env.REACT_APP_BACKEND_URL + '/persons/' + personId);
            getUsers(); // reload the user list after deleting the user
        } catch (error) {
            console.error(error);
        }
    }

    const filteredPeople = people.filter((person) => {
        const fullName = `${person.name} ${person.surname}`;
        return fullName.toLowerCase().includes(searchTerm.toLowerCase());
    });

    const handleModifyClick = (personId: string) => {
        setIsModifyClicked(true);
        setPersonId(personId);
    };

    const handleModifySubmit = async () => {
        try {
            await axios.put(process.env.REACT_APP_BACKEND_URL + '/persons/' + personId, {
                name: newFirstName,
                surname: newLastName,
                email: newEmail,
                phoneNumber: newNumber,
                address: {
                    state: newState,
                    city: newCity,
                    street: newStreet,
                    postCode: newPostCode
                }
            });
            getUsers(); // załaduj ponownie listę użytkowników po modyfikacji
            setIsModifyClicked(false); // Zresetuj stan po zatwierdzeniu modyfikacji
        } catch (error) {
            console.error(error);
        }
    };


    const handleFirstNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewFirstName(event.target.value);
    };
    const handleLastNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewLastName(event.target.value);
    };
    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewEmail(event.target.value);
    };
    const handleNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewNumber(event.target.value);
    };
    const handleStateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewState(event.target.value);
    };
    const handleCityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewCity(event.target.value);
    };
    const handleStreetChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewStreet(event.target.value);
    };
    const handlePostCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewPostCode(event.target.value);
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

                        {isLoading ? (
                            <LoadingSpinner label='Trwa ładowanie użytkowników...' />
                        ) : <></>}

                        {filteredPeople.length !== 0 ? (
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
                                    <p style={{ fontSize: '20px' }}><strong>Województwo:</strong> {person && person.address && person.address.state ? person.address.state : 'unknown'}</p>
                                    <p style={{ fontSize: '20px' }}><strong>Miasto:</strong> {person && person.address && person.address.city ? person.address.city : 'unknown'}</p>
                                    <p style={{ fontSize: '20px' }}><strong>Ulica:</strong> {person && person.address && person.address.street ? person.address.street : 'unknown'}</p>
                                    <p style={{ fontSize: '20px' }}><strong>Kod pocztowy:</strong> {person && person.address && person.address.postCode ? person.address.postCode : 'unknown'}</p>

                                    <Button variant="contained" style={{ margin: '15px' }}
                                        onClick={() => handleDeleteUser(person.personId)}>Usuń</Button>

                                    <Button variant="contained"
                                        onClick={() => handleModifyClick(person.personId)}>Modyfikuj</Button>

                                    {isModifyClicked && personId === person.personId && (
                                        <Grid container direction="column" spacing={2}>
                                            <Grid item>
                                                <TextField
                                                    label="Nowe imię"
                                                    variant="outlined"
                                                    value={newFirstName}
                                                    onChange={handleFirstNameChange}
                                                    style={{ margin: '5px' }}
                                                />
                                                <TextField
                                                    label="Nowe nazwisko"
                                                    variant="outlined"
                                                    value={newLastName}
                                                    onChange={handleLastNameChange}
                                                    style={{ margin: '5px' }}
                                                />
                                                <TextField
                                                    label="Nowy email"
                                                    variant="outlined"
                                                    value={newEmail}
                                                    onChange={handleEmailChange}
                                                    style={{ margin: '5px' }}
                                                />
                                                <TextField
                                                    label="Nowy numer telefonu"
                                                    variant="outlined"
                                                    value={newNumber}
                                                    onChange={handleNumberChange}
                                                    style={{ margin: '5px' }}
                                                />
                                                <TextField
                                                    label="Nowe województwo"
                                                    variant="outlined"
                                                    value={newState}
                                                    onChange={handleStateChange}
                                                    style={{ margin: '5px' }}
                                                />
                                                <TextField
                                                    label="Nowe miasto"
                                                    variant="outlined"
                                                    value={newCity}
                                                    onChange={handleCityChange}
                                                    style={{ margin: '5px' }}
                                                />
                                                <TextField
                                                    label="Nowa ulica"
                                                    variant="outlined"
                                                    value={newStreet}
                                                    onChange={handleStreetChange}
                                                    style={{ margin: '5px' }}
                                                />
                                                <TextField
                                                    label="Nowy kod pocztowy"
                                                    variant="outlined"
                                                    value={newPostCode}
                                                    onChange={handlePostCodeChange}
                                                    style={{ margin: '5px' }}
                                                />
                                            </Grid>
                                            <Grid item>
                                                <Button variant="contained" onClick={handleModifySubmit}>
                                                    Zatwierdź
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    )}
                                </div>
                            ))
                        ) : (<></>)}
                    </div>
                </Box>
                <Box flex="1">
                    <Box
                        component="form"
                        noValidate
                        sx={{
                            ml: 1,
                            width: '400px'
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
                </Box>
            </Box>
        </>
    );
};

export default ManageUsers;