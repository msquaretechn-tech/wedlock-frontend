import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id?: string;
  name?: string;
  labelStyle?: React.CSSProperties;
  labelClassName?: string;
  rightElement?: React.ReactNode; // e.g. show/hide password button, vertically centred in the input
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, id, labelStyle, labelClassName, rightElement, ...props }, ref) => {
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
        <div className="relative mt-2 flex">
          <input
            id={generatedId}
            className={`block w-full p-2 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${rightElement ? 'pr-12' : ''}`}
            ref={ref}
            {...props}
          />
          {rightElement && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-4">{rightElement}</div>
          )}
        </div>
      </div>
    );
  }
);

export default Input;
