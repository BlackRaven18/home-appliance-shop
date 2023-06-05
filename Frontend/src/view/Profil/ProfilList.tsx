import axios from 'axios';
import * as React from 'react';
import { useState } from "react";
import PersonInterface from '../shared/PersonInterface';

const ProfilList = () => {
    const [person, setPerson] = useState<PersonInterface>();

    // funkcja pobierająca dane z bazy danych
    const personId = localStorage.getItem('user');
    React.useEffect(() => {
        getPerson();
    }, []);

    const getPerson = () => {
        console.log("PersonId =" + personId)
        axios
            .get(process.env.REACT_APP_BACKEND_URL + "/persons/" + personId)
            .then( (response)=> {
                setPerson(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    };
    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ marginRight: '32px' }}>
                <img src={require('../Trybiki.png')} alt='' width='600' />
            </div>
            <div>
                <p style={{ fontSize: '20px' }}><strong>Imię:</strong> {person ? person.name : "unknown"}</p>
                <p style={{ fontSize: '20px' }}><strong>Nazwisko:</strong> {person ? person.surname : "unknown"}</p>
                <p style={{ fontSize: '20px' }}><strong>Email:</strong> {person ? person.email : "unknown"}</p>
                <p style={{ fontSize: '20px' }}><strong>Numer telefonu:</strong> {person ? person.phoneNumber : "unknown"}</p>
                <p style={{ fontSize: '20px' }}><strong>Województwo:</strong> {person && person.address && person.address.state ? person.address.state : 'unknown'}</p>
                <p style={{ fontSize: '20px' }}><strong>Miasto:</strong> {person && person.address && person.address.city ? person.address.city : 'unknown'}</p>
                <p style={{ fontSize: '20px' }}><strong>Ulica:</strong> {person && person.address && person.address.street ? person.address.street : 'unknown'}</p>
                <p style={{ fontSize: '20px' }}><strong>Kod pocztowy:</strong> {person && person.address && person.address.postCode ? person.address.postCode : 'unknown'}</p>
            </div>
        </div>
    );
}
export default ProfilList;
