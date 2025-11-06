import React from "react";
import { Grid, Typography } from "@mui/material";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent as CustomCardContent,
} from "./CardComponent";

interface Application {
  id: string;
  name: string;
  tier: string;
  slaMs: number;
}

interface SubwayViewProps {
  applications: Application[];
  appHealth: (id: string) => number;
  healthColor: (health: number) => string;
  paymentType: string;
}

export const SubwayView: React.FC<SubwayViewProps> = ({
  applications,
  appHealth,
  healthColor,
  paymentType,
}) => {
  // Counter for wire labels
  let wireCount = 1;
  return (
    <Card>
      <CardHeader>
        <CardTitle>Subway View of Ecosystem</CardTitle>
      </CardHeader>
      <CustomCardContent>
        <Grid container spacing={2}>
          {applications.map((a) => {
            const health = appHealth(a.id);
            // Determine label based on paymentType
            const displayName =
              paymentType === "Wire" ? `WIRE ${wireCount++}` : a.name;

            return (
              <Grid size={{ xs: 12, sm: 6, md: 2.4 }} key={a.id}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    marginBottom: 8,
                  }}
                >
                  <div
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      backgroundColor: healthColor(health),
                    }}
                  />
                  <Typography variant="body2" style={{ fontWeight: 500 }}>
                    {displayName}
                  </Typography>
                </div>
                <Card style={{ borderRadius: 8, padding: 8 }}>
                  <CustomCardContent>
                    <Typography variant="caption" color="textSecondary">
                      {a.tier}
                    </Typography>
                    <Typography variant="h5" style={{ fontWeight: 600 }}>
                      {health}%
                    </Typography>
                    <Typography variant="caption" color="textSecondary">
                      SLA {Math.round(a.slaMs / 60000)}m
                    </Typography>
                  </CustomCardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </CustomCardContent>
    </Card>
  );
};
