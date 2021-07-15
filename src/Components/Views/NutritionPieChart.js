
import React, { useCallback, useState } from "react";
import {PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer} from "recharts";
import {Row, Container, Table,Col } from "react-bootstrap";


const COLORS = ["#0088FE", "#00C49F", "#FFBB28" ];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
                                   cx,
                                   cy,
                                   midAngle,
                                   innerRadius,
                                   outerRadius,
                                   percent,
                                   index
                               }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
        <text
            x={x}
            y={y}
            fill="white"
            textAnchor={x > cx ? "start" : "end"}
            dominantBaseline="central"
        >
            {`${(percent * 100).toFixed(0)}%`}
        </text>
    );
};
export default function NutritionPieChart({cpf}) {

// function show(entry){
//     console.log(entry)
// }
    return (
        <div>
        <Row className="justify-content-center">
            <Col md={8}>
                <ResponsiveContainer width={'100%'} height={400}>
        <PieChart width={600} height={400}>
            <Pie
                data={cpf}
                cx={150}
                cy={200}
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={130}
                fill="#8884d8"
                dataKey="value"
            >

                {cpf.map((entry, index) => (

                    <Cell onClick={()=>alert(`Name: ${entry.name} , ${entry.value} grams`)}
                        key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />


                ))}
                <Tooltip />
            </Pie>
        </PieChart>
                </ResponsiveContainer>
            </Col>
            <Col md={4}>
                <Table striped bordered hover>
                    <thead>
                    <tr style={{backgroundColor: "white"}}>
                        <th>#</th>
                        <th>Name</th>
                        <th>Weight (g)</th>

                    </tr>
                    </thead>
                    <tbody>
                    <tr style={{backgroundColor: "#0088FE"}}>
                        <td>1</td>
                        <td>Carbs</td>
                        <td>{cpf[0]?.value}</td>
                    </tr>
                    <tr style={{backgroundColor: "#00C49F"}}>
                        <td>2</td>
                        <td>Protein</td>
                        <td>{cpf[1]?.value}</td>
                    </tr>
                    <tr style={{backgroundColor: "#FFBB28"}}>
                        <td>3</td>
                        <td>Fats</td>
                        <td>{cpf[2]?.value}</td>
                    </tr>
                    </tbody>
                </Table>
            </Col>
            </Row>
        </div>
    );
}
