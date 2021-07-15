import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Col, Form, Row, Modal} from "react-bootstrap";
import Calendar from 'react-calendar'
// import 'react-calendar/dist/Calendar.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import FitnessCenterIcon from 'react-materialize';



function AddFood({item,i}) {

    const [foodLog, setFoodLog] = useState({ date: new Date().toDateString()})
    const [quantity, setQuantity] = useState(1)
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const [startDate, setStartDate] = useState(new Date());

    function onChange(){
        setFoodLog(prevState => ({...prevState, date: startDate.toDateString()}))
        console.log(foodLog)
    }

    useEffect(() => {
        onChange()
    }, [startDate])

    useEffect(() => {
        settingFood()
    }, [quantity])


    function handleShow() {
        setShow(true)
        settingFood()
    }


    async function settingFood(e){

        console.log(foodLog)
        // setQuantity(e.target.value)
        setFoodLog(prevState => ({...prevState,

            name:item.item_name,
            brand: item.brand_name,
            calories: Math.floor(item.nf_calories*quantity),
            serving_size: Math.floor(item.nf_serving_size_unit*quantity),
            serving_weight: Math.floor(item.nf_serving_weight_grams*quantity),
            total_fat: Math.floor(item.nf_total_fat*quantity),
            total_carbs: Math.floor(item.nf_total_carbohydrate*quantity),
            protein: Math.floor(item.nf_protein*quantity),
            sugars: Math.floor(item.nf_sugars*quantity),
            fiber: Math.floor(item.nf_dietary_fiber*quantity),
            kind:e?.target?.value ? e.target.value : "breakfast",
        }))


    }

    async function logFood(e){
        e.preventDefault()
        alert("Thanks for trying the demo! Please sign in or register to use :)")

    }




    return (
        <>
            <button onClick={handleShow} type="submit" className="btn btn-light border-dark border-1"> Add </button>
            <Modal show={show} onHide={handleClose}>
                <div className={`border border-dark border-2`} key={i}>


                    <Row className="justify-content-center mx-2 text-dark">
                        <img style={{width: "20%"}} className=""
                             src="https://image.flaticon.com/icons/png/512/146/146924.png"/>
                        <h5 className="text-center">{item.item_name}</h5>
                        <Col md={6}>
                            <h6>Brand: {item.brand_name}</h6>
                            <h6>Calories: {Math.floor(item.nf_calories*quantity)}</h6>
                            <h6>Serving: {Math.floor(item.nf_serving_weight_grams*quantity)} g</h6>
                            <h6>Fat : {Math.floor(item.nf_total_fat*quantity)}g</h6>
                            <h6>Carbohydrate: {Math.floor(item.nf_total_carbohydrate*quantity)}g</h6>
                            <h6>Protein: {Math.floor(item.nf_protein*quantity)}g</h6>
                            <h6>Sugars: {Math.floor(item.nf_sugars*quantity)}g</h6>
                            <h6>Dietary Fiber: {Math.floor(item.nf_dietary_fiber*quantity)}g</h6>
                        </Col>
                        <Col md={6}>
                        <span>

                            <form className="form-floating my-1">
                            <input onChange={(e)=>setQuantity(e.target.value)}
                                   type="number"
                                   name="quantity"
                                   id="label"
                                   className="form-control"
                                   min={1}/>
                            <label htmlFor="label" className="text-dark">Quantity</label>
                        </form>
                        </span>

                            <form className="form-floating my-1">
                                <select onChange={settingFood}
                                        name="kind"
                                        type="text"
                                        defaultValue={"breakfast"}
                                        id="label"
                                        className="form-control">
                                    <option value={"breakfast"}>Breakfast</option>
                                    <option value={"lunch"}>Lunch</option>
                                    <option value={"dinner"}>Dinner</option>
                                    <option value={"snack"}>Snack</option>

                                </select>
                                <label htmlFor="label" className="text-dark">Choose Meal Type</label>
                            </form>
                            <label>Meal Date</label>
                            <DatePicker
                                selected={startDate}
                                onChange={date => setStartDate(date)}
                            />
                        </Col>

                        <Form onSubmit={logFood} >
                            <Row className="justify-content-center">
                                <button
                                    type="submit" style={{width: "40%"}}
                                    className="btn bg-light border-dark border-1 my-2">
                                    Log Food
                                </button>
                            </Row>
                        </Form>


                    </Row>

                </div>


            </Modal>




        </>
    );
}

export default AddFood;
