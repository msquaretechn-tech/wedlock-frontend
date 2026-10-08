import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id?: string;
  name?: string;
  labelStyle?: React.CSSProperties;
  labelClassName?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, id, labelStyle, labelClassName, ...props }, ref) => {
    const generatedId = id || `input-${Math.random().toString(36).substring(2, 9)}`;

    return (
      <div className="mb-4">
        {label && (
          <label
            htmlFor={generatedId}
            className={`text-white text-base md:text-lg mb-2 block ${labelClassName || ''}`}
            style={labelStyle}
          >
            {label}
          </label>
        )}
        <input
          id={generatedId}
          className="w-full mt-2 p-2 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          ref={ref}
          {...props}
        />
      </div>
    );
  }
);

export default Input;
