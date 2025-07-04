import React, { memo, ButtonHTMLAttributes, ReactNode } from "react";
import styles from "./Button.module.scss";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  variant?: "primary" | "secondary";
  icon?: ReactNode;
  className?: string;
}

export const Button = memo(
  ({
    children,
    onClick,
    disabled = false,
    variant = "primary",
    icon,
    className = "",
    ...props
  }: ButtonProps) => {
    const baseClasses = styles.btn;
    const variantClass =
      variant === "primary" ? styles.btnPrimary : styles.btnSecondary;
    const classes = `${baseClasses} ${variantClass} ${className}`.trim();

    return (
      <button
        className={classes}
        onClick={onClick}
        disabled={disabled}
        {...props}
      >
        {icon && <span className={styles.btnIcon}>{icon}</span>}
        <span className={styles.btnText}>{children}</span>
      </button>
    );
  }
);
