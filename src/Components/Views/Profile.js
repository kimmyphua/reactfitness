import React, {useEffect, useState} from 'react';
import {Container, Card,Row, Col,Button, ListGroup} from 'react-bootstrap';
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import axios from "axios";
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter';
import SingleFood from "./SingleFood";
import SingleExercise from "./SingleExercise";
import NutritionTable from "./NutritionTable";
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Exercise from "./Exercise";



function Profile() {
    const [user, setUser] = useState({})
    const [myFood, setMyFood] = useState([])
    const [myExercise, setMyExercise] = useState([])
    const [value, onChange] = useState(new Date());
    const [visible, setVisible] =useState(true)
    const [visibleEx, setVisibleEx] =useState(true)

    let date = value.toDateString()
    const [state, setState] = useState({
        checkedA: true,
        checkedB: true,
    });

    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });


    };





        async function setUserStats() {
            try {
                let {data} = await axios.get("/api/auth/user", {
                    headers: {
                        authorization: `Bearer ${localStorage.token}`
                    }
                })
                setUser(data.user)
                setMyFood(data.user.food_log)
                setMyExercise(data.user.exercise_log)
                console.log(data.user.exercise_log)
            } catch (e) {
                setUser({})
                localStorage.removeItem("token")
            }
        }
    useEffect(() => {
        setUserStats()
    }, [])


    let dailyExercise = myExercise.filter(ex => ex.date === date)
    console.log(myExercise)
    let daily = myFood.filter(f => f.date === date)
    let sum = 0
    let sumCarbs = 0
    let sumProtein = 0
    let sumFat = 0
    let sumSugar = 0
    let sumFiber = 0
    daily.forEach(f=> {
        sum += f.calories
    })
    daily.forEach(f=> {
        sumFat += f.total_fat
    })
    daily.forEach(f=> {
        sumCarbs += f.total_carbs
    })
    daily.forEach(f=> {
        sumProtein += f.protein
    })
    daily.forEach(f=> {
        sumSugar += f.sugars
    })
    daily.forEach(f=> {
        sumFiber += f.fiber
    })






    return (
        <Container fluid className="home-bg">
            <Row>
                <Col md={6}>

                    <Calendar
                        onChange={onChange}
                        value={value}
                        className="w-100 "
                        />
                    <Row className="justify-content-center pt-1">
                        <Col md={6}>
                    <NutritionTable
                        user={user}
                    setMyFood={setMyFood}
                    setUser={setUser}/>
                    </Col>
                        <Col md={6}>
                    <Exercise
                        user={user}
                    setMyExercise={setMyExercise}
                    setUser={setUser}/>
                        </Col>
                     </Row>

                    <div className="bg-dark text-white mb-3">
                        <h3 className="mt-2 font-monospace">B r e a k f a s t:
                            </h3>
                        {daily.filter(f => f.kind.includes("breakfast")).map((food,i) => (

                            <Row key={i} className="border-bottom border-light border-1 mx-1 ">
                                <Col md={5}><span>{food.name}</span></Col>
                                <Col md={4}>
                                    <span>{food.calories} Cals , {food.serving_weight} g </span>
                                </Col>
                                <Col md={3}>
                                    <SingleFood
                                        food={food}
                                        setUser={setUser}
                                        setMyFood={setMyFood}
                                    />
                                </Col>
                            </Row>
                        ))}
                    </div>


                    <div className="bg-dark text-white mb-3">
                        <h3 className="mt-2 font-monospace">L u n c h:</h3>
                        {daily.filter(f => f.kind.includes("lunch")).map((food,i) => (
                            <Row key={i} className="border-bottom mx-2 border-light border-1 mx-1">
                                <Col md={5}><span>{food.name}</span></Col>
                                <Col md={4}>
                                    <span>{food.calories} Cals , {food.serving_weight} g </span>
                                </Col>
                                <Col md={3}>
                                    <SingleFood
                                        food={food}
                                        setUser={setUser}
                                        setMyFood={setMyFood}
                                    />
                                </Col>
                            </Row>
                        ))}
                    </div>


                    <div className="bg-dark text-white mb-3">
                        <h3 className="mt-2 font-monospace">D i n n e r:</h3>
                        {daily.filter(f => f.kind.includes("dinner")).map((food,i) => (
                            <Row key={i} className="border-bottom border-light border-1 mx-1">
                                <Col md={5}><span>{food.name}</span></Col>
                                <Col md={4}>
                                    <span>{food.calories} Cals , {food.serving_weight} g </span>
                                </Col>
                                <Col md={3}>
                                    <SingleFood
                                        food={food}
                                        setUser={setUser}
                                        setMyFood={setMyFood}
                                    />
                                </Col>
                            </Row>
                        ))}
                    </div>


                    <div className="bg-dark text-white mb-3">
                        <h3 className="mt-2 font-monospace">S n a c k s:</h3>
                        {daily.filter(f => f.kind.includes("snack")).map((food,i) => (
                            <Row key={i} className="border-bottom border-light border-1 mx-1">
                                <Col md={5}><span>{food.name}</span></Col>
                                <Col md={4}>
                                    <span>{food.calories} Cals , {food.serving_weight} g </span>
                                </Col>
                                <Col md={3}>
                                <SingleFood
                                food={food}
                                setUser={setUser}
                                setMyFood={setMyFood}
                                />
                                </Col>
                            </Row>
                        ))}
                    </div>

                </Col>

                <Col md={6}>

            <Card style={{ width: '22rem', opacity: "0.9" }}>


                        <FormGroup className="mt-2">
                            <Row>
                            <Col md={6}>
                            <FormControlLabel
                                control={<Switch checked={state.checkedA} onChange={handleChange} onClick={()=>setVisible(!visible)} name="checkedA" />}
                                label="Food Log"
                            />
                            </Col>
                            <Col md={6}>
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={state.checkedB}
                                        onChange={handleChange}
                                        onClick={()=>setVisibleEx(!visibleEx)}
                                        name="checkedB"
                                        color="primary"
                                    />
                                }
                                label="Exercise"
                            />
                            </Col>
                </Row>

                        </FormGroup>



                <Card.Img variant="top"
                          style={{
                              marginTop: "10px",
                              display: "block",
                              marginLeft: "auto",
                              marginRight: "auto",
                              width: "20%",
                                cursor:"pointer" }}
                            src="https://image.flaticon.com/icons/png/512/284/284741.png"
                            />
                <Card.Body>
                    <Card.Title>Name: {user.name}</Card.Title>
                    <Card.Text>
                        <h5>Date: {date}</h5>
                    </Card.Text>

                </Card.Body>
                {visible ?
                <ListGroup variant="flush">
                    <ListGroup.Item>Total Calories Consumed:
                        <h6 className="text-danger font-monospace"> {Math.floor(sum)} / {user.daily_calorie} kcal</h6>
                        <div className="progress">
                            <div className="progress-bar bg-danger progress-bar-striped" role="progressbar" style={{width: `${Math.floor(sum)*100/user.daily_calorie}%`}}> </div>
                        </div>

                    </ListGroup.Item>
                    <ListGroup.Item>Total Protein :
                        <h6 className="text-danger font-monospace"> {Math.floor(sumProtein)} / {user.protein}  g </h6>
                        <div className="progress">
                            <div className="progress-bar progress-bar-striped bg-info" role="progressbar" style={{width: `${Math.floor(sumProtein)*100/user.protein}%`}}> </div>
                        </div>
                    </ListGroup.Item>
                    <ListGroup.Item>Total Carbohydrate :
                        <h6 className="text-danger font-monospace"> {Math.floor(sumCarbs)} / {user.carbs} g </h6>
                        <div className="progress">
                            <div className="progress-bar bg-warning progress-bar-striped" role="progressbar" style={{width: `${Math.floor(sumCarbs)*100/user.carbs}%`}}> </div>
                        </div>
                    </ListGroup.Item>
                    <ListGroup.Item>Total Fat :
                        <h6 className="text-danger font-monospace">{Math.floor(sumFat)} / {user.fat} g </h6>
                        <div className="progress">
                            <div className="progress-bar bg-success progress-bar-striped" role="progressbar" style={{width: `${Math.floor(sumFat)*100/user.fat}%`}}> </div>
                        </div>
                    </ListGroup.Item>
                    <ListGroup.Item>Total Sugar :
                        <h6 className="text-danger font-monospace"> {Math.floor(sumSugar)}  g </h6>
                        </ListGroup.Item>
                    <ListGroup.Item>Total Dietary Fiber :
                        <h6 className="text-danger font-monospace">{Math.floor(sumFiber)} g  </h6>
                        </ListGroup.Item>
                </ListGroup>

                : <> </>}

                {visibleEx ?

                    <p>


                           {dailyExercise.map( (ex, i) =>(
                                <ListGroup
                                    horizontal='sm'
                                    // variant="flush"
                                    key={i}
                                    className="fw-light text-start border-muted border-bottom">

                                   <ListGroup.Item>
                                    <FitnessCenterIcon/>  {ex.activity_hour}
                                   </ListGroup.Item>

                                   <ListGroup.Item> {Math.floor(ex.calories_kg)}kcal
                                   </ListGroup.Item>
                                   <ListGroup.Item>
                                       <SingleExercise
                                           exercise={ex}
                                           setUser={setUser}
                                           setMyExercise={setMyExercise}/>
                                   </ListGroup.Item>
                                </ListGroup>
                            ))}

                    </p>

                    : <> </>}

            </Card>
                </Col>

            </Row>
        </Container>
    );
}

export default Profile;
