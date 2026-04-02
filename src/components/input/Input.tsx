import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id?: string;
  name?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, id, ...props }, ref) => {
    const generatedId = id || `input-${Math.random().toString(36).substring(2, 9)}`;

    return (
      <div className="mb-4">
        {label && (
          <label htmlFor={generatedId} className="block mb-2 text-white">
            {label}
          </label>
        )}
        <input
          id={generatedId}
          className="w-full p-2 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          ref={ref}
          {...props}
        />
      </div>
    );
  }
);

export default Input;
