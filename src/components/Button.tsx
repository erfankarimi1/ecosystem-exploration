import type { ButtonHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "danger" | "danger-outline";
type Size = "md" | "sm";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
};

const BASE =
  "inline-flex items-center justify-center rounded-lg font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600";

const VARIANTS: Record<Variant, string> = {
  primary: "bg-brand-600 text-white hover:bg-brand-700",
  secondary:
    "border border-slate-300 bg-white text-slate-800 hover:bg-slate-50",
  danger: "bg-red-700 text-white hover:bg-red-800",
  "danger-outline":
    "border border-red-300 bg-white text-red-700 hover:bg-red-50",
};

const SIZES: Record<Size, string> = {
  md: "px-4 py-2 text-sm",
  sm: "px-3 py-1.5 text-sm",
};

export default function Button({
  variant = "primary",
  size = "md",
  type = "button",
  className = "",
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`${BASE} ${VARIANTS[variant]} ${SIZES[size]} ${className}`}
      {...rest}
    />
  );
}
