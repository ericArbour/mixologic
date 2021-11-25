interface FormHeaderProps {
  children: React.ReactNode;
}

export function FormHeader({ children }: FormHeaderProps) {
  return (
    <div className="mb-6 text-3xl font-light text-center text-gray-800 dark:text-white">
      <h2>{children}</h2>
    </div>
  );
}
