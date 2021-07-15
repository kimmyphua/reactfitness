import React, {useEffect, useRef, useState} from 'react';
import Charts from "./Charts";
import {Tab,Tabs, Modal, Container,Form,Col,Row,} from 'react-bootstrap'
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import MTable from "./MTable";
import NutritionPieChart from "./NutritionPieChart";

function CalculatorForm(user) {
    const [stat, setStat] = useState({})
    const form = useRef(null)
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const [disabled, setDisabled] = useState(true)
    const [weightLog, setWeightLog] =useState({})
    const [startDate, setStartDate] = useState(new Date());
    const [graphData, setGraphData] = useState([])
    const [cpf, setCPF] =useState([])

    async function initialize() {
        let {data} = await axios.get("/api/auth/user", {
            headers: {
                authorization: `Bearer ${localStorage.token}`
            }
        })
        // console.log(data.user.weightLog)
        await setCPF([{name: "carbs", value: data.user.carbs}, {name: "protein", value: data.user.protein}, {name: "fat", value: data.user.fat}])
        await setGraphData(data.user.weight_log)
        await setStat({
            weight: data.user.weight,
            height: data.user.height,
            gender: data.user.gender,
            activity: data.user.activity,
            goal: data.user.goal,
            age: data.user.age
        })
        await setWeightLog({
         weight_kg: data.user.weight, date: new Date().toDateString()
        })
    }

    console.log(user)

    useEffect(() => {
    initialize()
    },[])


    async function weightInitialize() {
        let {data} = await axios.get("/api/auth/user", {
            headers: {
                authorization: `Bearer ${localStorage.token}`
            }
        })

        setGraphData(data.user.weight_log)

    }





    async function updateStat(e){
        e.preventDefault()
        try{
            await axios.put(`/api/user/edit/${user.user._id}`, stat)
            await axios.put(`/api/user/weight/${user.user._id}` , weightLog)

            alert("Successfully Updated Stats!")
        }catch (e) {
            console.log(e.response)
        }

        weightInitialize()
        setShow(false)
    }

    async function change(e) {
        await setStat(prevState => ({...prevState, [e.target.name]: e.target.value }))

    }

    function setWeight(e){
        setWeightLog(prevState => ({...prevState, weight_kg: e.target.value}))
        setStat(prevState => ({...prevState, weight: e.target.value }))
        console.log(weightLog)
    }


    async function changeWeight(e) {
        e.preventDefault()
        setWeightLog(prevState => ({...prevState, weight_kg: e.target.value}))


    }

    function onChange(){
        setWeightLog(prevState => ({...prevState, date: startDate.toDateString()}))

    }

    useEffect(() => {
        onChange()
    }, [startDate])


    useEffect(() => {

    }, [startDate])


    async function updateWeight(e){
        e.preventDefault()
        try{
            await axios.put(`/api/user/weight/${user.user._id}` , weightLog)


        }catch (e) {
            console.log(e.response)
        }
        console.log(weightLog)
        alert("Successfully Logged Weight!")
        form?.current?.reset()
        weightInitialize()
    }




    async function bmr(){
        let value = 0

        if (stat.gender === "female"){
            value += Math.floor(10*stat.weight + 6.25*stat.height - 5*stat.age - 161)
        }else{
            value += Math.floor(10*stat.weight + 6.25*stat.height - 5*stat.age + 5)
        }
        setStat(prevState => ({...prevState, bmr: value}))


        let val = 0
        if (stat.activity === "sedentary"){
            val += Math.floor(value * 1.2)
         }else if(stat.activity === "lightly-active"){
            val += Math.floor(value * 1.375)
        }else if(stat.activity === "moderately-active"){
            val += Math.floor(value * 1.55)
        }else if(stat.activity === "very-active"){
            val += Math.floor(value * 1.725)
        }else{
            val += value
        }

        setStat(prevState => ({...prevState, tdee: val}))

        let daily_calorie = 0
        if (stat.goal === "weight-loss"){
            daily_calorie += Math.floor(val * 0.80)
        }else if(stat.activity === "weight-gain"){
            daily_calorie += Math.floor(val * 1.2)
        }else{
            daily_calorie += val
        }

        setStat(prevState => ({...prevState, daily_calorie :daily_calorie }))

        let carbs = 0
        let protein = 0
        let fat = 0
        if(stat.goal === "weight-loss"){
            carbs += Math.floor( daily_calorie*0.45/4)
            protein += Math.floor( daily_calorie*0.35/4)
                fat += Math.floor( daily_calorie*0.20/9)
        }else if(stat.goal === "weight-gain"){
            carbs += Math.floor( daily_calorie*0.50/4)
            protein += Math.floor( daily_calorie*0.30/4)
            fat += Math.floor( daily_calorie*0.20/9)
        }else {
            carbs += Math.floor( daily_calorie*0.60/4)
            protein += Math.floor( daily_calorie*0.30/4)
            fat += Math.floor( daily_calorie*0.10/9)
        }
        setStat(prevState => ({...prevState, carbs: carbs, protein:protein, fat:fat}))
        setShow(true)

    }


    /**Men: calories/day = 10 x weight (kg) + 6.25 x height (cm) – 5 x age (y) + 5
     Women: calories/day = 10 x weight (kg) + 6.25 x height (cm) – 5 x age (y) – 161
     Then, multiply your result by an activity factor — a number that represents different levels of activity (7):

     Sedentary: x 1.2 (limited exercise)
     Lightly active: x 1.375 (light exercise less than three days per week)
     Moderately active: x 1.55 (moderate exercise most days of the week)
     Very active: x 1.725 (hard exercise every day)
     Extra active: x 1.9 (strenuous exercise two or more times per day)

     Carbs: 45–65% of total calories
     Fats: 20–35% of total calories
     Proteins: 10–35% of total calories
     **/

    console.log(graphData)

    return (
        <Container className="info">

            <Row className="py-3 mx-3">

                <Tabs
                    style={{color: "white"}}
                    defaultActiveKey="Calculator" id="uncontrolled-tab-example" className="text-dark mb-3 mx-2 bg-light fw-bolder" >

                    <Tab eventKey="Calculator" title="Calculator " tabClassName="text-dark">
                        <Row>
                        <Col md={5}>
                        <Row className="form-floating my-1 py-1 w-75 mx-5 ">


                            <input
                                onChange={setWeight}
                                type="number"
                                name="weight"
                                className="form-control"
                                id="floatingSelect"
                                defaultValue={user.user.weight}
                                placeholder="enter weight"
                                required={true}/>

                            <label className="text-muted mx-1 text-end" htmlFor="floatingSelect">Weight (kg)</label>

                        </Row>
                        <Row className="form-floating my-1 py-1 w-75 mx-5 ">
                            <select className="form-select"
                                    id="floatingSelect"
                                    aria-label="Select Gender"
                                    name="gender"
                                    defaultValue={user.user.gender}
                                    onChange={change}
                                    required={true}>

                                <option> Click to change  </option>
                                <option value="female">Female</option>
                                <option value="male">Male</option>

                            </select>
                            <label className="text-dark text-end mx-2" htmlFor="floatingSelect">Gender: <text className="text-danger fw-bold"> {user.user.gender}</text></label>
                        </Row>

                        <Row className="form-floating my-1 py-1 w-75 mx-5">

                            <input
                                onChange={change}
                                type="number"
                                name="height"
                                className=" form-control"
                                id="floatingSelect"
                                defaultValue={user.user.height}
                                placeholder="enter height"
                                required={true}
                            />

                            <label className="text-muted mx-1 text-end" htmlFor="floatingSelect">Height (cm) </label>
                        </Row>
                        <Row className="form-floating my-1 py-1 w-75 mx-5">

                            <input
                                onChange={change}
                                type="number"
                                className=" form-control"
                                id="floatingSelect"
                                name="age"
                                defaultValue={user.user.age}
                                placeholder=""
                                required={true}
                            />

                            <label className="text-muted mx-2 text-end" htmlFor="floatingSelect">Age (Years)</label>

                        </Row>
                        <Row className="form-floating my-1 py-1 w-75 mx-5">

                            <select
                                name="activity"
                                type="text"
                                className="form-select"
                                onChange={change}
                                required={true}>
                                <option value={""}>Click to change </option>
                                <option value={"sedentary"}>Sedentary</option>
                                <option value={"lightly-active"}>Lightly Active</option>
                                <option value={"moderately-active"}>Moderately Active</option>
                                <option value={"very-active"}>Very Active</option>
                            </select>
                            <label className="text-dark text-end mx-2" htmlFor="floatingSelect">{user.user.activity}</label>

                        </Row>
                        <Row className="form-floating my-1 py-1 w-75 mx-5">
                            <select className="form-select"
                                    id="floatingSelect"
                                    aria-label="Select Goal"
                                    name="goal"
                                    defaultValue={user.user.goal}
                                    onChange={change}
                                    required={true}>
                                <option>Click to change</option>
                                <option value="weight-loss">Weight Loss</option>
                                <option value="maintain">Maintain</option>
                                <option value="weight-gain">Weight-Gain</option>
                            </select>
                            <label className="text-dark text-end mx-2" htmlFor="floatingSelect">{user.user.goal}</label>
                        </Row>

                        <Row className="justify-content-center mt-2">

                            <button
                                type="submit"
                                style={{width:"30%"}}
                                onClick={bmr}
                                className="btn btn-light border-dark border-2">Check</button>

                        </Row>

                        </Col>
                            <Col md={7}>
                                <MTable user={user} newGraphData={graphData} setGraphData={setGraphData} />
                            </Col>
                    </Row>
                    </Tab>


                    <Tab eventKey="Weight" title="Weight" tabClassName="text-dark">
                        <Row>
                    <Col md={4}>
                        <h2>Log Weight:</h2>
                        <DatePicker
                            todayButton="Today"
                            selected={startDate}
                            onChange={(date) => setStartDate(date)}
                            maxDate={new Date()}
                        />


                        <form ref={form} className="form-floating my-1 ">
                            <input onChange={changeWeight}
                                   type="number"
                                   name="weight_kg"
                                   placeholder="Enter New Weight"
                                   id="label"
                                   className="form-control"/>
                            <label htmlFor="label" className="text-dark mx-2">New Weight (kg)</label>
                        </form>

                        <button onClick={updateWeight} className="btn btn-light border-1 border-dark">Submit</button>

                    </Col>
                            <Col md={7}>
                                <MTable newGraphData={graphData} setGraphData={setGraphData}   />
                            </Col>
                        </Row>
                    </Tab>


                    <Tab eventKey="overview" title="Overview" tabClassName="text-dark">
                    <Charts
                    graphData={graphData}
                    newGraphData={graphData}/>
                    </Tab>

                    <Tab eventKey="nutrition" title="Nutrition" tabClassName="text-dark">
                        <NutritionPieChart
                            cpf={cpf}/>
                    </Tab>
                </Tabs>



                <Modal

                    show={show}
                    onHide={handleClose}>
                    <div className={`border border-dark border-2 text-center p-3`}>
                        <img style={{width: "30%"}} className="navButton"
                             src="https://i.pinimg.com/originals/81/c1/0f/81c10f2bd4a087c3a42e0b70f60e220b.png"/>

                        <form className="form-floating my-1">
                            <input onChange={change}
                                   type="number"
                                   name="bmr"
                                   disabled={disabled}
                                   value={stat.bmr ? stat.bmr : user.user.bmr}
                                   placeholder="BMR "
                                   id="label"
                                   className="form-control"/>
                            <label htmlFor="label" className="text-dark mx-2">BMR (kcal)</label>
                        </form>
                        <form className="form-floating my-1">
                            <input onChange={change}
                                   type="number"
                                   name="daily_calorie"
                                   disabled={disabled}
                                   value={stat.daily_calorie ? stat.daily_calorie : user.user.daily_calorie}
                                   placeholder="daily_calorie "
                                   id="label"
                                   className="form-control"/>
                            <label htmlFor="label" className="text-dark mx-2">Daily Calorie Intake (kcal)</label>
                        </form>
                        <form className="form-floating my-1">
                            <input onChange={change}
                                   type="number"
                                   name="tdee"
                                   disabled={disabled}
                                   value={stat.tdee ? stat.tdee : user.user.tdee}
                                   placeholder="TDEE"
                                   id="label"
                                   className="form-control"/>
                            <label htmlFor="label" className="text-dark mx-2">TDEE (kcal)</label>
                        </form>

                        <form className="form-floating my-1">
                            <input onChange={change}
                                   type="number"
                                   name="carbs"
                                   disabled={disabled}
                                   value={stat.carbs? stat.carbs : user.user.carbs}
                                   placeholder="Carbs Intake "
                                   id="label"
                                   className="form-control"/>
                            <label htmlFor="label" className="text-dark mx-2">Carbs (g)</label>
                        </form>
                        <form className="form-floating my-1">
                            <input onChange={change}
                                   type="number"
                                   name="protein"
                                   disabled={disabled}
                                   value={stat.protein ? stat.protein : user.user.protein}
                                   placeholder="Protein Intake "
                                   id="label"
                                   className="form-control"/>
                            <label htmlFor="label" className="text-dark mx-2">Protein (g)</label>
                        </form>
                        <form className="form-floating my-1">
                            <input onChange={change}
                                   type="number"
                                   name="fat"
                                   disabled={disabled}
                                   value={stat.fat ? stat.fat : user.user.fat}
                                   placeholder="Fat Intake "
                                   id="label"
                                   className="form-control"/>
                            <label htmlFor="label" className="text-dark mx-2">Fat (g)</label>
                        </form>

                        <Form ref={form} onSubmit={updateStat}>

                            <button
                                style={{width:"30%"}}
                                type="submit"
                                className="btn btn-light border-dark border-1 mx-1">Update</button>
                        </Form>
                        <p className="py-1">
                        Click <button
                        // style={{width:"30%"}}
                        onClick={() => setDisabled(false)}
                        className="btn btn-transparent text-danger text-decoration-underline">Here</button>
                        to readjust goals.
                        </p>
                    </div>


                </Modal>

            </Row>
        </Container>
    );
}

export default CalculatorForm;
