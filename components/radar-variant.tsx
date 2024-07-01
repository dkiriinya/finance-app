import {
    PolarAngleAxis,
    PolarGrid,
    PolarRadiusAxis,
    Radar,
    RadarChart,
    ResponsiveContainer,
    Tooltip
}from "recharts";

import { CategoryToolTip } from "./category-tooltip";


type Props = {
    data?:{
       name:string;
       value:number;
    }[];
};

export const RadarVariant = ({data}:Props) => {
    return (
        <ResponsiveContainer width="100%" height={350}>
            <RadarChart
                data={data}
                cx="50%"
                cy="50%"
                outerRadius={60}
            >
                 <Tooltip content={<CategoryToolTip/>} />
                <PolarGrid />
                <PolarAngleAxis style={{fontSize:"12px"}} dataKey="name" />
                <PolarRadiusAxis />
                <Radar dataKey="value" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
            </RadarChart>
        </ResponsiveContainer>
    )
}