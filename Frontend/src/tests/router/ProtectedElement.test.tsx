import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import UserDataManager from '../../UserDataManager/UserDataManager';
import ProtectedElement from '../../router/ProtectedElement';

jest.mock('../../UserDataManager/UserDataManager');

describe('ProtectedElement', () => {
    const MockComponent = () => <div>Mock Component</div>;
    const redirectPath = '/login';

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('renders element if user is logged in and allowLoggedInUser is true', () => {
        UserDataManager.isLogged = jest.fn().mockReturnValue(true);

        const props = {
            element: <MockComponent />,
            redirectPath,
            allowLoggedInUser: true,
        };

        render(
            <MemoryRouter>
                <ProtectedElement {...props} />
            </MemoryRouter>
        );

        expect(screen.getByText('Mock Component')).toBeInTheDocument();
        expect(UserDataManager.isLogged).toHaveBeenCalled();
    });

    it('renders element if user is not logged in and allowLoggedInUser is false', () => {
        UserDataManager.isLogged = jest.fn().mockReturnValue(false);

        const props = {
            element: <MockComponent />,
            redirectPath,
            allowLoggedInUser: false,
        };

        render(
            <MemoryRouter>
                <ProtectedElement {...props} />
            </MemoryRouter>
        );

        expect(screen.getByText('Mock Component')).toBeInTheDocument();
        expect(UserDataManager.isLogged).toHaveBeenCalled();
    });
});
