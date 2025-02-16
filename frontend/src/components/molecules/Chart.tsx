// NeedlePieChart.tsx
import React from 'react';
import { PieChart, Pie, Cell } from 'recharts';

const RADIAN = Math.PI / 180;
const cx = 150;
const cy = 200;
const iR = 50;
const oR = 100;

// Pastel color palette
const pastelColors = {
  red: '#FFADAD',
  yellow: '#FFD6A5',
  green: '#CAFFBF',
};

// Function to draw the needle
const needle = (value: number, cx: number, cy: number, iR: number, oR: number) => {
  const angle = 180 * (1 - value / 100);
  const length = (iR + 2 * oR) / 3;
  const sin = Math.sin(-RADIAN * angle);
  const cos = Math.cos(-RADIAN * angle);
  const r = 5;
  const x0 = cx;
  const y0 = cy;
  const xba = x0 + r * sin;
  const yba = y0 - r * cos;
  const xbb = x0 - r * sin;
  const ybb = y0 + r * cos;
  const xp = x0 + length * cos;
  const yp = y0 + length * sin;

  return [
    <circle key="circle" cx={x0} cy={y0} r={r} fill="#333" stroke="none" />,
    <path key="needle" d={`M${xba} ${yba}L${xbb} ${ybb} L${xp} ${yp} L${xba} ${yba}`} fill="#333" />,
  ];
};

interface NeedlePieChartProps {
  value: number;
}

const NeedlePieChart: React.FC<NeedlePieChartProps> = ({ value }) => {
  const data = [
    { name: 'Red', value: 50, color: pastelColors.red },
    { name: 'Yellow', value: 20, color: pastelColors.yellow },
    { name: 'Green', value: 30, color: pastelColors.green },
  ];

  return (
    <PieChart width={400} height={500}>
      <Pie
        dataKey="value"
        startAngle={180}
        endAngle={0}
        data={data}
        cx={cx}
        cy={cy}
        innerRadius={iR}
        outerRadius={oR}
        stroke="none"
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={entry.color} />
        ))}
      </Pie>
      {needle(value, cx, cy, iR, oR)}
    </PieChart>
  );
};

export default NeedlePieChart;
