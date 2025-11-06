import React from "react";

export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      style={{
        height: 36,
        width: "100%",
        borderRadius: 12,
        border: "1px solid #d1d5db",
        backgroundColor: "#ffffff",
        padding: "0 12px",
        fontSize: 14,
        outline: "none",
        boxSizing: "border-box",
        ...(props.style || {}),
      }}
      onFocus={(e) => {
        e.currentTarget.style.boxShadow = "0 0 0 2px #d1d5db";
        if (props.onFocus) props.onFocus(e);
      }}
      onBlur={(e) => {
        e.currentTarget.style.boxShadow = "none";
        if (props.onBlur) props.onBlur(e);
      }}
    />
  );
}
