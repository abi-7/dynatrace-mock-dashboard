import React from "react";
import { Grid, Typography } from "@mui/material";
import { PieChart, Pie, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "./CardComponent"; // your custom Card components

interface StatusMixProps {
  filtered: any[]; // array of payments or items to aggregate by status
}

export const StatusMixChart: React.FC<StatusMixProps> = ({ filtered }) => {
  // Aggregate counts per status
  const statusData = Object.entries(
    filtered.reduce((acc: Record<string, number>, p: any) => {
      acc[p.status] = (acc[p.status] || 0) + 1;
      return acc;
    }, {})
  ).map(([name, value]) => ({ name, value }));

  const hasData = statusData.length > 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Status Mix</CardTitle>
      </CardHeader>
      <CardContent>
        <div style={{ height: 300 }}>
          {hasData ? (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  dataKey="value"
                  data={statusData}
                  outerRadius={90}
                  label={(entry: any) => entry.name}
                />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <Typography variant="subtitle1" color="textSecondary">
              No data
            </Typography>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
