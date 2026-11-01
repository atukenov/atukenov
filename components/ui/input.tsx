import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-[48px] border-0 border-b-2 border-neon-cyan/30 focus:border-accent-default focus:shadow-[0_6px_14px_-8px_#f3e600] font-light bg-primary/70 px-4 py-5 text-base placeholder:text-white/40 placeholder:uppercase placeholder:tracking-widest placeholder:text-sm outline-none transition-all",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
