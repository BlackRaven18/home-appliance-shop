import { render, screen } from '@testing-library/react';
import LoginHome from '../../../view/Home/LoginHome';
import { Provider } from 'react-redux';
import { store } from '../../../redux/store';
import { MemoryRouter } from 'react-router-dom';

describe('LoginHome', () => {
    it('renders TopBar, CategoryList, and Products components', () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <LoginHome />
                </MemoryRouter>
            </Provider>
        );

        const topBarElement = screen.getByRole('banner');
        expect(topBarElement).toBeInTheDocument();
    });
});
