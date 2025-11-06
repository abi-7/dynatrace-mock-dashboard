import React, { useState } from "react";
import {
  Grid,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Chip,
} from "@mui/material";
import { Card, CardContent } from "./CardComponent"; // your custom Card component
import { Button } from "./Button";
import { PaymentDetail } from "./Details";

function formatMoney(v: number, ccy: string) {
  return new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: ccy,
    maximumFractionDigits: 2,
  }).format(v);
}

interface Payment {
  id: number;
  created: number;
  client: string;
  beneficiary: string;
  direction: string;
  value: number;
  currency: string;
  status: string;
  uetr: string;
  icn: string;
}

interface PaymentsTableProps {
  rows: Payment[];
  applications: any[];
  appHealth: (id: string) => number;
}

export const PaymentsTable: React.FC<PaymentsTableProps> = ({
  rows,
  applications,
  appHealth,
}) => {
  const [selected, setSelected] = useState<Payment | null>(null);
  const [page, setPage] = useState(0);
  const pageSize = 10;
  const view = rows.slice(page * pageSize, page * pageSize + pageSize);
  const pages = Math.ceil(rows.length / pageSize);

  return (
    <Grid container spacing={2}>
      {/* Payments Table */}
      <Grid size={{ xs: 12, md: 8 }}>
        <Card>
          <CardContent>
            <Typography variant="subtitle2" style={{ marginBottom: 16 }}>
              Results ({rows.length})
            </Typography>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Time</TableCell>
                  <TableCell>Client</TableCell>
                  <TableCell>Direction</TableCell>
                  <TableCell>Value</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>IDs</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {view.map((p) => (
                  <TableRow key={p.id} hover>
                    <TableCell>
                      {new Date(p.created).toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" style={{ fontWeight: 500 }}>
                        {p.client}
                      </Typography>
                      <Typography variant="caption" color="textSecondary">
                        Benef: {p.beneficiary}
                      </Typography>
                    </TableCell>
                    <TableCell>{p.direction}</TableCell>
                    <TableCell>{formatMoney(p.value, p.currency)}</TableCell>
                    <TableCell>
                      <Chip
                        label={p.status}
                        size="small"
                        color={p.status === "Failed" ? "error" : "default"}
                      />
                    </TableCell>
                    <TableCell>
                      <Typography variant="caption" display="block">
                        UETR: {p.uetr}
                      </Typography>
                      <Typography variant="caption" display="block">
                        ICN: {p.icn}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="outline"
                        size="md"
                        onClick={() => setSelected(p)}
                      >
                        Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {/* Pagination */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: 16,
              }}
            >
              <Typography variant="caption" color="textSecondary">
                Page {page + 1} / {pages || 1}
              </Typography>
              <div style={{ display: "flex", gap: 8 }}>
                <Button
                  variant="outline"
                  size="md"
                  disabled={page === 0}
                  onClick={() => setPage((p) => p - 1)}
                >
                  Prev
                </Button>
                <Button
                  variant="outline"
                  size="md"
                  disabled={page >= pages - 1}
                  onClick={() => setPage((p) => p + 1)}
                >
                  Next
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </Grid>

      {/* Payment / Message Detail */}
      <Grid size={{ xs: 12, md: 4 }}>
        <Card>
          <CardContent>
            <Typography variant="subtitle2" style={{ marginBottom: 16 }}>
              Payment / Message Detail
            </Typography>
            {!selected ? (
              <Typography variant="body2" color="textSecondary">
                Select a row to see end‑to‑end tracking, SLA, ACK/NACK/pacs.002,
                and identifiers.
              </Typography>
            ) : (
              <PaymentDetail
                p={selected}
                applications={applications}
                appHealth={appHealth}
                formatMoney={formatMoney}
              />
            )}
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};
