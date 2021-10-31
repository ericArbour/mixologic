import { forwardRef } from 'react';

const colors = {
  white:
    'bg-white hover:bg-gray-100 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-indigo-500',
  gray: 'bg-gray-600 hover:bg-gray-700 focus:ring-gray-500 focus:ring-offset-gray-200',
  red: 'bg-red-600 hover:bg-red-700 focus:ring-red-500 focus:ring-offset-red-200',
  yellow:
    'bg-yellow-600 hover:bg-yellow-700 focus:ring-yellow-500 focus:ring-offset-yellow-200',
  green:
    'bg-green-500 hover:bg-green-700 focus:ring-green-500 focus:ring-offset-green-200',
  blue: 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200',
  indigo:
    'bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200',
  purple:
    'bg-purple-600 hover:bg-purple-700 focus:ring-purple-500 focus:ring-offset-purple-200',
  pink: 'bg-pink-600 hover:bg-pink-700 focus:ring-pink-500 focus:ring-offset-pink-200',
};

interface SharedProps {
  rounded?: boolean;
  small?: boolean;
  color: keyof typeof colors;
  icon?: JSX.Element;
  label?: string;
  onClick?: () => void;
}

interface ButtonProps extends SharedProps {
  disabled?: boolean;
  submit?: boolean;
  isLoading?: boolean;
}

interface ButtonLinkProps extends SharedProps {
  href?: string;
}

function getSharedClassNames(props: SharedProps): string {
  return `${props.small ? 'text-sm' : 'text-base'} ${
    props.icon ? 'flex justify-center items-center ' : ''
  } ${
    colors[props.color]
  } py-2 px-4 text-white w-full transition ease-in duration-200 text-center font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 ${
    !props.label ? ' w-12 h-12' : ''
  } ${props.rounded ? 'rounded-full' : 'rounded-lg '}`;
}

export function Button(props: ButtonProps) {
  return (
    <button
      onClick={props.onClick}
      type={props.submit ? 'submit' : 'button'}
      disabled={props.disabled}
      className={`${getSharedClassNames(props)} ${
        props.disabled ? ' opacity-70 cursor-not-allowed' : ''
      }`}
    >
      {props.icon && props.isLoading ? (
        <svg
          className="animate-spin -ml-1 mr-1 h-5 w-5 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      ) : props.icon ? (
        props.icon
      ) : null}
      {props.label && props.label}
    </button>
  );
}

export const ButtonLink = forwardRef<HTMLAnchorElement, ButtonLinkProps>(
  (props: ButtonLinkProps, ref) => {
    return (
      <a
        ref={ref}
        href={props.href}
        onClick={props.onClick}
        className={getSharedClassNames(props)}
      >
        {props.icon ? props.icon : null}
        {props.label && props.label}
      </a>
    );
  }
);
