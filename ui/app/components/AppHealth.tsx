import React from "react";
import { Grid, Typography, LinearProgress } from "@mui/material";
import { AccountBalance } from "@mui/icons-material";
import { Card, CardContent } from "./CardComponent";

interface Application {
  id: string;
  name: string;
  tier: string;
  slaMs: number;
}

interface AppsHealthProps {
  applications: Application[];
  appHealth: (appId: string) => number;
  colorIndicator?: string;
}

export const AppsHealth: React.FC<AppsHealthProps> = ({
  applications,
  appHealth,
  colorIndicator,
}) => {
  return (
    <Grid container spacing={2} style={{ width: "100%", margin: 0 }}>
      {applications.map((a) => {
        const health = appHealth(a.id);
        return (
          <Grid
            key={a.id}
            size={{ xs: 12, sm: 6, md: 2.4 }}
            style={{ display: "flex" }} // allows Card to stretch
          >
            <div
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Card>
                <div
                  style={{ flex: 1, display: "flex", flexDirection: "column" }}
                >
                  <CardContent>
                    <Typography
                      variant="caption"
                      style={{ display: "flex", alignItems: "center", gap: 4 }}
                    >
                      <AccountBalance fontSize="small" />
                      {a.name}
                    </Typography>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        marginBottom: 4,
                      }}
                    >
                      <Typography
                        variant="h4"
                        style={{ fontWeight: 700, marginTop: 8 }}
                      >
                        {health}%
                      </Typography>
                      {colorIndicator && (
                        <div
                          style={{
                            width: 12,
                            height: 12,
                            borderRadius: "50%",
                            backgroundColor: colorIndicator,
                          }}
                        />
                      )}
                    </div>
                    <Typography variant="caption" color="textSecondary">
                      Tier: {a.tier} • SLA {Math.round(a.slaMs / 60000)}m
                    </Typography>
                    <LinearProgress
                      variant="determinate"
                      value={health}
                      style={{ marginTop: 12 }}
                    />
                  </CardContent>
                </div>
              </Card>
            </div>
          </Grid>
        );
      })}
    </Grid>
  );
};
