import ReactSelect, { SingleValue } from 'react-select';
import { ErrorMessage } from './error-message';
import { RequiredDot } from './required-dot';

interface SelectProps<TOption> {
  id: string;
  value: TOption;
  options: TOption[] | undefined;
  onChange: (options: SingleValue<TOption>) => void;
  label: string;
  isLoading?: boolean;
  required?: boolean;
  error?: string;
}

export function Select<TOption extends { id: number; name: string }>({
  id,
  value,
  options,
  onChange,
  label,
  isLoading,
  required,
  error,
}: SelectProps<TOption>) {
  return (
    <div className="space-y-2">
      <label htmlFor={`react-select-${id}-input`}>
        {label}
        {required && <RequiredDot />}
      </label>
      <ReactSelect
        instanceId={id}
        value={value}
        onChange={onChange}
        isLoading={isLoading}
        options={options}
        getOptionLabel={(option) => option.name}
        getOptionValue={(option) => option.id.toString()}
      />
      <ErrorMessage>{error}</ErrorMessage>
    </div>
  );
}
