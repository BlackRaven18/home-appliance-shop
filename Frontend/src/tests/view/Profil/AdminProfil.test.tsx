import React from 'react';
import { render } from '@testing-library/react';
import AdminProfil from '../../../view/Profil/AdminProfil';
import {MemoryRouter} from "react-router-dom";

describe('AdminProfil', () => {
    it('renders admin profil', () => {
        render(
            <MemoryRouter>
                <AdminProfil />
            </MemoryRouter>
        );
    });
});
