import React, { InputHTMLAttributes } from 'react';
import { CgClose } from "react-icons/cg";
import { cn } from "@/lib/utils";

interface SearchInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  value: string;
  onChange: (value: string) => void;
  wrapperClassName?: string;
  clearButtonClassName?: string;
  iconClassName?: string;
  onClear?: () => void;
}

export function SearchInput({ 
  value, 
  onChange, 
  placeholder = "Search...", 
  className, 
  wrapperClassName,
  clearButtonClassName,
  iconClassName,
  onClear,
  ...props 
}: SearchInputProps) {
  
  const handleClear = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (onClear) {
      onClear();
    } else {
      onChange('');
    }
  };

  return (
    <div className={cn("relative w-full max-w-sm", wrapperClassName)}>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={cn(
          "border border-border-divider bg-transparent text-primary rounded-lg px-4 py-2 pr-10 w-full focus:outline-none focus:ring-2 focus:ring-text-accent",
          className
        )}
        {...props}
      />
      {value && (
        <button
          onClick={handleClear}
          type="button"
          className={cn(
            "absolute right-3 top-1/2 -translate-y-1/2 opacity-70 hover:opacity-100 transition-opacity text-secondary cursor-pointer",
            clearButtonClassName
          )}
          aria-label="Clear search"
        >
          <CgClose className={cn("w-5 h-5", iconClassName)} />
        </button>
      )}
    </div>
  );
}