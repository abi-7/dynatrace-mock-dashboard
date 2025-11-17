import React from "react";

export function Card({
  children,
  className,
  style,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      style={{
        borderRadius: 16,
        border: "1px solid #e5e7eb",
        backgroundColor: "#ffffff",
        boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
        ...((className as React.CSSProperties) || {}),
      }}
    >
      {children}
    </div>
  );
}

export function CardHeader({
  children,
  className,
  style,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      style={{
        paddingTop: 20,
        paddingLeft: 16,
        paddingRight: 16,
        marginBottom: 8,
        ...((className as React.CSSProperties) || {}),
      }}
    >
      {children}
    </div>
  );
}

export function CardTitle({
  children,
  className,
  style,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      style={{
        fontSize: 18,
        fontWeight: 600,
        color: "#111827",
        ...((className as React.CSSProperties) || {}),
      }}
    >
      {children}
    </div>
  );
}

export function CardContent({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      style={{
        paddingBottom: 16,
        paddingLeft: 16,
        paddingRight: 16,
        color: "#111827",
        marginTop: 8,
        ...((className as React.CSSProperties) || {}),
      }}
    >
      {children}
    </div>
  );
}
