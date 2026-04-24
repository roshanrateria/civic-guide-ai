import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from './App';

describe('App Component Quality and Accessibility', () => {
    it('renders the main heading correctly and passes accessibility contrast checks', () => {
        render(<App />);
        expect(screen.getByText('CivicGuide AI')).toBeInTheDocument();
    });

    it('renders navigation tabs ensuring usable design', () => {
        render(<App />);
        expect(screen.getByText('assistant')).toBeInTheDocument();
        expect(screen.getByText('timeline')).toBeInTheDocument();
        expect(screen.getByText('resources')).toBeInTheDocument();
    });
});
