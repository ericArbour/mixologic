import { ChangeEventHandler, FocusEventHandler, forwardRef } from 'react';
import { ErrorIcon } from '.';
import { LoadingInput } from './LoadingInput';

interface Props {
  type?: string;
  label?: string;
  defaultValue?: string;
  required?: boolean;
  error?: string;
  helper?: string;
  placeholder?: string;
  name?: string;
  disabled?: boolean;
  isLoading?: boolean;
  withForceIndications?: boolean;
  id?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onBlur?: FocusEventHandler<HTMLInputElement>;
}

export const TextInput = forwardRef<HTMLInputElement, Props>(
  (props: Props, ref) => {
    return (
      <div
        className={`${props.helper ? 'flex' : ''} relative ${
          props.disabled ? 'opacity-50 pointer-events-none' : ''
        }`}
      >
        {props.label && (
          <label htmlFor={props.id} className="text-gray-700">
            {props.label}{' '}
            {props.required && (
              <span className="text-red-500 required-dot">*</span>
            )}
          </label>
        )}
        {props.helper && (
          <span className="rounded-l-md inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
            {props.helper}
          </span>
        )}
        {props.isLoading ? (
          <LoadingInput />
        ) : (
          <input
            id={props.id}
            defaultValue={props.defaultValue}
            disabled={props.disabled}
            className={`${props.error ? 'ring-red-500 ring-2' : ''}${
              props.helper ? ' rounded-r-lg' : ' rounded-lg border-transparent'
            } flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent`}
            type={props.type || 'text'}
            name={props.name}
            onChange={props.onChange}
            onBlur={props.onBlur}
            placeholder={props.placeholder}
            ref={ref}
          />
        )}
        {props.withForceIndications && (
          <>
            <div className="grid w-full h-1 grid-cols-12 gap-4 mt-3">
              <div className="h-full col-span-3 bg-green-500 rounded"></div>
              <div className="h-full col-span-3 bg-green-500 rounded"></div>
              <div className="h-full col-span-3 bg-green-500 rounded"></div>
              <div className="h-full col-span-3 bg-gray-200 rounded dark:bg-dark-1"></div>
            </div>
            <div className="mt-2 text-green-500">Valid password</div>
          </>
        )}
        {props.error && (
          <>
            <ErrorIcon className="absolute right-2 bottom-3" />
            <p className="absolute text-sm text-red-500 -bottom-6">
              {props.error}
            </p>
          </>
        )}
      </div>
    );
  }
);
