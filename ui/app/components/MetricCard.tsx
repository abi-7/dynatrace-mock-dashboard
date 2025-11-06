import React from "react";
import { Typography, LinearProgress } from "@mui/material";
import { Card, CardContent, CardHeader, CardTitle } from "./CardComponent";

interface MetricCardProps {
  title: string;
  icon: React.ReactNode;
  mainValue: string | number;
  subText?: string;
  progress?: number; // optional, for linear progress
  colorIndicator?: string; // optional small circle color
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  icon,
  mainValue,
  subText,
  progress,
  colorIndicator,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {icon}
          <span style={{ marginLeft: 10 }}>{title}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div
          style={{ display: "flex", flexDirection: "column", minHeight: 100 }}
        >
          {/* Main value + optional color indicator */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 4,
            }}
          >
            <Typography style={{ fontSize: 24, fontWeight: 700 }}>
              {mainValue}
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

          {/* Subtext */}
          <div
            style={{
              minHeight: 20,
              marginBottom: progress !== undefined ? 12 : 0,
            }}
          >
            {subText && (
              <Typography style={{ fontSize: 12, color: "#6b7280" }}>
                {subText}
              </Typography>
            )}
          </div>

          {/* Optional progress bar - pushed to bottom */}
          {progress !== undefined && (
            <div style={{ marginTop: "auto" }}>
              <LinearProgress
                variant="determinate"
                value={progress}
                style={{ height: 8, borderRadius: 4 }}
              />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
