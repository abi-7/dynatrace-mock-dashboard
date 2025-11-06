import React, { useMemo, useState } from "react";
import {
  Typography,
  Tabs,
  Tab,
  AppBar,
  Toolbar,
  Container,
} from "@mui/material";
import {
  TrendingUp,
  AccountBalance,
  SwapHoriz,
  Security,
} from "@mui/icons-material";
import Grid from "@mui/material/Grid";
import { SubwayView } from "../components/SubwayDrillDown";
import { SearchFilters } from "../components/SearchBar";
import { MetricCard } from "app/components/MetricCard";
import { VolumeChart } from "app/components/VolumeChart";
import { StatusMixChart } from "app/components/PieChart";
import { IncidentsHub } from "app/components/AlertHub";
import { AppsHealth } from "app/components/AppHealth";
import { Card, CardContent } from "app/components/CardComponent";
import { PaymentsTable } from "app/components/Table";
//import { SubwayView } from "app/components/SubwayWidget"; //old subway view

const applications = [
  { id: "mailbox", name: "Mailbox", tier: "Edge", slaMs: 120000 },
  { id: "phubip", name: "PHUB IP", tier: "Integration", slaMs: 180000 },
  { id: "phubeft", name: "PHUB EFT", tier: "Retail", slaMs: 300000 },
  { id: "phublvpe", name: "PHUB LVPE", tier: "High-Value", slaMs: 300000 },
  { id: "phubcps", name: "PHUB CPS", tier: "Core", slaMs: 300000 },
];

const demoPayments = Array.from({ length: 60 }).map((_, i) => {
  const directions = ["Incoming", "Outgoing", "Internal"];
  const statuses = ["Processing", "Completed", "On Hold", "Failed", "Queued"];
  const appsPath = [
    "mailbox",
    "phubip",
    Math.random() < 0.5 ? "phubeft" : "phublvpe",
    "phubcps",
  ];
  const amount = Math.round((Math.random() * 250000 + 5000) * 100) / 100;
  const base = Date.now() - Math.floor(Math.random() * 72) * 60 * 60 * 1000;
  const uetr = `UETR-${(100000 + i).toString(36)}-${(
    (Math.random() * 1e6) |
    0
  ).toString(36)}`.toUpperCase();
  const icn = `ICN${((Math.random() * 1e9) | 0).toString().padStart(9, "0")}`;

  const hops = [] as Array<{
    appId: string;
    ts: number;
    status: string;
    note?: string;
  }>;
  let t = base;
  for (const appId of appsPath) {
    const s = ["Received", "Validated", "Routed", "Booked", "Settled"][
      Math.floor(Math.random() * 5)
    ];
    hops.push({
      appId,
      ts: t,
      status: s,
      note: Math.random() < 0.1 ? "Retry due to timeout" : "",
    });
    t += 30000 + Math.floor(Math.random() * 90000);
  }

  const ackState = Math.random() < 0.85 ? "ACK" : "NACK";
  const pacs002 =
    Math.random() < 0.8 ? "pacs.002 received" : "pacs.002 pending";

  return {
    id: i + 1,
    direction: directions[Math.floor(Math.random() * directions.length)],
    channel: Math.random() < 0.5 ? "SWIFT" : "ISO 20022",
    status: statuses[Math.floor(Math.random() * statuses.length)],
    value: amount,
    currency: "CAD",
    client: ["Acme Corp", "Globex", "Wayne Ent.", "Initech", "Stark Ind."][
      Math.floor(Math.random() * 5)
    ],
    beneficiary: ["Contoso LLC", "Soylent", "Umbrella", "Wonka", "Tyrell"][
      Math.floor(Math.random() * 5)
    ],
    originator: ["Acme Treasury", "Payroll", "ERP", "Mobile", "Branch"][
      Math.floor(Math.random() * 5)
    ],
    appPath: hops,
    created: base,
    lastUpdate: t,
    scotiaClientId: `SC-${(10000 + i).toString()}`,
    segmentation: Math.random() < 0.4 ? "High Value" : "Retail",
    paymentType: "EFT",
    uetr,
    icn,
    ackState,
    pacs002,
  };
});

