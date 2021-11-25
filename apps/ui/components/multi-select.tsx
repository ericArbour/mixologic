import Select, { MultiValue } from 'react-select';
import { ErrorMessage } from './error-message';
import { RequiredDot } from './required-dot';

interface MultiSelectProps<TOption> {
  id: string;
  value: TOption[];
  options: TOption[] | undefined;
  onChange: (options: MultiValue<TOption>) => void;
  label: string;
  isLoading?: boolean;
  required?: boolean;
  error?: string;
}

export function MultiSelect<TOption extends { id: number; name: string }>({
  id,
  value,
  options,
  onChange,
  label,
  isLoading,
  required,
  error,
}: MultiSelectProps<TOption>) {
  return (
    <div>
      <label>
        {label} {required && <RequiredDot />}
        <Select
          isMulti
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
