import { Prefecture } from "@/types/prefecture";
import { ChartDataItem } from "@/types/population";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Label,
} from "recharts";

type PopulationChartProps = {
  chartData: ChartDataItem[];
  selectedPrefectures: Prefecture[];
  colors: string[];
};

export default function PopulationChart({
  chartData,
  selectedPrefectures,
  colors,
}: PopulationChartProps) {
  return (
    <div className="chart-wrapper">
      <span className="y-axis-label">人口数</span>

      <ResponsiveContainer width="100%" height={450}>
        <LineChart
          data={chartData}
          margin={{ top: 25, right: 45, left: 10, bottom: 25 }}
        >
          <defs>
            <marker
              id="x-axis-arrow"
              markerWidth="8"
              markerHeight="8"
              refX="8"
              refY="4"
              orient="auto"
              markerUnits="strokeWidth"
            >
              <path d="M0,0 L8,4 L0,8 Z" fill="#666" />
            </marker>

            <marker
              id="y-axis-arrow"
              markerWidth="8"
              markerHeight="8"
              refX="4"
              refY="0"
              orient="0"
              markerUnits="strokeWidth"
            >
              <path d="M4,0 L8,8 L0,8 Z" fill="#666" />
            </marker>
          </defs>

          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="year"
            padding={{ left: 10, right: 20 }}
            axisLine={{ stroke: "#666", markerEnd: "url(#x-axis-arrow)" }}
          >
            <Label
              value="年度"
              position="right"
              offset={5}
              fill="#171717"
              fontSize={16}
              fontWeight={600}
            />
          </XAxis>
          <YAxis
            width={90}
            axisLine={{ stroke: "#666", markerStart: "url(#y-axis-arrow)" }}
          />
          <Tooltip />
          <Legend
            verticalAlign="bottom"
            align="center"
            wrapperStyle={{
              paddingTop: "20px",
            }}
          />

          {selectedPrefectures.map((pref, index) => (
            <Line
              key={pref.prefCode}
              type="monotone"
              dataKey={pref.prefName}
              stroke={colors[index % colors.length]}
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
