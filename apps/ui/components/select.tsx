import ReactSelect, { SingleValue } from 'react-select';
import { ErrorMessage } from './error-message';

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
    <div>
      <label>
        {label}{' '}
        {required && <span className="text-red-500 required-dot">*</span>}
        <ReactSelect
          instanceId={id}
          value={value}
          onChange={onChange}
          isLoading={isLoading}
          options={options}
          getOptionLabel={(option) => option.name}
          getOptionValue={(option) => option.id.toString()}
        />
      </label>
      <ErrorMessage>{error}</ErrorMessage>
    </div>
  );
}
