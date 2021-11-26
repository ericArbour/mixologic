interface ColorPreviewProps {
  color?: string;
  className?: string;
}

export function ColorPreview({ color, className = '' }: ColorPreviewProps) {
  return (
    <span
      style={{ backgroundColor: `#${color || 'fff'}` }}
      className={`inline-block rounded-lg border-transparent ${className}`}
    />
  );
}
