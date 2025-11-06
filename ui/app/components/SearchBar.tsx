import React from "react";
import {
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
} from "@mui/material";
import { FilterList, Search } from "@mui/icons-material";
import { Card, CardContent, CardHeader, CardTitle } from "./CardComponent";
import {
  Select as CustomSelect,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "./Select";
import { Input } from "./Input";
import { Button } from "./Button";

interface Application {
  id: string;
  name: string;
}

interface SearchFiltersProps {
  q: string;
  setQ: (value: string) => void;
  status: string;
  setStatus: (value: string) => void;
  dir: string;
  setDir: (value: string) => void;
  app: string;
  setApp: (value: string) => void;
  paymentType: string;
  setPaymentType: (value: string) => void;
  applications: Application[];
  demoPayments: { status: string }[];
  minValue: string;
  setMinValue: (value: string) => void;
  maxValue: string;
  setMaxValue: (value: string) => void;
}

export const SearchFilters: React.FC<SearchFiltersProps> = ({
  q,
  setQ,
  status,
  setStatus,
  dir,
  setDir,
  app,
  setApp,
  paymentType,
  setPaymentType,
  applications,
  demoPayments,
  minValue,
  setMinValue,
  maxValue,
  setMaxValue,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Search & Filters</CardTitle>
      </CardHeader>
      <CardContent>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 4 }}>
            <div style={{ display: "flex", gap: 8 }}>
              <Input
                placeholder="Search client name or Payment ID..."
                value={q}
                onChange={(e) => setQ(e.target.value)}
              />
              <Button
                variant="outline"
                size="md"
                style={{ display: "flex", alignItems: "center", gap: 4 }}
              >
                <Search style={{ fontSize: 16 }} />
                Search
              </Button>
            </div>
            {/* Value Range Inputs */}
            <div
              style={{
                width: "50%",
                display: "flex",
                gap: "0.5rem",
                marginTop: "0.5rem",
              }}
            >
              <Input
                placeholder="Min $"
                value={minValue}
                onChange={(e) => setMinValue(e.target.value)}
              />
              <Input
                placeholder="Max $"
                value={maxValue}
                onChange={(e) => setMaxValue(e.target.value)}
              />
            </div>
          </Grid>

          {/* Status Select */}
          <Grid size={{ xs: 12, sm: 6, md: 2 }}>
            <CustomSelect value={status} onValueChange={setStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                {Array.from(new Set(demoPayments.map((p) => p.status))).map(
                  (s) => (
                    <SelectItem key={s} value={s}>
                      {s}
                    </SelectItem>
                  )
                )}
              </SelectContent>
            </CustomSelect>
          </Grid>

          {/* Direction Select */}
          <Grid size={{ xs: 12, sm: 6, md: 2 }}>
            <CustomSelect value={dir} onValueChange={setDir}>
              <SelectTrigger>
                <SelectValue placeholder="Direction" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Directions</SelectItem>
                <SelectItem value="Incoming">Incoming</SelectItem>
                <SelectItem value="Outgoing">Outgoing</SelectItem>
                <SelectItem value="Internal">Internal</SelectItem>
              </SelectContent>
            </CustomSelect>
          </Grid>

          {/* Application Select */}
          <Grid size={{ xs: 12, sm: 6, md: 2 }}>
            <CustomSelect value={app} onValueChange={setApp}>
              <SelectTrigger>
                <SelectValue placeholder="Application" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Any App</SelectItem>
                {applications.map((a) => (
                  <SelectItem key={a.id} value={a.id}>
                    {a.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </CustomSelect>
          </Grid>

          {/* Payment Type Select */}
          <Grid size={{ xs: 12, sm: 6, md: 2 }}>
            {/* Alerts Select */}
            {/* <CustomSelect value={alertType} onValueChange={setAlertType}>
              <SelectTrigger>
                <SelectValue placeholder="Alerts" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Any Alerts</SelectItem>
                <SelectItem value="Alerts">With Alerts</SelectItem>
                <SelectItem value="No Alerts">No Alerts</SelectItem>
              </SelectContent>
            </CustomSelect> */}
            <CustomSelect value={paymentType} onValueChange={setPaymentType}>
              <SelectTrigger>
                <SelectValue placeholder="Payment Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="EFT">EFT</SelectItem>
                <SelectItem value="Wire">Wire</SelectItem>
              </SelectContent>
            </CustomSelect>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};
