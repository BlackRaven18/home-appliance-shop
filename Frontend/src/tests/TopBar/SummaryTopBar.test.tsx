import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router, useNavigate } from 'react-router-dom';
import SummaryTopBar from '../../TopBar/SummaryTopBar';

jest.mock('react-router-dom', () => {
    const originalModule = jest.requireActual('react-router-dom');

    return {
        ...originalModule,
        useNavigate: jest.fn(),
    };
});

describe('SummaryTopBar', () => {
    it('renders the component with correct text and buttons', () => {
        render(
            <Router>
                <SummaryTopBar />
            </Router>
        );

        expect(screen.getByText(/Lodóweczka/i)).toBeInTheDocument();
        expect(screen.getByText(/Strona główna/i)).toBeInTheDocument();
        expect(screen.getByText(/Powrót do koszyka/i)).toBeInTheDocument();
    });

    it('navigates to "/loginhome" on click', () => {
        const navigate = jest.fn();
        useNavigate.mockReturnValue(navigate);

        render(
            <Router>
                <SummaryTopBar />
            </Router>
        );

        const logo = screen.getByText(/Lodóweczka/i);

        fireEvent.click(logo);

        expect(navigate).toHaveBeenCalledWith('/loginhome');
    });

    it('navigates to "/loginhome" on click of "Strona główna" button', () => {
        const navigate = jest.fn();
        useNavigate.mockReturnValue(navigate);

        render(
            <Router>
                <SummaryTopBar />
            </Router>
        );

        const homeButton = screen.getByText(/Strona główna/i);

        fireEvent.click(homeButton);

        expect(navigate).toHaveBeenCalledWith('/loginhome');
    });

    it('navigates to "/shoppingcart" on click of "Powrót do koszyka" button', () => {
        const navigate = jest.fn();
        useNavigate.mockReturnValue(navigate);

        render(
            <Router>
                <SummaryTopBar />
            </Router>
        );

        const cartButton = screen.getByText(/Powrót do koszyka/i);

        fireEvent.click(cartButton);

        expect(navigate).toHaveBeenCalledWith('/shoppingcart');
    });
});
