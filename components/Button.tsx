"use client";

import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  showArrow?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  showArrow = false,
  className = "",
  ...props
}) => {
  // Primary (Contact Us gradient style) and Secondary button styles
  const baseStyles =
    "px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-2 justify-center";

  const variants = {
    primary: "bg-indigo-500 hover:bg-indigo-600 text-white",
    secondary:
      "bg-transparent border border-slate-700 hover:border-slate-500 text-slate-300 hover:text-white",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
      {showArrow && <span className="text-base">→</span>}
    </button>
  );
};

export default Button;
