import React from 'react'
import { Button, Row, Input, Icon, Card, Col, Table } from 'react-materialize'

const MacrosCard = ({
                        trainingTitle,
                        trainingCal,
                        restCal,
                        restTitle,
                        trainingCarbs,
                        trainingFats,
                        trainingProtein,
                        restCarbs,
                        restFats,
                        restProtein }) => {

    const trainingMacrosList = (
        <Table >
            <thead >
            <tr>
                <th data-field="id">Net Carbs (g)</th>
                <th data-field="name">Fats (g)</th>
                <th data-field="price">Protein (g)</th>
            </tr>
            </thead>
            <tbody >
            <tr>
                <td>{trainingCarbs}</td>
                <td>{trainingFats}</td>
                <td>{trainingProtein}</td>
            </tr>
            </tbody>
        </Table>
    );
    const restMacrosList = (
        <Table>
            <thead>
            <tr>
                <th data-field="id">Net Carbs (g)</th>
                <th data-field="name">Fats (g)</th>
                <th data-field="price">Protein (g)</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td>{restCarbs}</td>
                <td>{restFats}</td>
                <td>{restProtein}</td>
            </tr>
            </tbody>
        </Table>
    );

    return (
        <Card className="amber lighten-5">
            <Row>
                <Col l={6} m={12} s={12} >
                    <Card className='blue'
                          textClassName='black-text'
                          className="amber darken-4"
                    >
                        <h5 className="center-align">Training Day Macros</h5>
                        {trainingMacrosList && trainingMacrosList}
                    </Card>
                </Col>

                <Col l={6} m={12} s={12}>
                    <Card className='blue lighten-2'
                          textClassName='white-text'
                          className="amber darken-3"
                          textClassName='black-text'
                    >
                        <h5 className="center-align">Rest Day Macros</h5>
                        {restMacrosList && restMacrosList}
                    </Card>
                </Col>

            </Row>
        </Card>
    )

}

export default MacrosCard

