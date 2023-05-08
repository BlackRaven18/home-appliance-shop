import * as React from 'react';
import Typography from '@mui/material/Typography';
import Topbar from './../topbar/Topbar';
import axios from 'axios';
import {useState} from "react";

let url = 'http://localhost:8080';

interface Person {
    name: string;
    surname: string;
}

function Profil() {
    const [person, setPerson] = useState<Person>({name: "mietek", surname: "wolski"});
    // funkcja pobierająca dane z bazy danych
    const personId = '64314d722094072d790a5e00';
    React.useEffect(() => {
        getPerson();
    }, []);
    const getPerson = () => {
        axios
            .get(`http://localhost:8080/persons?personId=64314d722094072d790a5e00`)
            .then( (response)=> {
                setPerson(response.data);
            })
            .catch(function (error) {
                setPerson({name: "a", surname: "b"});
                console.log(error);
            });
    };



    return (
        <div>
            <Topbar />
            <Typography variant="h4" align="center" sx={{ mt: 2 }}>
                Profil
            </Typography>
            <div>
                <img src={require('./Trybiki.png')} alt='' width='600'/>
                <div>
                    <p>Imię: {person.name}</p>
                    <p>Nazwisko: {person.surname}</p>
                </div>
            </div>
        </div>
    );
}

export default Profil;
