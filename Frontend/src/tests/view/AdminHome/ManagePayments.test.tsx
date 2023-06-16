import React from 'react';
import { render,screen } from '@testing-library/react';
import ManagePayments from '../../../view/AdminHome/ManagePayments';

describe('ManagePayments component', () => {
    it('renders "Zarzadzaj płatnościami" text', () => {
        render(<ManagePayments />);
        const textElement = screen.getByText('Zarzadzaj płatnościami');
        expect(textElement).toBeInTheDocument();
    });

    it('renders Typography component', () => {
        render(<ManagePayments />);
        const typographyElement = screen.getByText('Zarzadzaj płatnościami', { selector: 'p' });
        expect(typographyElement).toBeInTheDocument();
    });
});