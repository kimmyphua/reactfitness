import React, {useRef, useState} from 'react';
import {Modal, Container,Form,Col,Row} from 'react-bootstrap'
import axios from "axios";

function CalculatorForm(user) {
    const [stat, setStat] = useState({})
    const form = useRef(null)
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const [disabled, setDisabled] = useState(true)




    async function updateStat(e){
        e.preventDefault()
        try{
            await axios.put(`/api/user/edit/${user.user._id}`, stat);
            console.log(stat)
        }catch (e) {
            console.log(e.response)
        }

        alert("Successfully Updated Stats!")
    }

    async function change(e) {
        e.preventDefault()
        setStat(prevState => ({...prevState, [e.target.name]: e.target.value}))
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

console.log(stat)
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


    // console.log(user.user)



    return (
        <Container>
            <Row className="info">
            <Col md={6} className="p-4">

            <Row >
                <label>Weight (kg):</label>
                <input
                onChange={change}
                type="number"
                name="weight"
                placeholder="enter weight"
                required={true}/>
            </Row>
                    <Row className="justify-content-center text-left my-1 py-1">
                    <label>Gender:</label>
            <Form.Check
                onChange={change}
                type="radio"
                className="w-25"
                label="Female"
                name="gender"
                value="female"
            />
            <Form.Check
                onChange={change}
                type="radio"
                className="w-25"
                label="Male"
                name="gender"
                value="male"
            />
                    </Row>
                <Row className="justify-content-center text-left my-1 py-1">
                    <label>Height (cm):</label>
            <input
                onChange={change}
                type="number"
                name="height"
                placeholder="enter height"
                required={true}
            />
                </Row>
                    <Row className="justify-content-center text-left my-1 py-1">
                        <label>Age:</label>
                        <input
                            onChange={change}
                            type="number"
                            name="age"
                            placeholder="enter age"
                            required={true}
                        />
                    </Row>
                    <Row className="justify-content-center text-left my-1 py-1">
                        <label>Activity Level:</label>
            <select
                    name="activity"
                    type="text"
                    className="py-2 px-2 my-2"
                    onChange={change}
                    required={true}>
                <option value={""}>Select Activity Level: </option>
                <option value={"sedentary"}>Sedentary</option>
                <option value={"lightly-active"}>Lightly Active</option>
                <option value={"moderately-active"}>Moderately Active</option>
                <option value={"very-active"}>Very Active</option>

            </select>
                    </Row>
                        <Row className="form-floating">
                            <select className="form-select"
                                    id="floatingSelect"
                                    aria-label="Select Goal"
                                    name="goal"
                                    onChange={change}
                                    required={true}>
                                <option>Choose Option</option>
                                <option value="weight-loss">Weight Loss</option>
                                <option value="maintain">Maintain</option>
                                <option value="weight-gain">Weight-Gain</option>
                            </select>
                            <label className="text-dark text-start mx-2" htmlFor="floatingSelect">Select Goal</label>
                        </Row>

                        <Row className="justify-content-center mt-2">

                                <button
                                    type="submit"
                                    style={{width:"50%"}}
                                    onClick={bmr}
                                    className="btn btn-light border-dark border-2">Check Stats</button>

                        </Row>
                    </Col>


                    <Col md={6} className="p-4">

                    </Col>


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
                                   name="carb"
                                   disabled={disabled}
                                   value={stat.carbs? stat.carbs : user.user.carbs }
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
