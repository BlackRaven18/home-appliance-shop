import { render, screen, fireEvent } from '@testing-library/react';
import { useNavigate } from 'react-router';
import SummaryProductElement from '../../../view/Summary/SummaryProductElement';

jest.mock('react-router', () => ({
    useNavigate: jest.fn(),
}));

describe('SummaryProductElement', () => {
    const category = {
        categoryId: '1',
        name: 'Category name',
    };
    const productDetails = {
        productId: '1',
        name: 'Product 1',
        brand: 'Brand 1',
        color: 'Red',
        specification: 'Specification 1',
        price: 10,
        imageURL: 'image-url',
        category,
    };

    const quantity = 2;

    it('renders product details correctly', () => {
        render(
            <SummaryProductElement
                quantity={quantity}
                productDetails={productDetails}
            />
        );

        expect(screen.getByText(`Nazwa: ${productDetails.name}`)).toBeInTheDocument();
        expect(screen.getByText(`Marka: ${productDetails.brand}`)).toBeInTheDocument();
        expect(screen.getByText(`Kolor: ${productDetails.color}`)).toBeInTheDocument();
        expect(screen.getByText(`Specyfikacja: ${productDetails.specification}`)).toBeInTheDocument();
        expect(screen.getByText(`Cena: ${productDetails.price}`)).toBeInTheDocument();
        expect(screen.getByText(`Ilosc: ${quantity}`)).toBeInTheDocument();
    });

    it('navigates to product details page on click', () => {
        const navigateMock = jest.fn();
        (useNavigate as jest.Mock).mockReturnValue(navigateMock);

        render(
            <SummaryProductElement
                quantity={quantity}
                productDetails={productDetails}
            />
        );

        fireEvent.click(screen.getByText(`Nazwa: ${productDetails.name}`));
        expect(navigateMock).toHaveBeenCalledWith('/productdetails', { state: productDetails });
    });
});
