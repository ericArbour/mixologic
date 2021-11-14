import { FormEventHandler } from 'react';

interface FormProps {
  children: React.ReactNode;
  onSubmit: FormEventHandler<HTMLFormElement>;
}

export function Form({ children, onSubmit }: FormProps) {
  return (
    <form
      className="w-full max-w-sm mx-auto px-5 py-10 bg-white rounded-lg shadow dark:bg-gray-800"
      onSubmit={onSubmit}
    >
      {children}
    </form>
  );
}
