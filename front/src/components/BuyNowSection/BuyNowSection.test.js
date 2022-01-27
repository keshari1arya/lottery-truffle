import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import BuyNowSection from './BuyNowSection';

describe('<BuyNowSection />', () => {
  test('it should mount', () => {
    render(<BuyNowSection />);
    
    const buyNowSection = screen.getByTestId('BuyNowSection');

    expect(buyNowSection).toBeInTheDocument();
  });
});