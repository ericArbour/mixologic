interface InputGroupProps {
  children: React.ReactNode;
}

export function InputGroup({ children }: InputGroupProps) {
  return <div className="grid grid-cols-2 gap-2">{children}</div>;
}
