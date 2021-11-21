import { forwardRef } from 'react';

interface TextLinkProps {
  children: string;
  href?: string;
  onClick?: () => void;
  shouldOpenNewTab?: boolean;
}

const className = 'text-indigo-600 hover:text-indigo-900';

export const TextLink = forwardRef<HTMLAnchorElement, TextLinkProps>(
  ({ children, href, onClick, shouldOpenNewTab }, ref) => {
    if (shouldOpenNewTab)
      return (
        <a
          ref={ref}
          className={className}
          href={href}
          target="blank"
          rel="noopener noreferrer"
        >
          {children}
        </a>
      );

    return (
      <a ref={ref} className={className} href={href} onClick={onClick}>
        {children}
      </a>
    );
  }
);
