import React, {useState, useRef} from "react";
import {Container, Row, Form, Modal, Col} from "react-bootstrap";
import styles from "./Register.module.css";
import axios from 'axios'
import {Link, Redirect} from "react-router-dom";


function Register({auth, setAuth}) {
    const [data, setData] = useState({})
    const form = useRef(null)
    const [stat, setStat] = useState({weight_log : { weight_kg : 0, date: new Date().toDateString()}})
    // const form = useRef(null)
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const [disabled, setDisabled] = useState(true)
    const [weightLog, setWeightLog] =useState({})
    const [startDate, setStartDate] = useState(new Date());
    // const [graphData, setGraphData] = useState([])
    const [cpf, setCPF] =useState([])






    async function submitForm(e) {
        e.preventDefault()
        try {
            let {data: {token}} = await axios.post("/api/auth/register", stat)
            console.log(token)
            localStorage.setItem("token", token)
            setAuth(true)

        } catch (e) {
            console.log(e)
            alert(e)
        }
    }

    function change(e) {
        setStat(prevState => ({...prevState, [e.target.name]: e.target.value}))
    }



    function setWeight(){
        setStat(prevState => ({...prevState, weight_log: { weight_kg: stat.weight, date: new Date().toDateString()}}))
        // setStat(prevState => ({...prevState, weight: e.target.value }))
    }

    async function bmr(){
        setWeight()

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
    console.log(stat)





    if (auth) {
        return < Redirect to="/profile"/>
    }

    console.log("123")
    return (
        <div>
            <Container>

                <div className={`${styles.container} text-center container-fluid d-flex align-items-center justify-content-center`}>
                    <div className={styles.registrationFormContainer}>
                        <fieldset className="border p-3 rounded">

                            <legend
                                className={`${styles.registrationFormLegend} border rounded p-1 text-center text-dark`}
                            >
                                Registration Form
                            </legend>
                            <Row>
                                <Col md={6}>
                                <div className="form-group">
                                    <label htmlFor="inputForEmail">Email address:</label>
                                    <input onChange={change}
                                           id="inputForEmail"
                                           type="email"
                                           name="email"
                                           className={`${styles.inputStyle} form-control`}
                                           aria-describedby="Enter email address"
                                           placeholder="Enter email address"
                                           required={true}/>


                                </div>
                                <div className="form-group">
                                    <label htmlFor="inputForName">Your Name:</label>
                                    <input onChange={change}
                                           id="inputForName"
                                           type="text"
                                           name="name"
                                           className={`${styles.inputStyle} form-control`}
                                           aria-describedby="Enter your name"
                                           placeholder="Enter your name"
                                           required={true}
                                           minLength={3}
                                    />

                                </div>
                                <div className="form-group">
                                    <label htmlFor="inputForPassword">Password (min 6 characters):</label>
                                    <input onChange={change}
                                           type="password"
                                           name="password"
                                           className={`${styles.inputStyle} form-control`}
                                           id="inputForPassword"
                                           placeholder="Enter password"
                                           required={true}
                                           minLength={6}
                                    />
                                </div>


                                <div className="form-group">
                                    <label htmlFor="inputForWeight">Weight (kg):</label>
                                    <input onChange={change}
                                           type="number"
                                           name="weight"
                                           className={`${styles.inputStyle} form-control`}
                                           id="inputForWeight"
                                           placeholder="Enter Weight"
                                           required={true}
                                           minLength={1}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="inputForWeight">Height (cm):</label>
                                    <input onChange={change}
                                           type="number"
                                           name="height"
                                           className={`${styles.inputStyle} form-control`}
                                           id="inputForWeight"
                                           placeholder="Enter Height"
                                           required={true}
                                           minLength={1}
                                    />
                                </div>

                                </Col>
                                <Col md={6}>
                                <div className="form-group">
                                    <label htmlFor="inputForWeight">Age (years):</label>
                                    <input onChange={change}
                                           type="number"
                                           name="age"
                                           className={`${styles.inputStyle} form-control`}
                                           id="inputForWeight"
                                           placeholder="Enter Age"
                                           required={true}
                                           minLength={1}
                                    />
                                </div>


                                <div className="form-group">
                                    <label htmlFor="inputForGender">Gender:</label>
                                    <select onChange={change}
                                           name="gender"
                                           className={`${styles.inputStyle} form-control`}
                                           placeholder="Choose Gender"
                                           required={true}

                                    >
                                        <option> Click to choose gender </option>
                                        <option value="female">Female</option>
                                        <option value="male">Male</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="inputForGender">Activity:</label>
                                    <select onChange={change}
                                            name="activity"
                                            className={`${styles.inputStyle} form-control`}
                                            placeholder="Choose Activity"
                                            required={true}

                                    >
                                        <option value={""}>Click to Choose Activity Level </option>
                                        <option value={"sedentary"}>Sedentary</option>
                                        <option value={"lightly-active"}>Lightly Active</option>
                                        <option value={"moderately-active"}>Moderately Active</option>
                                        <option value={"very-active"}>Very Active</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="inputForGender">Weight Goal:</label>
                                    <select onChange={change}
                                            name="goal"
                                            className={`${styles.inputStyle} form-control`}
                                            placeholder="Choose Goal"
                                            required={true}

                                    >
                                        <option>Click to choose goal:</option>
                                        <option value="weight-loss">Weight Loss</option>
                                        <option value="maintain">Maintain</option>
                                        <option value="weight-gain">Weight-Gain</option>
                                    </select>
                                </div>

                                <div className="d-flex align-items-center justify-content-center">
                                    <button onClick={bmr} className="btn border-dark navButton mx-2">
                                        Next
                                    </button>
                                    <button className="btn border-dark navButton mx-2">
                                        <Link to="/login">Cancel</Link>
                                    </button>
                                </div>
                            </Col>
                            </Row>
                        </fieldset>

                    </div>
                </div>

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
                                   value={stat.bmr }
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
                                   value={stat.daily_calorie}
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
                                   value={stat.tdee}
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
                                   value={stat.carbs}
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
                                   value={stat.protein}
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
                                   value={stat.fat}
                                   placeholder="Fat Intake "
                                   id="label"
                                   className="form-control"/>
                            <label htmlFor="label" className="text-dark mx-2">Fat (g)</label>
                        </form>

                        <Form ref={form} onSubmit={submitForm}>

                            <button
                                style={{width:"30%"}}
                                type="submit"
                                className="btn btn-light border-dark border-1 mx-1">Submit</button>
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


            </Container>

        </div>

    )
}


export default Register
