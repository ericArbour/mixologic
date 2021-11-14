interface FormBodyProps {
  children: React.ReactNode;
}

export function FormBody({ children }: FormBodyProps) {
  return <div className="space-y-8">{children}</div>;
}
