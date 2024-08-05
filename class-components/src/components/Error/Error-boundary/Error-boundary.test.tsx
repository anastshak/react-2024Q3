import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import { ErrorBoundary } from './Error-boundary';

const ErrorThrowingComponent = () => {
  throw new Error('Test error');
};

describe('ErrorBoundary component', () => {
  test('should render children when no error is thrown', () => {
    render(
      <ErrorBoundary fallback={<div>Error occurred</div>}>
        <div>Child component</div>
      </ErrorBoundary>
    );

    expect(screen.getByText('Child component')).toBeInTheDocument();
  });

  test('should render fallback when an error is thrown', () => {
    render(
      <ErrorBoundary fallback={<div>Error occurred</div>}>
        <ErrorThrowingComponent />
      </ErrorBoundary>
    );

    expect(screen.getByText('Error occurred')).toBeInTheDocument();
  });
});
