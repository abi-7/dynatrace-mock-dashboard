import React from "react";
import { Grid, Typography, LinearProgress, Link } from "@mui/material";
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
  const APP_ENVIRONMENT_URL = "https://wkf10640.apps.dynatrace.com";
  const problem_ID = "-4062156192660310089_1763067480000V2";

  return (
    <Grid container spacing={2} style={{ width: "100%", margin: 0 }}>
      {applications.map((a) => {
        const health = appHealth(a.id);
        const isPhubLVPE = a.name === "PHUB LVPE";

        console.log("App Health:", { appName: a.name, health, isPhubLVPE });
        return (
          <Grid
            key={a.id}
            size={{ xs: 12, sm: 6, md: 2.4 }}
            style={{ display: "flex" }}
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
                      <div
                        style={{
                          width: 12,
                          height: 12,
                          borderRadius: "50%",
                          backgroundColor: isPhubLVPE
                            ? "#eab308" //yellow
                            : colorIndicator ||
                              (health > 90 ? "#22c55e" : "#f97316"),
                        }}
                      />
                    </div>
                    <Typography variant="caption" color="textSecondary">
                      Tier: {a.tier} • SLA {Math.round(a.slaMs / 60000)}m
                    </Typography>
                    <LinearProgress
                      variant="determinate"
                      value={health}
                      style={{ marginTop: 12 }}
                    />

                    {isPhubLVPE && problem_ID && APP_ENVIRONMENT_URL && (
                      <Link
                        onClick={(e) => {
                          e.preventDefault();
                          window.open(
                            `${APP_ENVIRONMENT_URL}/ui/apps/dynatrace.davis.problems/problem/${problem_ID}`,
                            "_blank"
                          );
                        }}
                        style={{
                          display: "block",
                          marginTop: 8,
                          fontSize: "0.875rem",
                          cursor: "pointer",
                        }}
                      >
                        Incident Drill Down →
                      </Link>
                    )}
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
