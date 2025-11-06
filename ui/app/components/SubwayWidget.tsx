import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";

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
}

export const SubwayView: React.FC<SubwayViewProps> = ({
  applications,
  appHealth,
  healthColor,
}) => {
  return (
    <Card elevation={2}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Subway View of Ecosystem
        </Typography>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: 2,
            flexWrap: "wrap",
          }}
        >
          {applications.map((a, index) => {
            const health = appHealth(a.id);
            return (
              <React.Fragment key={a.id}>
                <Box
                  sx={{
                    flex: 1,
                    textAlign: "center",
                    position: "relative",
                    minWidth: 100,
                  }}
                >
                  {/* Circle Node */}
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: "50%",
                      bgcolor: healthColor(health),
                      color: "white",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto 8px",
                      fontWeight: "bold",
                      fontSize: "16px",
                      marginTop: 1,
                      zIndex: 1,
                    }}
                  >
                    {Math.round(health)}%
                  </Box>

                  {/* App name */}
                  <Typography variant="body2" fontWeight={600} gutterBottom>
                    {a.name}
                  </Typography>

                  {/* Tier + SLA info boxes */}
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: 1,
                      marginTop: 1,
                      fontSize: "11px",
                    }}
                  >
                    <Box
                      sx={{
                        p: 1,
                        width: 50,
                        border: "1px solid #ccc",
                        borderRadius: 1,
                        textAlign: "center",
                      }}
                    >
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        display="block"
                      >
                        Tier
                      </Typography>
                      <Typography variant="caption" fontWeight={700}>
                        {a.tier}
                      </Typography>
                    </Box>

                    <Box
                      sx={{
                        p: 1,
                        width: 70,
                        border: "1px solid #ccc",
                        borderRadius: 1,
                        textAlign: "center",
                      }}
                    >
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        display="block"
                      >
                        SLA
                      </Typography>
                      <Typography variant="caption" fontWeight={700}>
                        {Math.round(a.slaMs / 60000)}m
                      </Typography>
                    </Box>
                  </Box>
                </Box>

                {/* Connecting bar */}
                {index < applications.length - 1 && (
                  <Box
                    sx={{
                      width: 80,
                      alignSelf: "flex-start",
                      mt: "20px",
                      zIndex: 0,
                    }}
                  >
                    <Box
                      sx={{
                        height: 8,
                        bgcolor: "#e0e0e0",
                        borderRadius: 1,
                        overflow: "hidden",
                      }}
                    >
                      <Box
                        sx={{
                          height: "100%",
                          width: `${health}%`,
                          bgcolor: healthColor(health),
                          transition: "width 0.3s ease",
                        }}
                      />
                    </Box>
                  </Box>
                )}
              </React.Fragment>
            );
          })}
        </Box>
      </CardContent>
    </Card>
  );
};
