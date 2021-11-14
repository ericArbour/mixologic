import { CheckIcon } from './icons/check-icon';

interface SuccessMessageProps {
  label: string;
}

export function SuccessMessage({ label }: SuccessMessageProps) {
  return (
    <p className="text-sm text-green-600">
      <CheckIcon className="mr-1" />
      {label} saved
    </p>
  );
}
