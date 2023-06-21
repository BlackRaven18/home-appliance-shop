import React from 'react';
import { render } from '@testing-library/react';
import Profil from '../../../view/Profil/Profil';
import {MemoryRouter} from "react-router-dom";
import { Provider } from "react-redux";
import { store } from '../../../redux/store';

describe('Profil', () => {
    it('renders without errors', () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <Profil />
                </MemoryRouter>
            </Provider>
        );
    });
});