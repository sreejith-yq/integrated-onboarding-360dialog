import React from "react"

type ButtonPropType = {
    paddingRight: string,
    component: React.ReactNode
}

interface IInput {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  optional?: boolean;
  button?: ButtonPropType;
}

const Input = ({ label, value, onChange, placeholder, optional, button }: IInput) => {
  return (
    <div>
      <div className="flex flex-row justify-between items-baseline">
        <label
          htmlFor={label}
          className="block text-sm font-medium text-gray-500"
        >
          {label}
        </label>
        {optional && (
          <p className="text-sm font-base text-gray-500">Optional</p>
        )}
      </div>
      <div className="relative mt-1 rounded-md shadow-sm">
        <input
          type="text"
          name={label}
          id={label}
          className={`block w-full rounded-md border border-gray-300 px-3 py-2 outline-none focus:border-blue-500 focus:ring-blue-500 placeholder:text-gray-300 text-sm placeholder:text-sm ${button && button.paddingRight}`}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        {button && (
          <div className="absolute inset-y-0 right-0 p-1 mt-px">
            {button.component}
          </div>
        )}
      </div>
    </div>
  );
};

export default Input;
