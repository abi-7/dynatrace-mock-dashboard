import React from "react";
import { Typography, Chip } from "@mui/material";
import { Warning } from "@mui/icons-material";
import { Card, CardContent, CardHeader, CardTitle } from "./CardComponent";

interface Application {
  id: string;
  name: string;
}

interface Incident {
  id: string;
  severity: string;
  title: string;
  appId: string;
  opened: number;
  status: string;
}

// Utility function to format time ago
function timeAgo(ts: number) {
  const diff = Date.now() - ts;
  const m = Math.floor(diff / 60000);
  if (m < 1) return "just now";
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  return `${h}h ${m % 60}m ago`;
}

interface IncidentsHubProps {
  incidents: Incident[];
  applications: Application[];
}

export const IncidentsHub: React.FC<IncidentsHubProps> = ({
  incidents,
  applications,
}) => {
  return (
    <Card>
      <div style={{ padding: 8 }}>
        <CardHeader>
          <CardTitle>
            <Warning />
            <span style={{ marginLeft: 10 }}>Ongoing Incidents & Alerts</span>
          </CardTitle>
        </CardHeader>
      </div>

      <CardContent>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 16,
          }}
        >
          {incidents.map((x) => {
            const sevColor =
              x.severity === "High"
                ? "error"
                : x.severity === "Medium"
                ? "warning"
                : "info";

            return (
              <Card key={x.id}>
                <CardContent>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      marginBottom: 8,
                      gap: 8,
                    }}
                  >
                    <CardTitle style={{ fontWeight: 600, flex: 1 }}>
                      {x.title}
                    </CardTitle>
                    <Chip
                      label={x.severity}
                      color={sevColor as any}
                      size="small"
                    />
                  </div>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    style={{ marginBottom: 4 }}
                  >
                    {applications.find((a) => a.id === x.appId)?.name}
                  </Typography>
                  <Typography variant="caption" color="textSecondary">
                    {x.id} • opened {timeAgo(x.opened)}
                  </Typography>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
