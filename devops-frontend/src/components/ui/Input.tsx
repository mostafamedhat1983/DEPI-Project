import React from 'react';
import { cn } from '../../utils/cn';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, ...props }, ref) => {
    const id = props.id || props.name;

    return (
      <div className="space-y-2">
        {label && (
          <label
            htmlFor={id}
            className="block text-sm font-medium text-gray-700"
            data-testid={`${id}-label`}
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={cn(
            'block w-full rounded-md border-gray-300 shadow-sm',
            'focus:border-blue-500 focus:ring-blue-500',
            'disabled:opacity-50 disabled:bg-gray-100',
            error && 'border-red-500',
            className
          )}
          data-testid={props['data-testid'] || id}
          {...props}
        />
        {error && (
          <p className="text-sm text-red-600" data-testid={`${id}-error`}>
            {error}
          </p>
        )}
      </div>
    );
  }
);