const incidents = [
  {
    id: "INC-4310",
    severity: "High",
    title: "PHUB LVPE settlement delay",
    appId: "phublvpe",
    opened: Date.now() - 35 * 60 * 1000,
    status: "Investigating",
  },
  {
    id: "INC-4321",
    severity: "Medium",
    title: "EFT backlog in PHUB EFT",
    appId: "phubeft",
    opened: Date.now() - 2 * 60 * 60 * 1000,
    status: "Mitigated",
  },
  {
    id: "AL-7802",
    severity: "Low",
    title: "Mailbox ingress latency",
    appId: "mailbox",
    opened: Date.now() - 20 * 60 * 1000,
    status: "Monitoring",
  },
];

function formatMoney(v: number, ccy: string) {
  return new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: ccy,
    maximumFractionDigits: 2,
  }).format(v);
}
function timeAgo(ts: number) {
  const diff = Date.now() - ts;
  const m = Math.floor(diff / 60000);
  if (m < 1) return "just now";
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  return `${h}h ${m % 60}m ago`;
}
function wildmatch(pattern: string, text: string) {
  const escaped = pattern.replace(/[-\/\\^$+?.()|[\]{}]/g, "\\$&");
  const collapsed = escaped.replace(/\*+/g, "*");
  const regexBody = collapsed.replace(/\*/g, ".*");
  const safe = regexBody.length ? regexBody : ".*";
  const rx = new RegExp(`^${safe}$`, "i");
  return rx.test(text);
}

function healthColor(v: number) {
  return v > 90 ? "#16a34a" : "#f97316";
}
function appHealth(appId: string) {
  const base = {
    mailbox: 96,
    phubip: 94,
    phubeft: 91,
    phublvpe: 89,
    phubcps: 97,
  } as Record<string, number>;
  return base[appId] ?? 90;
}

