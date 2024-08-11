import { screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { renderWithProviders } from '@test/render-with-providers';
import Loader from './Loader';
import style from './Loader.module.css';

describe('Loader component', () => {
  it('should render the loader', () => {
    renderWithProviders(<Loader />);
    const loaderElement = screen.getByTestId('loader');
    expect(loaderElement).toBeInTheDocument();
    expect(loaderElement).toHaveClass(style.loader);

    const spinnerElement = screen.getByTestId('loader').querySelector(`.${style.loaderSpinner}`);
    expect(spinnerElement).toBeInTheDocument();
    expect(spinnerElement).toHaveClass(style.loaderSpinner);
  });
});
