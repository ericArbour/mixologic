import { ErrorIcon } from './icons/error-icon';

interface ErrorMessageProps {
  children?: string;
}

export function ErrorMessage({ children }: ErrorMessageProps) {
  if (!children) return null;

  return (
    <p className="text-sm text-red-500">
      <ErrorIcon className="mr-1" />
      {children}
    </p>
  );
}
