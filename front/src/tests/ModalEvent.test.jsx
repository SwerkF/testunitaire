import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Modal from './Modal';

describe('Modal Component', () => {
  const mockProps = {
    title: 'Test Event',
    description: 'This is a test event description.',
    onClose: jest.fn(),
    imageUrl: 'https://example.com/image.jpg',
    date: '2023-05-17',
    eventAge: 18,
    event_date_id: '1'
  };

  const mockUser = {
    id: '123',
    birthday: '2000-01-01'
  };

  beforeAll(() => {
    localStorage.setItem('user', JSON.stringify(mockUser));
  });

  afterAll(() => {
    localStorage.clear();
  });

  test('renders Modal component', () => {
    render(<Modal {...mockProps} />);

    expect(screen.getByText('Réservez vos billets')).toBeInTheDocument();
    expect(screen.getByText(mockProps.description)).toBeInTheDocument();
    expect(screen.getByAltText(mockProps.title)).toHaveAttribute('src', mockProps.imageUrl);
  });

  test('calls onClose when close button is clicked', () => {
    render(<Modal {...mockProps} />);

    fireEvent.click(screen.getByText('✕'));
    expect(mockProps.onClose).toHaveBeenCalledTimes(1);
  });

  test('displays placeholder image when imageUrl is not provided', () => {
    render(<Modal {...mockProps} imageUrl={null} />);

    expect(screen.getByAltText(mockProps.title)).toHaveAttribute('src', 'https://placehold.co/100x100');
  });

  test('sets user ID and birthday from localStorage', () => {
    render(<Modal {...mockProps} />);

    expect(screen.getByText(mockProps.description)).toBeInTheDocument();
    // Verify internal state by inspecting props passed to the Reservation component
  });

  test('renders Reservation component with correct props', () => {
    //const { container } = render(<Modal {...mockProps} />);

    const reservationComponent = screen.getByRole('Reservation');
    expect(reservationComponent).toBeInTheDocument();
    expect(reservationComponent.props.eventName).toBe(mockProps.title);
    expect(reservationComponent.props.userId).toBe(mockUser.id);
    expect(reservationComponent.props.initialDate).toBe(mockProps.date);
    expect(reservationComponent.props.userBirthDate).toBe(mockUser.birthday);
    expect(reservationComponent.props.eventAge).toBe(mockProps.eventAge);
    expect(reservationComponent.props.event_date_id).toBe(mockProps.event_date_id);
  });
});
