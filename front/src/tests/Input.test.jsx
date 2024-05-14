import { TextEncoder, TextDecoder } from 'util';
import { render, screen } from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom';
import Input from '../components/Input';

describe('Input', () => {
    it('should render Input', () => {
        test('should render Input', () => {
            render(<Input />);
            const input = screen.getByRole('textbox');
            expect(input).toBeInTheDocument();
        });
    });

    it('should render Input with label', () => {
        render(<Input label="Name" />);
        const label = screen.getByText('Name');
        expect(label).toBeInTheDocument();
    });

    it('should render Input with placeholder', () => {
        render(<Input placeholder="Enter your name" />);
        const input = screen.getByPlaceholderText('Enter your name');
        expect(input).toBeInTheDocument();
    });

    it('should render Input with type', () => {
        render(<Input type="text" />);
        const input = screen.getByRole('textbox');
        expect(input).toBeInTheDocument();
    });
});


