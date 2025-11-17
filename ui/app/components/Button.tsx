import React from "react";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "outline" | "secondary";
  size?: "sm" | "md" | "lg";
};

export function Button({
  variant = "default",
  size = "md",
  style,
  ...rest
}: Props) {
  // Variant styles
  const variantStyles: Record<string, React.CSSProperties> = {
    default: {
      backgroundColor: "#111827", // neutral-900
      color: "#ffffff",
      border: "1px solid #111827",
    },
    outline: {
      backgroundColor: "#ffffff",
      color: "#111827",
      border: "1px solid #d1d5db", // neutral-300
    },
    secondary: {
      backgroundColor: "#f3f4f6", // neutral-100
      color: "#111827",
      border: "1px solid #e5e7eb", // neutral-200
    },
  };

  // Size styles
  const sizeStyles: Record<string, React.CSSProperties> = {
    sm: { height: 32 },
    md: { height: 36 },
    lg: { height: 44 },
  };

  return (
    <button
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 12,
        padding: "0 12px",
        fontSize: 14,
        cursor: "pointer",
        transition: "all 0.2s",
        ...variantStyles[variant],
        ...sizeStyles[size],
        ...style,
      }}
      {...rest}
      onMouseEnter={(e) => {
        if (variant === "default") e.currentTarget.style.opacity = "0.9";
        if (variant === "outline")
          e.currentTarget.style.backgroundColor = "#f9fafb"; // neutral-50
        if (variant === "secondary")
          e.currentTarget.style.backgroundColor = "#e5e7eb"; // neutral-200
      }}
      onMouseLeave={(e) => {
        // reset background/opacity on hover out
        Object.assign(e.currentTarget.style, {
          ...variantStyles[variant],
          ...sizeStyles[size],
        });
      }}
    />
  );
}
