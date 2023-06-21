import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import SummaryTopBar from '../../TopBar/SummaryTopBar';

jest.mock('react-router-dom', () => {
    return {
        ...jest.requireActual('react-router-dom'),
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
        jest.spyOn(require('react-router-dom'), 'useNavigate').mockReturnValue(navigate);

        render(
            <Router>
                <SummaryTopBar />
            </Router>
        );

        const logo = screen.getByText(/Lodóweczka/i);

        fireEvent.click(logo);

        expect(navigate).toHaveBeenCalledWith('/loginhome');
    });
});
