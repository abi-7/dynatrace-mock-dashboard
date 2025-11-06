import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

type Ctx = {
  value?: string;
  onValueChange?: (v: string) => void;
  open: boolean;
  setOpen: (b: boolean) => void;
  label?: string;
  setLabel: (s?: string) => void;
};

const SelectCtx = createContext<Ctx>({
  open: false,
  setOpen: () => {},
  setLabel: () => {},
});

export function Select({
  value,
  onValueChange,
  children,
}: {
  value?: string;
  onValueChange?: (v: string) => void;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [label, setLabel] = useState<string | undefined>(undefined);
  const ref = useRef<HTMLDivElement>(null);

  // close on outside click
  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  return (
    <SelectCtx.Provider
      value={{ value, onValueChange, open, setOpen, label, setLabel }}
    >
      <div ref={ref} style={{ position: "relative" }}>
        {children}
      </div>
    </SelectCtx.Provider>
  );
}

export function SelectTrigger({ children }: { children: React.ReactNode }) {
  const { open, setOpen } = useContext(SelectCtx);
  return (
    <button
      type="button"
      onClick={() => setOpen(!open)}
      style={{
        height: 36,
        width: "100%",
        borderRadius: 12,
        border: "1px solid #d1d5db",
        backgroundColor: "#ffffff",
        padding: "0 12px",
        fontSize: 14,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        cursor: "pointer",
      }}
    >
      {children}
      <span style={{ marginLeft: 8, color: "#9ca3af" }}>▾</span>
    </button>
  );
}

export function SelectValue({ placeholder }: { placeholder?: string }) {
  const { label } = useContext(SelectCtx);
  return (
    <span style={{ color: label ? "#111827" : "#6b7280" }}>
      {label ?? placeholder}
    </span>
  );
}

export function SelectContent({ children }: { children: React.ReactNode }) {
  const { open } = useContext(SelectCtx);
  if (!open) return null;
  return (
    <div
      style={{
        position: "absolute",
        zIndex: 40,
        marginTop: 8,
        width: "100%",
        borderRadius: 12,
        border: "1px solid #d1d5db",
        backgroundColor: "#ffffff",
        padding: 8,
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
      }}
    >
      {children}
    </div>
  );
}

export function SelectItem({
  value,
  children,
}: {
  value: string;
  children: React.ReactNode;
}) {
  const { onValueChange, setOpen, setLabel } = useContext(SelectCtx);
  return (
    <div
      onClick={() => {
        onValueChange?.(value);
        setLabel(String(children));
        setOpen(false);
      }}
      style={{
        cursor: "pointer",
        borderRadius: 8,
        padding: "8px 12px",
        fontSize: 14,
      }}
      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#f3f4f6")}
      onMouseLeave={(e) =>
        (e.currentTarget.style.backgroundColor = "transparent")
      }
    >
      {children}
    </div>
  );
}
