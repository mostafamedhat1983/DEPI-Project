import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Input } from '../Input';

describe('Input', () => {
  it('renders with label', () => {
    render(<Input label="Username" id="username" />);
    expect(screen.getByLabelText('Username')).toBeInTheDocument();
  });

  it('handles user input', async () => {
    const handleChange = vi.fn();
    render(<Input label="Username" onChange={handleChange} />);
    
    const input = screen.getByLabelText('Username');
    await userEvent.type(input, 'test');
    
    expect(handleChange).toHaveBeenCalledTimes(4);
    expect(input).toHaveValue('test');
  });

  it('shows error message', () => {
    render(
      <Input
        label="Username"
        error="Username is required"
        id="username"
      />
    );
    expect(screen.getByText('Username is required')).toBeInTheDocument();
  });

  it('applies disabled state', () => {
    render(<Input label="Username" disabled />);
    expect(screen.getByLabelText('Username')).toBeDisabled();
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLInputElement>();
    render(<Input label="Username" ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });
});