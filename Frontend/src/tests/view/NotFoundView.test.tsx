import React from 'react';
import { render, screen } from '@testing-library/react';
import NotFoundView from '../../view/NotFoundView';

describe('NotFoundView', () => {
    it('should render text correctly', () => {
        render(<NotFoundView />);
        const textElement = screen.getByText('Coś poszło nie tak, strony nie znaleziono!');
        expect(textElement).toBeTruthy();
    });

    it('should render avatar image correctly', () => {
        render(<NotFoundView />);
        const avatarImage = screen.getByRole('img');
        expect(avatarImage).toBeInTheDocument();
        expect(avatarImage.getAttribute('src')).toEqual('logo.jpg');
    });
});
