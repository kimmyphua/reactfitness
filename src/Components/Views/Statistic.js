
import React, {useEffect, useState} from 'react';
import {Container, Col, Row } from "react-bootstrap";
import axios from "axios";
import * as singstat from "../../data/singstatjson.json"



function RetirementPlanner(props) {
    const [currentFund, setCurrentFund] = useState(0)
    const [retireExpense, setRetireExpense] = useState(0)
    const [currentAge, setCurrentAge] = useState(1)
    const [retireAge, setRetireAge] = useState(60)
    const [lifeExpectancy, setLifeExpectancy] = useState(0)
    const [investReturn, setInvestReturn] = useState(0.05)




    function changeCurrentFund(e) {
        setCurrentFund(e.target.value)
        getRetirePlan()
    }
    function changeRetireExpense(e) {
        setRetireExpense(e.target.value)
        getRetirePlan()
    }
    function changeCurrentAge(e){
        setCurrentAge(e.target.value)
        getRetirePlan()

    }
    function changeRetireAge(e){
        setRetireAge(e.target.value)
        getRetirePlan()

    }
    function getAcc(){


    }
    function changeLifeExpectancy(e){
        setLifeExpectancy(e.target.value)
        getRetirePlan()
    }
    function changeInvestReturn(e){
        setInvestReturn(e.target.value)
        getRetirePlan()
    }


    const [startInflationYear, setStartInflationYear] = useState(0)
    const [currentInflationYear, setCurrentInflationYear] = useState(0)
    const [cumulativeInflation, setCumulativeInflation] = useState(0)
    const [annualInflation, setAnnualInflation] = useState(0)
    const [backtraceFrom, setBacktraceFrom] = useState(0)
    const [results, setResults] = useState({})



    let data = singstat.default.Level1
    let accumulationPeriod = 1
    if (retireAge - currentAge > 59){
        accumulationPeriod = 59
    }else if(retireAge - currentAge > 0){
        accumulationPeriod = retireAge - currentAge
    }else{
        accumulationPeriod = 1
    }
    async function getRetirePlan() {

        await setBacktraceFrom(data.length - 3)  //last index of json
        await setStartInflationYear(data[backtraceFrom-(accumulationPeriod * 3)]?.year) //backtrace to X years before
        await setCurrentInflationYear(data[backtraceFrom]?.year)
        let inflationStart = data[backtraceFrom-(accumulationPeriod * 3)]?.value
        let inflationEnd = data[backtraceFrom].value // remove -3 for latest
        console.log(inflationStart)
        console.log(inflationEnd)

         setCumulativeInflation(((inflationEnd - inflationStart) / inflationStart) * 100)
         setAnnualInflation(((inflationEnd / inflationStart)**(1/(currentInflationYear-startInflationYear)))-1)
    }
    console.log(annualInflation)

    //
    // useEffect(()=>{
    //     getRetirePlan()
    // }, [])




    async function getResults(e){
        e.preventDefault()
        setResults({})
        getRetirePlan()

        let growthRate = Math.abs(investReturn/100)
        console.log(`investment return ${investReturn}`)
        console.log(`growth rate ${growthRate}`)
        console.log(`annual inflation ${annualInflation}`)
        let discountRate = (growthRate - annualInflation)  //R real returns
        console.log(`discount rate ${discountRate}`)
        let drawdownPeriod = lifeExpectancy - retireAge //N
        //vanilla savings
        let retireFunds = 0
        let annualSavings = 0
        let infAdjRetireFunds = 0
        let presentValueRetireFunds = 0
        let infAdjAnnualSavings = 0
        let presentValueSavingsRequired = 0
        retireFunds = retireExpense*drawdownPeriod-currentFund
        annualSavings = (retireExpense*drawdownPeriod-currentFund)/accumulationPeriod
        infAdjRetireFunds = retireExpense *((1-(1+discountRate)**(-drawdownPeriod))/discountRate)//PV/FV at retirement age (Ordinary Annuity)
        presentValueRetireFunds = infAdjRetireFunds*(1/((1+discountRate)**accumulationPeriod))
        if(presentValueRetireFunds - currentFund > 0){
            presentValueSavingsRequired = presentValueRetireFunds - currentFund
        } else{
            presentValueSavingsRequired = 0
        }
        infAdjAnnualSavings = presentValueSavingsRequired/((1-((1+discountRate)**(-accumulationPeriod)))/discountRate) //PMT (Ordinary Annuity)
        console.log(presentValueRetireFunds)
        console.log(currentFund)
        console.log(presentValueRetireFunds)
        console.log(presentValueSavingsRequired)
        console.log(infAdjAnnualSavings)
        await setResults(prevStat=> ({...prevStat,
            retireFunds:retireFunds,
            annualSavings:annualSavings,
            infAdjRetireFunds:infAdjRetireFunds,
            presentValueRetireFunds:presentValueRetireFunds,
            presentValueSavingsRequired: presentValueSavingsRequired ,
            infAdjAnnualSavings: infAdjAnnualSavings
        }))

    }

    console.log(results)



    return (
        <Container>

            You have {accumulationPeriod} years to accumulate your retirement funds. {startInflationYear} to {currentInflationYear}, cumulative inflation was {cumulativeInflation}% with annual inflation of {annualInflation}
                {/*Over the past {accumulationPeriod} years, from {startInflationYear} to {currentInflationYear} (last available CPI number),*/}
                {/*cumulative inflation was {cumulativeInflation}%.*/}

            <Row className="text-center mt-3 "><h1 className="fw-light ">Retirement Planner</h1></Row>

                        <Row className="">
                            <Col md={6}>
                            <h5 className="py-1 text-end">Current Retirement Fund:</h5>
                            </Col>
                            <Col md={4}>
                            <input
                                className="w-100 px-1"
                                type="number"
                                name="currentRetirementFund"
                                placeholder="Current retirement fund"
                                min={1}
                                onChange={changeCurrentFund} />
                            </Col>
                        </Row>

            <Row className="">
                <Col md={6}>
                    <h5 className="py-1 text-end">Desired Annual Retirement Expenses:</h5>
                </Col>
                <Col md={4}>
                    <input
                        className="text-start w-100 px-1"
                        type="number"
                        name="retireExpense"
                        placeholder="Monthly expenses in retirement"
                        min={1}
                        onChange={changeRetireExpense} />
                </Col>
            </Row>
            <Row className="">
                <Col md={6}>
                    <h5 className="py-1 text-end"> Target Retirement Age:</h5>


                </Col>
                <Col md={4}>

                    <input className="text-start w-100 px-1"
                    type="number" name="retireAge"
                    placeholder="Target retirement age"
                    min={1}
                    onChange={changeRetireAge} />

                </Col>
            </Row>


            <Row className="">
                <Col md={6}>
                    <h5 className="py-1 text-end">Current Age:</h5>
                </Col>
                <Col md={4}>
                    <input className="text-start w-100 px-1"
                           type="number"
                           name="currentAge"
                           placeholder="Current age"
                           min={1}
                           onChange={changeCurrentAge} />
                </Col>
            </Row>
            <Row className="">
                <Col md={6}>
                    <h5 className="py-1 text-end">Life Expectancy:</h5>
                </Col>
                <Col md={4}>
                    <input
                        className="text-start w-100 px-1"
                        type="number"
                        name="lifeExpectancy"
                        placeholder="Life expectancy"
                        min={1}
                        onChange={changeLifeExpectancy} />
                </Col>
            </Row>
            <Row className="">
                <Col md={6}>
                    <h5 className="py-1 text-end">Expected Investment Return:</h5>
                </Col>
                <Col md={4}>
                    <input
                        className="text-start w-100 px-1"
                        type="number"
                        name="expectedReturns"
                        placeholder="Assumed 0.05% if uninvested and left in the bank."
                        min={0.01}
                        step="0.01"
                        onChange={changeInvestReturn} />
                </Col>
            </Row>
            <Row className="">
                <Col md={6}>
                    <h5 className="py-1 text-end">Retirement Fund Required:</h5>
                </Col>
                <Col md={4}>
                    <p className="form-floating">

                        <input
                            disabled={true}
                            className="w-100"

                            id="floating"
                        />
                        <label className="text-dark py-1" htmlFor="floating">${results.retireFunds}</label>
                    </p>
                </Col>
            </Row>
            <Row className="">
                <Col md={6}>
                    <h5 className="py-1 text-end">Annual Savings Required:</h5>
                </Col>
                <Col md={4}>
                    <p className="form-floating">

                        <input
                            disabled={true}
                            className="w-100"

                            id="floating"
                        />
                        <label className="text-dark py-1" htmlFor="floating">${results.annualSavings}/year</label>
                    </p>

                </Col>
            </Row>

            <Row className="">
                <Col md={6}>
                    <h5 className="py-1 text-end">Inflation Adjusted Retirement Fund Required:</h5>
                </Col>
                <Col md={4}>
                    <p className="form-floating">

                        <input
                            disabled={true}
                            className="w-100"

                            id="floating"
                        />
                        <label className="text-dark py-1" htmlFor="floating">${results.infAdjRetireFunds}</label>
                    </p>

                </Col>
            </Row>
            <Row className="">
                <Col md={6}>
                    <h5 className="py-1 text-end">Inflation Adjusted Annual Savings:</h5>
                </Col>
                <Col md={4}>
                    <p className="form-floating">

                        <input
                            disabled={true}
                            className="w-100 text-center"

                            id="floating"
                        />
                        <label className="text-dark py-1" htmlFor="floating">${results.infAdjAnnualSavings}</label>
                    </p>

                </Col>
            </Row>

            <button
                className="btn bg-light text-dark border-dark border-1"
                onClick={getResults}>
                Get Results
            </button>


        </Container>






    )
        ;
}
export default RetirementPlanner;


