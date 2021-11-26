interface FormCardProps {
  children: React.ReactNode;
}

export function FormCard({ children }: FormCardProps) {
  return (
    <div className="shadow rounded-lg p-2 border border-gray-300 w-full relative">
      {children}
    </div>
  );
}
