
import React from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
} from "recharts";


export default function Charts({newGraphData}) {
let dataKey
    if(newGraphData.length >1){
        dataKey = newGraphData.sort((a,b) =>(new Date(a.date) - new Date(b.date))).map(g => ({...g, date: g.date.split("T")[0] }))
    }else{
        dataKey = newGraphData.map(g => ({...g, date: g.date.split("T")[0] }))
    }




    return (
        <>
        <ResponsiveContainer width={'99%'} height={300}>
        <LineChart
            width={800}
            height={300}
            data={dataKey}
            className="bg-dark text-dark"
            margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
            }}
        >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip
                />
            <Legend />
            <Line
                type="monotone"
                dataKey="weight_kg"
                stroke="#8884d8"
                activeDot={{ r: 4 }}

            />
            {/*<Line type="monotone" dataKey="uv" stroke="#82ca9d" />*/}
        </LineChart>
        </ResponsiveContainer>
        </>
    );
}
