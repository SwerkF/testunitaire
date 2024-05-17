import { render, screen, fireEvent } from '@testing-library/react';
import Input from '../components/Input';

describe('Input Component', () => {
    test('renders without crashing', () => {
        render(<Input type="text" />);
        expect(screen.getByRole('textbox')).toBeInTheDocument();
    });

    test('renders a label when label prop is provided', () => {
        const label = 'Test Label';
        render(<Input label={label} />);
        expect(screen.getByText(label)).toBeInTheDocument();
    });

    test('does not render a label when label prop is not provided', () => {
        render(<Input />);
        expect(screen.queryByLabelText(/label/i)).toBeNull();
    });

    test('applies custom styles when inputstyle and labelstyle are provided', () => {
        const inputstyle = 'test-input-style';
        const labelstyle = 'test-label-style';
        render(<Input inputstyle={inputstyle} labelstyle={labelstyle} label="Test Label" />);
        expect(screen.getByLabelText('Test Label')).toHaveClass('test-label-style');
        expect(screen.getByRole('textbox')).toHaveClass('test-input-style');
    });

    test('calls onChange when the input value is changed', () => {
        const handleChange = jest.fn();
        render(<Input onChange={handleChange} />);
        fireEvent.change(screen.getByRole('textbox'), { target: { value: 'new value' } });
        expect(handleChange).toHaveBeenCalledTimes(1);
    });
});
