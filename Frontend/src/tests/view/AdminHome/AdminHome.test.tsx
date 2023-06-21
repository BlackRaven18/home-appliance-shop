import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AdminHome from '../../../view/AdminHome/AdminHome';

describe('AdminHome', () => {
    it('renders AdminTopBar', () => {
        render(
            <MemoryRouter>
                <AdminHome />
            </MemoryRouter>
        );
        const adminTopBar = screen.getByRole('banner');
        expect(adminTopBar).toBeInTheDocument();
    });

    it('renders AdminCategoryList', () => {
        render(
            <MemoryRouter>
                <AdminHome />
            </MemoryRouter>
        );
        const adminCategoryList = screen.getByRole('list');
        expect(adminCategoryList).toBeInTheDocument();
    });
});
