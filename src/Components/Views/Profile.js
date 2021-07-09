import React, {useEffect, useState} from 'react';
import {Container, Card,Row, Col,Button, ListGroup} from 'react-bootstrap';
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import axios from "axios";

function Profile() {
    const [user, setUser] = useState({})
    const [myFood, setMyFood] = useState([])

    useEffect(() => {
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

        setUserStats()
    }, [])

    const [value, onChange] = useState(new Date());
    let date = value.toDateString()


    console.log(value.toLocaleDateString(), typeof(value.toLocaleDateString()))
    return (
        <Container fluid>
            <Row>
                <Col md={5}>
                    <Calendar
                        onChange={onChange}
                        value={value}
                        className="w-100"/>

                    <div className="bg-dark text-white my-3">
                        Breakfast:
                        {myFood.map(food => (
                            <>
                                <p>{food.name}</p>
                                <p>{food.calories}</p>
                                <p>{food.serving_size}</p>
                                <p>{food.serving_grams}</p>
                            </>
                        ))}
                    </div>
                    <div className="bg-dark text-white my-3">
                        Lunch:
                        {myFood.map(food => (
                            <>
                                <p>{food.name}</p>
                                <p>{food.calories}</p>
                                <p>{food.serving_size}</p>
                                <p>{food.serving_grams}</p>
                            </>
                        ))}
                    </div>
                    <div className="bg-dark text-white my-3">
                        Dinner:
                        {myFood.map(food => (
                            <>
                                <p>{food.name}</p>
                                <p>{food.calories}</p>
                                <p>{food.serving_size}</p>
                                <p>{food.serving_grams}</p>
                            </>
                        ))}
                    </div>
                    <div className="bg-dark text-white my-3">
                        Snack:
                        {myFood.map(food => (
                            <>
                                <p>{food.name}</p>
                                <p>{food.calories}</p>
                                <p>{food.serving_size}</p>
                                <p>{food.serving_grams}</p>
                            </>
                        ))}
                    </div>

                </Col>

                <Col md={5} className="m-3">
            <Card style={{ width: '28rem' }}>
                <Card.Img variant="top" src="holder.js/100px180" />
                <Card.Body>
                    <Card.Title>Name: {user.name}</Card.Title>
                    <Card.Text>
                        -------------------------
                    </Card.Text>

                </Card.Body>

                <ListGroup variant="flush">
                    <ListGroup.Item>DATE: {date}</ListGroup.Item>
                    <ListGroup.Item>Total Calories Consumed:
                    </ListGroup.Item>
                    <ListGroup.Item>Weight: </ListGroup.Item>
                </ListGroup>
            </Card>
                </Col>



            </Row>
        </Container>
    );
}

export default Profile;
