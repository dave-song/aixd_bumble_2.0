"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

interface ButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  fullWidth = false,
  onClick,
  disabled = false,
  className = "",
}: ButtonProps) {
  const baseStyles =
    "font-medium rounded-[12px] transition-colors duration-200 flex items-center justify-center";

  const variantStyles = {
    primary: "bg-bumble-black text-white hover:bg-neutral-800",
    secondary: "bg-bumble-accent text-bumble-black hover:bg-yellow-400",
    outline:
      "bg-white text-bumble-black border-[1.5px] border-bumble-black hover:bg-neutral-50",
    ghost: "bg-transparent text-bumble-gray hover:text-bumble-black",
  };

  const sizeStyles = {
    sm: "px-[12px] py-[8px] text-[14px]",
    md: "px-[16px] py-[10px] text-[16px]",
    lg: "px-[20px] py-[12px] text-[16px]",
  };

  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      whileHover={{ scale: disabled ? 1 : 1.01 }}
      transition={{ duration: 0.1 }}
      className={`
        ${baseStyles}
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${fullWidth ? "w-full" : ""}
        ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
        ${className}
      `}
    >
      {children}
    </motion.button>
  );
}
