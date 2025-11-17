import React from "react";
import { Grid } from "@mui/material";
import { Search } from "@mui/icons-material";
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
  timeRange: string;
  setTimeRange: (value: string) => void;
  customStartDate: string;
  setCustomStartDate: (value: string) => void;
  customEndDate: string;
  setCustomEndDate: (value: string) => void;
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
  timeRange,
  setTimeRange,
  customStartDate,
  setCustomStartDate,
  customEndDate,
  setCustomEndDate,
}) => {
  const handleTimeRangeChange = (value: string) => {
    console.log("Time range changed to:", value);
    setTimeRange(value);

    // If switching away from custom, clear custom dates
    if (value !== "custom") {
      setCustomStartDate("");
      setCustomEndDate("");
    }
  };
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

          {/* Time Range Select */}
          <Grid size={{ xs: 12, sm: 6, md: 2 }}>
            <CustomSelect
              value={timeRange}
              onValueChange={handleTimeRangeChange}
            >
              <SelectTrigger>
                <SelectValue placeholder="Time Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1h">Last 1 Hour</SelectItem>
                <SelectItem value="6h">Last 6 Hours</SelectItem>
                <SelectItem value="24h">Last 24 Hours</SelectItem>
                <SelectItem value="7d">Last 7 Days</SelectItem>
                <SelectItem value="30d">Last 30 Days</SelectItem>
                <SelectItem value="custom">Custom Range</SelectItem>
              </SelectContent>
            </CustomSelect>
          </Grid>

          {/* Custom Date Inputs */}
          {timeRange === "custom" && (
            <>
              <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <Input
                  type="datetime-local"
                  value={customStartDate}
                  onChange={(e) => setCustomStartDate(e.target.value)}
                  placeholder="Start Date & Time"
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <Input
                  type="datetime-local"
                  value={customEndDate}
                  onChange={(e) => setCustomEndDate(e.target.value)}
                  placeholder="End Date & Time"
                />
              </Grid>
            </>
          )}
        </Grid>
      </CardContent>
    </Card>
  );
};
