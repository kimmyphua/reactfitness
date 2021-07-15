import React, {useEffect, useState} from 'react';
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {Col, Form, Modal, Row} from "react-bootstrap";


function ExerciseViewDemo({ex, i}) {
    const [myEx, setMyEx] = useState({})
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const [startDate, setStartDate] = useState(new Date());
    const [quantity, setQuantity] = useState(1)

    async function change(){

        setMyEx(prevState => ({...prevState, activity_hour: ex.activity_hour,calories_kg: ex.calories_kg*60*quantity, date: startDate.toDateString() }))
        console.log(myEx)

    }

    // console.log(user.exercise_log)

    async function postExercise(e) {
        e.preventDefault()
        alert("please log in or register to continue")
        // console.log(myExercise)
        // try {
        //     await axios.put(`/api/user/exercise/${user._id}`, myEx )
        //     console.log(myEx)
        //     alert("Success")
        // } catch (e) {
        //     console.log(e.response)
        //     alert("please log in to continue")
        // }
        // setUserStats()
    }




    useEffect(() => {
        change()
    }, [startDate])

    useEffect(() => {
        change()
    }, [quantity])


    function handleShow() {
        setShow(true)
        change()
    }

    // async function setUserStats() {
    //     try {
    //         let {data} = await axios.get("/api/auth/user", {
    //             headers: {
    //                 authorization: `Bearer ${localStorage.token}`
    //             }
    //         })
    //         //
    //         // setMyExercise(data.user.exercise_log)
    //         setShow(false)
    //
    //     } catch (e) {
    //         setUser({})
    //         localStorage.removeItem("token")
    //     }
    // }

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <div className={`border border-dark border-2`}>

                    <Row className="justify-content-center mx-2 text-dark text-center">



                        <img style={{width: "30%"}} className=""
                             src="https://img.icons8.com/bubbles/2x/exercise.png"/>
                        <label>Exercise Date</label>
                        <DatePicker
                            selected={startDate}
                            onChange={date => setStartDate(date)}
                            shouldCloseOnSelect={false}
                        />

                        <h6> {ex.activity_hour}</h6>
                        <h6> Total Calories:(Calculated based on 60kg person) {Math.floor(ex.calories_kg*60*quantity)} kcal</h6>

                        <span>

                            <form className="form-floating px-5 mx-5">
                            <input onChange={(e)=>setQuantity(e.target.value)}
                                   type="number"
                                   name="quantity"
                                   id="label"
                                   className="form-control"
                                   min={1}
                            />
                            <label htmlFor="label"
                                   className="text-dark text-center mx-5">{quantity} hours</label>
                        </form>
                        </span>

                        <Form onSubmit={postExercise} >
                            <Row className="justify-content-center">
                                <button
                                    type="submit" style={{width: "40%"}}
                                    className="btn bg-light border-dark border-1 my-2">
                                    Log Exercise
                                </button>
                            </Row>
                        </Form>


                    </Row>

                </div>


            </Modal>


            <td>{i+1}</td>
            <td> {ex.activity_hour}</td>
            <td> {Math.floor(ex.calories_kg*60)} kcal</td>
            <td>

                <button
                    onClick={handleShow}
                    className="btn btn-light border border-dark mx-3 py-1 px-2"
                > Add
                </button>

            </td>



        </>
    );
}

export default ExerciseViewDemo;
