import * as React from 'react';
import axios from 'axios';
import {useState} from "react";

interface Person {
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
const Profillist = () => {
    const [person, setPerson] = useState<Person>();
    // funkcja pobierająca dane z bazy danych
    const personId = '64314d722094072d790a5e00';
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
                console.log(error);
            });
    };
    return(
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ marginRight: '32px' }}>
                <img src={require('../Trybiki.png')} alt='' width='600' />
            </div>
            <div>
                <p style={{ fontSize: '20px' }}>Imię: {person ? person.name : "unknown"}</p>
                <p style={{ fontSize: '20px' }}>Nazwisko: {person ? person.surname : "unknown"}</p>
                <p style={{ fontSize: '20px' }}>Email: {person ? person.email : "unknown"}</p>
                <p style={{ fontSize: '20px' }}>Numer telefonu: {person ? person.phoneNumber : "unknown"}</p>
                <p style={{ fontSize: '20px' }}>Województwo: {person && person.address && person.address.state ? person.address.state : 'unknown'}</p>
                <p style={{ fontSize: '20px' }}>Miasto: {person && person.address && person.address.city ? person.address.city : 'unknown'}</p>
                <p style={{ fontSize: '20px' }}>Ulica: {person && person.address && person.address.street ? person.address.street : 'unknown'}</p>
                <p style={{ fontSize: '20px' }}>Kod pocztowy: {person && person.address && person.address.postCode ? person.address.postCode : 'unknown'}</p>
            </div>
        </div>
    );
}
export default Profillist;
