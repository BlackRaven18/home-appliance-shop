import * as React from 'react';
import Typography from '@mui/material/Typography';
import TopBar from '../TopBar/TopBar';
import axios from 'axios';
import {useState} from "react";

interface Person {
    name: string;
    surname: string;
}

function Profil() {
    const [person, setPerson] = useState<Person>();
    // funkcja pobierająca dane z bazy danych
    const personId = localStorage.getItem('user');
    React.useEffect(() => {
        getPerson();
    }, []);
    const getPerson = () => {
        axios
            .get(process.env.REACT_APP_BACKEND_URL + "/persons/" + personId)
            .then( (response)=> {
                setPerson(response.data);
            })
            .catch(function (error) {
                setPerson({name: "", surname: ""});
                console.log(error);
            });
    };



    return (
        <div>
            <TopBar />
            <Typography variant="h4" align="center" sx={{ mt: 2 }}>
                Profil
            </Typography>
            <div>
                <img src={require('./Trybiki.png')} alt='' width='600'/>
                <div>
                    <p>Imię: {person? person.name: "unknown"}</p>
                    <p>Nazwisko: {person? person.surname: "unknown"}</p>
                </div>
            </div>
        </div>
    );
}

export default Profil;
