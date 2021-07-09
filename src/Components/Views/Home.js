import React, {useState,useEffect} from 'react';
import axios from "axios";
import {Container, Table, Form} from "react-bootstrap";
import AddFood from "./AddFood";


function Home() {
    const [food, setFood] = useState([])
    const [key, setKey] = useState("")
    const [user, setUser] = useState({})

    useEffect(() => {
        async function setUserStats() {
            try {
                let {data} = await axios.get("/api/auth/user", {
                    headers: {
                        authorization: `Bearer ${localStorage.token}`
                    }
                })
                setUser(data.user)

            } catch (e) {
                setUser({})
                localStorage.removeItem("token")
            }
        }

        setUserStats()
    }, [])

    async function getFood() {
        setFood([])
        let {data} = await axios.get(`https://api.nutritionix.com/v1_1/search/${key}?results=0:50&fields=item_name,brand_name,item_id,nf_calories,nf_serving_size_unit,nf_serving_weight_grams&appId=ba32733c&appKey=cd846b6bdbf2ad083a749919ee176310`)
        data.hits.forEach(item => {
            setFood(prevState => [...prevState, item.fields])
        })
    }

    // console.log(food)
    // console.log(key)

    function handleSubmit(e) {
        e.preventDefault()
        getFood()
    }
    console.log("hibye")
    return (
        <Container fluid>
            HomePage
            <form onSubmit={handleSubmit} className="mb-2">
                <input
                    type="text"
                    placeholder="What did you eat?"
                    className="py-1 px-2 rounded-1-lg mt-2"
                    onChange={(e) => setKey(e.target.value)}
                />
                <button
                    type="submit"
                    className="btn btn-light border border-dark mx-3 py-1 px-2"

                > Search
                </button>
            </form>
            <Table striped bordered hover variant="dark">
                <thead>
                <tr>
                    <th>#</th>
                    <th> Name</th>
                    <th>Brand</th>
                    <th>Calories</th>
                    <th>Serving Size</th>
                    <th>Serving (grams)</th>
                    <th> </th>

                </tr>
                </thead>


                {food.map((item, i) => (
                    <tbody>
                    <tr>
                        <AddFood user={user} item={item} i={i} />
                    </tr>
                    </tbody>
                ))}
            </Table>
        </Container>

    );
}

export default Home;
