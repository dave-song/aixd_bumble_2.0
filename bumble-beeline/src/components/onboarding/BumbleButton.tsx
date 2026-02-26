"use client";

interface BumbleButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "outline";
  fullWidth?: boolean;
  disabled?: boolean;
  className?: string;
}

export default function BumbleButton({
  children,
  onClick,
  variant = "primary",
  fullWidth = true,
  disabled = false,
  className = "",
}: BumbleButtonProps) {
  const baseStyles = "flex items-center justify-center px-[8px] py-[10px] rounded-[12px] transition-colors";
  
  const variantStyles = {
    primary: "bg-[#202020] text-white",
    secondary: "bg-[#ffd93a] text-[#202020]",
    outline: "bg-white border border-[#202020] text-[#202020]",
  };

  const widthStyles = fullWidth ? "w-full" : "";
  const disabledStyles = disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer";

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variantStyles[variant]} ${widthStyles} ${disabledStyles} ${className}`}
    >
      <span
        className="text-[16px] font-medium leading-[24.5px]"
        style={{ fontFamily: "'Euclid Circular A', sans-serif" }}
      >
        {children}
      </span>
    </button>
  );
}
