"use client";

import React from "react";
import { clsx } from "clsx";
import type { ButtonProps } from "./Button.types";

/**
 * Button
 * 
 * Variants: primary | secondary | ghost | outline | icon
 * Sizes:    sm | md | lg
 * 
 * TODO: Replace placeholder styles with your actual design.
 */

const variantStyles: Record<string, string> = {
  primary:   "bg-[var(--color-accent)] text-[var(--color-bg)] hover:opacity-90",
  secondary: "bg-[var(--color-bg-subtle)] text-[var(--color-text)] hover:opacity-90",
  ghost:     "bg-transparent text-[var(--color-text)] hover:bg-[var(--color-bg-subtle)]",
  outline:   "border border-[var(--color-border)] text-[var(--color-text)] hover:border-[var(--color-accent)]",
  icon:      "bg-transparent p-2 rounded-full hover:bg-[var(--color-bg-subtle)]",
};

const sizeStyles: Record<string, string> = {
  sm: "text-sm px-4 py-2",
  md: "text-base px-6 py-3",
  lg: "text-lg px-8 py-4",
};

export default function Button({
  variant = "primary",
  size = "md",
  loading = false,
  icon,
  iconPosition = "left",
  children,
  className,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={clsx(
        "inline-flex items-center justify-center gap-2 rounded-[var(--radius-md)]",
        "font-medium transition-all duration-[var(--duration-base)]",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <span className="animate-spin">⟳</span>}
      {!loading && icon && iconPosition === "left" && icon}
      {children}
      {!loading && icon && iconPosition === "right" && icon}
    </button>
  );
}
