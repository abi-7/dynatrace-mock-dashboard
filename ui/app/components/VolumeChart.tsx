import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "./CardComponent"; // use your custom card

interface VolumeDataPoint {
  x: string | number;
  y: number;
}

interface VolumeChartProps {
  stageVolumeData: VolumeDataPoint[];
}

export const VolumeChart: React.FC<VolumeChartProps> = ({
  stageVolumeData,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Aggregated Payment Volume</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={stageVolumeData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="x" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="y"
              stroke="#2196f3"
              strokeWidth={2}
              dot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
