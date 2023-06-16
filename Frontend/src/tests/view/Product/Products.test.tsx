import { render, screen } from '@testing-library/react';
import { useSelector } from 'react-redux';
import Products from '../../../view/Product/Products';

jest.mock('react-redux', () => ({
    useSelector: jest.fn(),
}));

const mockedUseSelector = useSelector as jest.MockedFunction<typeof useSelector>;

it('renders products component with category name', () => {
    const mockCategory = {
        categoryId: '1',
        name: 'Category 1',
    };

    mockedUseSelector.mockReturnValue(mockCategory);

    render(<Products />);

    const categoryTitle = screen.getByText('Category 1');
    expect(categoryTitle).toBeInTheDocument();
});