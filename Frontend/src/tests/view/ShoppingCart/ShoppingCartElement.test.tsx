import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../../../redux/store';
import ShoppingCartElement from '../../../view/ShoppingCart/ShoppingCartElement';

describe('ShoppingCartElement', () => {
    const productDetails = {
        productId: '1',
        name: 'Product 1',
        brand: 'Brand 1',
        color: 'Red',
        specification: 'Spec 1',
        price: 9.99,
        imageURL: 'image.jpg',
        category: {
            categoryId: '1',
            name: 'Category 1',
        },
    };

    it('renders product details correctly', () => {
        const quantity = 2;
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <ShoppingCartElement quantity={quantity} productDetails={productDetails} />
                </MemoryRouter>
            </Provider>
        );

        expect(screen.getByText('Product 1')).toBeInTheDocument();
        expect(screen.getByText('Brand 1')).toBeInTheDocument();
        expect(screen.getByText('Red')).toBeInTheDocument();
        expect(screen.getByText('Spec 1')).toBeInTheDocument();
        expect(screen.getByText('9,99 zł')).toBeInTheDocument();
        expect(screen.getByText('2')).toBeInTheDocument();
    });

    it('increments quantity when clicking "+" button', () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <ShoppingCartElement quantity={1} productDetails={productDetails} />
                </MemoryRouter>
            </Provider>
        );

        fireEvent.click(screen.getByText('+'));
    });

    it('decrements quantity when clicking "-" button', () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <ShoppingCartElement quantity={2} productDetails={productDetails} />
                </MemoryRouter>
            </Provider>
        );

        fireEvent.click(screen.getByText('-'));
    });

    // it('navigates to product details when clicked', () => {
    //     const navigate = jest.fn();
    //     render(
    //         <Provider store={store}>
    //             <MemoryRouter>
    //                 <ShoppingCartElement
    //                     quantity={1}
    //                     productDetails={productDetails}
    //                     navigate={navigate}
    //                 />
    //             </MemoryRouter>
    //         </Provider>
    //     );
    //
    //     fireEvent.click(screen.getByText('Product 1'));
    //     expect(navigate).toHaveBeenCalledWith('/productdetails', {
    //         state: productDetails,
    //     });
    // });
});
