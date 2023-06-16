import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import AdminTopBar from '../../TopBar/AdminTopBar';
import UserDataManager from '../../UserDataManager/UserDataManager';

jest.mock('../../UserDataManager/UserDataManager');

describe('AdminTopBar', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders the component with correct text and buttons', () => {
        render(
            <Router>
                <AdminTopBar />
            </Router>
        );

        expect(screen.getByText(/Lodóweczka/i)).toBeInTheDocument();
        expect(screen.getByText(/Strona główna/i)).toBeInTheDocument();
        expect(screen.getByText(/Profil/i)).toBeInTheDocument();
        expect(screen.getByText(/Wyloguj/i)).toBeInTheDocument();
    });

    it('navigates to "/adminLogin" on logout', () => {
        render(
            <Router>
                <AdminTopBar />
            </Router>
        );

        const logoutButton = screen.getByText(/Wyloguj/i);

        fireEvent.click(logoutButton);

        expect(UserDataManager.clearData).toHaveBeenCalled();
        expect(UserDataManager.isLogged).toHaveBeenCalled();
        expect(screen.queryByText(/Wyloguj/i)).toBeNull();
        expect(screen.getByText(/Lodóweczka/i)).toBeInTheDocument();
        expect(screen.getByText(/Strona główna/i)).toBeInTheDocument();
        expect(screen.getByText(/Profil/i)).toBeInTheDocument();
        expect(screen.queryByText(/An error occurred while logging out/i)).toBeNull();
    });

    it('logs an error if logout fails', () => {
        (UserDataManager.isLogged as jest.Mock).mockReturnValue(true);

        render(
            <Router>
                <AdminTopBar />
            </Router>
        );

        const logoutButton = screen.getByText(/Wyloguj/i);

        fireEvent.click(logoutButton);

        expect(UserDataManager.clearData).toHaveBeenCalled();
        expect(UserDataManager.isLogged).toHaveBeenCalled();
        expect(screen.queryByText(/Wyloguj/i)).not.toBeInTheDocument();
        expect(screen.getByText(/Lodóweczka/i)).toBeInTheDocument();
        expect(screen.getByText(/Strona główna/i)).toBeInTheDocument();
        expect(screen.getByText(/Profil/i)).toBeInTheDocument();
        expect(screen.getByText(/An error occurred while logging out/i)).toBeInTheDocument();
    });

});
