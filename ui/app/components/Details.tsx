import React from "react";
import { Typography, LinearProgress } from "@mui/material";
import {
  History,
  FileDownload,
  CheckCircle,
  Warning,
} from "@mui/icons-material";
import { Card, CardContent } from "./CardComponent";
import { Button } from "./Button";

interface PaymentDetailProps {
  p: any;
  applications: any[];
  appHealth: (id: string) => number;
  formatMoney: (v: number, ccy: string) => string;
}

export const PaymentDetail: React.FC<PaymentDetailProps> = ({
  p,
  applications,
  appHealth,
  formatMoney,
}) => {
  const targetMs = p.appPath.some((h: any) => h.appId === "phublvpe")
    ? 20 * 60 * 1000
    : 25 * 60 * 1000;
  const elapsed = p.lastUpdate - p.created;
  const pct = Math.min(100, Math.round((elapsed / targetMs) * 100));

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        padding: "20px 24px",
        gap: 20,
        fontSize: 14,
        overflow: "auto",
      }}
    >
      {/* Top Info Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 16,
          rowGap: 20,
        }}
      >
        <div>
          <div style={{ fontSize: 12, color: "#666", marginBottom: 6 }}>
            Client
          </div>
          <div style={{ fontWeight: 500, fontSize: 15 }}>{p.client}</div>
        </div>
        <div>
          <div style={{ fontSize: 12, color: "#666", marginBottom: 6 }}>
            Beneficiary
          </div>
          <div style={{ fontWeight: 500, fontSize: 15 }}>{p.beneficiary}</div>
        </div>
        <div>
          <div style={{ fontSize: 12, color: "#666", marginBottom: 6 }}>
            Originator
          </div>
          <div style={{ fontWeight: 500, fontSize: 15 }}>{p.originator}</div>
        </div>
        <div>
          <div style={{ fontSize: 12, color: "#666", marginBottom: 6 }}>
            Direction / Channel
          </div>
          <div style={{ fontWeight: 500, fontSize: 15 }}>
            {p.direction} • {p.channel}
          </div>
        </div>
        <div>
          <div style={{ fontSize: 12, color: "#666", marginBottom: 6 }}>
            Amount
          </div>
          <div style={{ fontWeight: 600, fontSize: 16 }}>
            {formatMoney(p.value, p.currency)}
          </div>
        </div>
        <div>
          <div style={{ fontSize: 12, color: "#666", marginBottom: 6 }}>
            Status
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              fontWeight: 500,
              fontSize: 15,
            }}
          >
            {p.status}
            {p.status === "Failed" ? (
              <Warning style={{ color: "#d32f2f", fontSize: 18 }} />
            ) : (
              <CheckCircle style={{ color: "#388e3c", fontSize: 18 }} />
            )}
          </div>
        </div>
      </div>

      {/* Identifiers */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 16,
          paddingTop: 8,
          borderTop: "1px solid #e0e0e0",
        }}
      >
        <div>
          <div style={{ fontSize: 12, color: "#666", marginBottom: 8 }}>
            Identifiers
          </div>
          <div style={{ fontSize: 13, marginBottom: 4 }}>UETR: {p.uetr}</div>
          <div style={{ fontSize: 13, marginBottom: 4 }}>ICN: {p.icn}</div>
          <div style={{ fontSize: 13, marginBottom: 4 }}>
            Scotia Client ID: {p.scotiaClientId}
          </div>
          <div style={{ fontSize: 13 }}>Segmentation: {p.segmentation}</div>
        </div>
        <div>
          <div style={{ fontSize: 12, color: "#666", marginBottom: 8 }}>
            ACK / pacs.002
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              marginTop: 6,
            }}
          >
            {p.ackState === "ACK" ? (
              <CheckCircle style={{ color: "#388e3c", fontSize: 18 }} />
            ) : (
              <Warning style={{ color: "#d32f2f", fontSize: 18 }} />
            )}
            <span style={{ fontSize: 14, fontWeight: 500 }}>{p.ackState}</span>
          </div>
          <div style={{ fontSize: 13 }}>{p.pacs002}</div>
        </div>
      </div>

      {/* SLA Progress */}
      <div style={{ paddingTop: 8, borderTop: "1px solid #e0e0e0" }}>
        <div style={{ fontSize: 12, color: "#666", marginBottom: 8 }}>
          SLA (target {targetMs / 60000}m) • Elapsed{" "}
          {Math.round(elapsed / 60000)}m
        </div>
        <LinearProgress
          variant="determinate"
          value={pct}
          style={{ height: 8, borderRadius: 4 }}
        />
      </div>

      {/* End-to-End Flow */}
      <div style={{ paddingTop: 8, borderTop: "1px solid #e0e0e0" }}>
        <div style={{ fontSize: 12, color: "#666", marginBottom: 8 }}>
          End-to-End Flow
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {console.log("Full appPath length:", p.appPath.length)}
          {console.log(
            "Unique entries:",
            new Set(p.appPath.map((h) => `${h.appId}-${h.ts}`)).size
          )}

          {p.appPath
            .filter((h: any, i: number, arr: any[]) => {
              // Keep only the first occurrence of each unique appId+timestamp combo
              return (
                arr.findIndex((x) => x.appId === h.appId && x.ts === h.ts) === i
              );
            })
            .map((h: any, i: number) => {
              console.log("Flow step:", {
                index: i,
                appId: h.appId,
                timestamp: h.ts,
                status: h.status,
                formattedTime: new Date(h.ts).toLocaleString(),
                compositeKey: `${h.appId}-${h.ts}-${i}`,
              });

              const app = applications.find((a) => a.id === h.appId);
              return (
                <div
                  key={`${h.appId}-${h.ts}-${i}`}
                  style={{ display: "flex", gap: 12, alignItems: "flex-start" }}
                >
                  <div
                    style={{
                      marginTop: 6,
                      height: 10,
                      width: 10,
                      minWidth: 10,
                      borderRadius: "50%",
                      background:
                        appHealth(h.appId) > 90 ? "#22c55e" : "#f97316",
                    }}
                  />
                  <div style={{ flex: 1 }}>
                    <div
                      style={{ fontWeight: 500, fontSize: 14, marginBottom: 3 }}
                    >
                      {app?.name}{" "}
                      <span
                        style={{ color: "#666", fontSize: 12, marginBottom: 2 }}
                      >
                        • {new Date(h.ts).toLocaleString()}
                      </span>
                    </div>
                    <div style={{ fontSize: 12, marginBottom: 2 }}>
                      {h.status}
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>

      {/* Actions */}
      {/* <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 12,
          marginTop: "auto",
          paddingTop: 16,
        }}
      >
        <Button
          variant="outline"
          size="md"
          // startIcon={<History fontSize="small" />}
          style={{ textTransform: "none" }}
        >
          Full Timeline
        </Button>
        <Button
          variant="outline"
          size="md"
          // startIcon={<FileDownload fontSize="small" />}
          style={{ textTransform: "none" }}
        >
          Export Case
        </Button>
      </div> */}
    </div>
  );
};
