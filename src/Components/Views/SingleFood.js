import React, {useEffect, useState} from 'react';
import axios from "axios";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import {Col, Form, Modal, Row} from "react-bootstrap";


function SingleFood({food, setUser, setMyFood}) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const [quantity, setQuantity] = useState(1)
    const [foodLog, setFoodLog] = useState({})

    console.log(quantity)
    function handleShow() {
        setShow(true)
        settingFood()
    }

    async function setUserStats() {
        try {
            let {data} = await axios.get("/api/auth/user", {
                headers: {
                    authorization: `Bearer ${localStorage.token}`
                }
            })
            setUser(data.user)
            setMyFood(data.user.food_log)

        } catch (e) {
            setUser({})
            localStorage.removeItem("token")
        }
    }



    async function deleteFood() {
        await axios.delete(`/api/food/delete/${food._id}`);
        console.log('Delete successful');
        setUserStats()
    }


    async function settingFood(e) {
        console.log(foodLog)
        // setQuantity(e.target.value)
        await setFoodLog(prevState => ({
            ...prevState,
            calories: Math.floor(food.calories*quantity),
            serving_size: Math.floor(food.serving_size*quantity),
            serving_weight: Math.floor(food.serving_weight*quantity),
            total_fat: Math.floor(food.total_fat * quantity),
            total_carbs: Math.floor(food.total_carbs * quantity),
            protein: Math.floor(food.protein * quantity),
            sugars: Math.floor(food.sugars * quantity),
            fiber: Math.floor(food.fiber * quantity),
            kind: e?.target?.value ? e.target.value : food.kind,
        }))
    }
    // async function changeQuantity(e){
    //     await setQuantity(e.target.value)
    //     await settingFood()
    // }

    useEffect(()=> {
        settingFood()
    },[quantity])




    async function updateFood(e){
        e.preventDefault()
        try{
            await axios.put(`/api/food/edit/${food._id}`, foodLog);
            setShow(false)
            console.log(foodLog)
        }catch (e) {
            console.log(e.response)
        }
        setUserStats()
    }



    return (
        <>

            <Modal show={show} onHide={handleClose}>
                <div className={`border border-dark border-2`}>


                    <Row className="justify-content-center mx-2 text-dark">
                        <img style={{width: "20%"}} className=""
                             src="https://image.flaticon.com/icons/png/512/146/146924.png"/>
                        <h5 className="text-center">{food.name}</h5>
                        <Col md={6}>
                            <h6>Brand: {food.brand}</h6>
                            <h6>Calories: {Math.floor(food.calories*quantity)}</h6>
                            <h6>Serving: {Math.floor(food.serving_weight*quantity)} g</h6>
                            <h6>Fat : {Math.floor(food.total_fat*quantity)}g</h6>
                            <h6>Carbohydrate: {Math.floor(food.total_carbs*quantity)}g</h6>
                            <h6>Protein: {Math.floor(food.protein*quantity)}g</h6>
                            <h6>Sugars: {Math.floor(food.sugars*quantity)}g</h6>
                            <h6>Dietary Fiber: {Math.floor(food.fiber*quantity)}g</h6>
                        </Col>
                        <Col md={6}>
                        <span>

                            <form className="form-floating my-1">
                            <input onChange={(e)=>setQuantity(e.target.value)}
                                   type="number"
                                   name="quantity"
                                   step={0.1}
                                   id="label"
                                   className="form-control"
                                   min={0.1}/>
                            <label htmlFor="label" className="text-dark">Quantity</label>
                        </form>
                        </span>

                            <form className="form-floating my-1">
                                <select onChange={settingFood}
                                        name="kind"
                                        type="text"
                                        defaultValue={food.kind}
                                        id="label"
                                        className="form-control">
                                    <option value={"breakfast"}>Breakfast</option>
                                    <option value={"lunch"}>Lunch</option>
                                    <option value={"dinner"}>Dinner</option>
                                    <option value={"snack"}>Snack</option>

                                </select>
                                <label htmlFor="label" className="text-dark">Choose Meal Type</label>
                            </form>


                        </Col>

                        <Form onSubmit={updateFood} >
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

            <DeleteIcon
                style={{cursor:"pointer"}}
                onClick={()=>deleteFood()} />
            <EditIcon
                style={{cursor:"pointer"}}
                onClick={()=>handleShow()} />

        </>
    );
}

export default SingleFood;