export default function DemoDashboard() {
  const [q, setQ] = useState("");
  const [status, setStatus] = useState<string>("all");
  const [app, setApp] = useState<string>("all");
  const [paymentType, setPaymentType] = useState<string>("EFT");
  const [dir, setDir] = useState<string>("all");
  const [minValue, setMinValue] = useState("");
  const [maxValue, setMaxValue] = useState("");
  const [tabValue, setTabValue] = useState(0);

  const filtered = useMemo(() => {
    return demoPayments.filter((p) => {
      if (status !== "all" && p.status !== status) return false;
      if (dir !== "all" && p.direction !== dir) return false;
      if (app !== "all" && !p.appPath.some((h) => h.appId === app))
        return false;
      if (minValue && p.value < Number(minValue)) return false;
      if (maxValue && p.value > Number(maxValue)) return false;
      //   if (alertType !== "all") {
      //     const hasIssue = p.appPath.some((h) => h.note && h.note.length > 0);
      //     if (alertType === "Alerts" && !hasIssue) return false;
      //     if (alertType === "No Alerts" && hasIssue) return false;
      //   }
      if (paymentType && p.paymentType !== paymentType) return false;
      if (!q) return true;
      const hay = [p.client, p.uetr, p.icn, p.scotiaClientId].join("|");
      if (q.includes("*")) return wildmatch(q, hay);
      return hay.toLowerCase().includes(q.toLowerCase());
    });
  }, [q, status, app, paymentType, dir, minValue, maxValue]);

  const stageVolumeData = useMemo(() => {
    return applications.map((app) => {
      const count = filtered.filter((p) =>
        p.appPath.some((h) => h.appId === app.id)
      ).length;
      return { x: app.name, y: count };
    });
  }, [filtered, applications]);

  const kpi = useMemo(() => {
    const total = filtered.length;
    const totalValue = filtered.reduce((sum, p) => sum + p.value, 0);
    const completed = filtered.filter((p) => p.status === "Completed").length;
    const failed = filtered.filter((p) => p.status === "Failed").length;
    const processing = filtered.filter(
      (p) => p.status === "Processing" || p.status === "Queued"
    ).length;
    const ack = filtered.filter((p) => p.ackState === "ACK").length;
    const nack = filtered.filter((p) => p.ackState === "NACK").length;
    const pacsOk = filtered.filter((p) =>
      p.pacs002.includes("received")
    ).length;
    const healthOverall =
      Math.round(
        (applications.reduce((a, b) => a + appHealth(b.id), 0) /
          applications.length) *
          10
      ) / 10;
    return {
      total,
      totalValue,
      completed,
      failed,
      processing,
      ack,
      nack,
      pacsOk,
      healthOverall,
    };
  }, [filtered]);

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#fafafa" }}>
      <AppBar
        position="static"
        style={{ backgroundColor: "#fff", color: "#000" }}
        elevation={1}
      >
        <Toolbar>
          <div style={{ flexGrow: 1 }}>
            <Typography variant="h6" style={{ fontWeight: 600 }}>
              Transactions [ mock app ]
            </Typography>
          </div>
        </Toolbar>
      </AppBar>

      <Container maxWidth="xl" style={{ paddingTop: 24, paddingBottom: 24 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          {/* Search Bar */}
          <SearchFilters
            q={q}
            setQ={setQ}
            status={status}
            setStatus={setStatus}
            dir={dir}
            setDir={setDir}
            app={app}
            setApp={setApp}
            paymentType={paymentType}
            setPaymentType={setPaymentType}
            applications={applications}
            demoPayments={demoPayments}
            minValue={minValue}
            setMinValue={setMinValue}
            maxValue={maxValue}
            setMaxValue={setMaxValue}
          />

          {/* KPI Cards */}
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <MetricCard
                title="Current Ecosystem Health"
                icon={<Security fontSize="small" />}
                mainValue={`${kpi.healthOverall}%`}
                subText="Weighted by availability & latency"
                progress={kpi.healthOverall}
                colorIndicator={healthColor(kpi.healthOverall)}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <MetricCard
                title="Payments Processing Now"
                icon={<AccountBalance fontSize="small" />}
                mainValue={kpi.processing}
                subText={`${kpi.completed} completed • ${kpi.failed} failed`}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <MetricCard
                title="ACKs / NACKs / pacs.002"
                icon={<SwapHoriz fontSize="small" />}
                mainValue={`${kpi.ack}/${kpi.nack}`}
                subText={`pacs.002 received: ${kpi.pacsOk}`}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <MetricCard
                title="Total Value in View (CAD)"
                icon={<TrendingUp fontSize="small" />}
                mainValue={formatMoney(kpi.totalValue, "CAD")}
                subText="Sum of filtered payments"
              />
            </Grid>
          </Grid>

          {/* Subway View */}
          <SubwayView
            applications={applications}
            appHealth={appHealth}
            healthColor={healthColor}
            paymentType={paymentType}
          />

          {/* Charts */}
          <Grid container spacing={2}>
            {/* Aggregated Payment Volume */}
            <Grid size={{ xs: 12, md: 8 }}>
              <VolumeChart stageVolumeData={stageVolumeData} />
            </Grid>
            {/* Status Mix Chart */}
            <Grid size={{ xs: 12, md: 4 }}>
              <StatusMixChart filtered={filtered} />
            </Grid>
          </Grid>

          <IncidentsHub incidents={incidents} applications={applications} />

          {/* Tabs */}
          <Card>
            <Tabs value={tabValue} onChange={(e, v) => setTabValue(v)}>
              <Tab label="Payments / Messages" />
              <Tab label="Applications Health" />
            </Tabs>
            <CardContent>
              {tabValue === 0 && (
                <PaymentsTable
                  rows={filtered}
                  applications={applications}
                  appHealth={appHealth}
                />
              )}
              {tabValue === 1 && (
                <AppsHealth
                  applications={applications}
                  appHealth={appHealth}
                  colorIndicator={healthColor(kpi.healthOverall)}
                />
              )}
            </CardContent>
          </Card>
        </div>
      </Container>
    </div>
  );
}
