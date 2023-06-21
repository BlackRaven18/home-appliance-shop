import { render, screen } from '@testing-library/react';
import AdminCategoryList from '../../../view/AdminHome/AdminCategoryList';

describe('AdminCategoryList', () => {
    it('renders category list with items', () => {
        render(<AdminCategoryList />);
        const categoryItems = screen.getAllByRole('button'); // Update role to 'button'
        expect(categoryItems).toHaveLength(3);
    });
});
