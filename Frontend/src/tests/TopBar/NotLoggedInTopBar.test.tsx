import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router, useNavigate } from 'react-router-dom';
import NotLoggedInTopBar from '../../TopBar/NotLoggedInTopBar';

jest.mock('react-router-dom', () => {
    const originalModule = jest.requireActual('react-router-dom');

    return {
        ...originalModule,
        useNavigate: jest.fn(),
    };
});

describe('NotLoggedInTopBar', () => {
    it('renders the component with correct text and buttons', () => {
        render(
            <Router>
                <NotLoggedInTopBar />
            </Router>
        );

        expect(screen.getByText(/Lodóweczka/i)).toBeInTheDocument();
        expect(screen.getByText(/Strona główna/i)).toBeInTheDocument();
        expect(screen.getByText(/Logowanie/i)).toBeInTheDocument();
        expect(screen.getByText(/Rejestracja/i)).toBeInTheDocument();
    });

    it('navigates to "/home" on click', () => {
        const navigate = jest.fn();
        (useNavigate as jest.Mock).mockReturnValue(navigate);

        render(
            <Router>
                <NotLoggedInTopBar />
            </Router>
        );

        const logo = screen.getByText(/Lodóweczka/i);

        fireEvent.click(logo);

        expect(navigate).toHaveBeenCalledWith('/home');
    });
});