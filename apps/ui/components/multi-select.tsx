import Select, { MultiValue } from 'react-select';
import { ErrorIcon } from '.';

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
    <div className="relative">
      <label>
        {label}{' '}
        {required && <span className="text-red-500 required-dot">*</span>}
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
      {error && (
        <>
          <ErrorIcon className="absolute right-2 bottom-3" />
          <p className="absolute text-sm text-red-500 -bottom-6">{error}</p>
        </>
      )}
    </div>
  );
}
