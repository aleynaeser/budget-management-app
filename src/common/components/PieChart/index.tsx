import { useFormatter } from 'next-intl';
import { useCallback, useState } from 'react';
import { IChartItem } from '@common/interfaces';
import { ResponsiveContainer, PieChart as PieRechart, Pie, Cell, Sector, Legend } from 'recharts';

import './pie-chart.scss';

interface IPieChart {
  data: IChartItem[];
}

export default function PieChart({ data }: IPieChart) {
  const format = useFormatter();
  
  const [activeIndex, setActiveIndex] = useState(0);
  const onPieEnter = useCallback(
    (_: any, index: number) => {
      setActiveIndex(index);
    },
    [setActiveIndex],
  );

  const renderActiveShape = (props: any) => {
    const RADIAN = Math.PI / 180;
    const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value, label } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? 'start' : 'end';

    const formettedPrice = format.number(value, {
      ...(payload.currency && { style: 'currency', currency: payload.currency }),
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

    return (
      <g>
        <circle cx={cx} cy={cy} r={78} fill='var(--theme-color-9)' className='pie-circle' />
        <text x={cx} y={cy} dy={0} fill='var(--theme-color-3)' className='pie-title' textAnchor='middle'>
          {`${(percent * 100).toFixed(1)}%`}
        </text>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          cornerRadius={8}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={outerRadius + 6}
          outerRadius={outerRadius + 10}
          cornerRadius={8}
          fill={fill}
        />
        <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill='none' />
        <circle cx={ex} cy={ey} r={2} fill={fill} stroke='none' />
        <text
          className='pie-label'
          x={ex + (cos >= 0 ? 1 : -1) * 12}
          y={ey}
          textAnchor={textAnchor}
          fill={fill}
        >{`${label}`}</text>
        <text
          fill='var(--font-color-secondary)'
          className='pie-value'
          x={ex + (cos >= 0 ? 1 : -1) * 12}
          y={ey}
          dy={18}
          textAnchor={textAnchor}
        >
          {`${formettedPrice}`}
        </text>
      </g>
    );
  };

  const customLegend = (props: any) => {
    const { payload } = props;

    return (
      <div className='pie-chart-legends'>
        {payload &&
          payload.map((entry: any, index: number) => {
            return (
              <div
                key={index}
                className={`legend ${activeIndex === index ? 'active' : ''}`}
                onClick={() => setActiveIndex(index)}
              >
                <div className='color' style={{ backgroundColor: entry.color }} />
                <div className='title' style={{ color: entry.color }}>
                  {entry.payload.label}
                </div>
              </div>
            );
          })}
      </div>
    );
  };

  return (
    <ResponsiveContainer id='pie-chart-container' width='100%' height={400}>
      <PieRechart className='pie-chart'>
        <Pie
          data={data}
          dataKey='value'
          outerRadius={100}
          innerRadius={90}
          paddingAngle={6}
          cornerRadius={8}
          activeIndex={activeIndex}
          onMouseEnter={onPieEnter}
          activeShape={renderActiveShape}
        >
          {data.map((entry, index) => {
            return <Cell key={`cell-${index}`} className='pie-cell' fill={entry.color} />;
          })}
        </Pie>

        <Legend layout='horizontal' verticalAlign='bottom' align='center' type='circle' content={customLegend} />
      </PieRechart>
    </ResponsiveContainer>
  );
}
