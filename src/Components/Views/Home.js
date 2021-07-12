import React, {useState,useEffect} from 'react';
import axios from "axios";
import {Button, Row, Container, Table, Form} from "react-bootstrap";
import AddFood from "./AddFood";


function Home() {
    const [food, setFood] = useState([])
    const [key, setKey] = useState("")
    const [user, setUser] = useState({})
    const [page, setPage] = useState("0:20")
    const [visible, setVisible] = useState(false)

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
        let {data} = await axios.get(`https://api.nutritionix.com/v1_1/search/${key}?results=${page}&fields=item_name,brand_name,item_id,nf_calories,nf_total_fat,nf_total_carbohydrate,nf_protein,nf_sugars,nf_dietary_fiber,nf_serving_size_unit,nf_serving_weight_grams&appId=e9bdcdb2&appKey=2cab49db86772f05225147a46fc2cba2`)
            console.log(data)
            data.hits.forEach(item => {
                setFood(prevState => [...prevState, item.fields]) })

    }

    // async function get() {
    // let {data} = await axios.get("https://api.nutritionix.com/v1_1/search/bread?&results=50:100&fields=item_name,brand_name,item_id,nf_calories,nf_total_fat,nf_total_carbohydrate,nf_protein,nf_sugars,nf_dietary_fiber,nf_serving_size_unit,nf_serving_weight_grams&appId=ba32733c&appKey=92bcaf733ee2aa25556d7a225e38a8f8")
    //     console.log(data)}
    // get()
    function handleSubmit(e) {

        e.preventDefault()
        setVisible(true)
        getFood()
    }


    console.log(food)
    console.log(key)
    // console.log("hibye")
    return (
        <Container fluid className="bg-dark">
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

            {visible ?
                <form onSubmit={handleSubmit}>


                <ul className="pagination justify-content-center w-100">

                    {/*<li className="page-item">*/}
                    {/*    <a className="page-link" aria-label="Previous">*/}
                    {/*        <span aria-hidden="true">&laquo;</span>*/}
                    {/*    </a>*/}
                    {/*</li>*/}

                    <li className="page-item"><Button
                        onClick={()=>setPage("0:20")}
                        className="pageButton"
                        type="submit">1</Button></li>
                    <li className="page-item"><Button
                        onClick={()=>setPage("20:40")}
                        className="pageButton"
                        type="submit">2</Button></li>
                    <li className="page-item"><Button
                        onClick={()=>setPage("40:60")}
                        className="pageButton"
                        type="submit">3</Button></li>
                    <li className="page-item"><Button
                        onClick={()=>setPage("60:80")}
                        className="pageButton"
                        type="submit">4</Button></li>
                    <li className="page-item"><Button
                        onClick={()=>setPage("80:100")}
                        className="pageButton"
                        type="submit">5</Button></li>
                    <li className="page-item"><Button
                        onClick={()=>setPage("100:120")}
                        className="pageButton"
                        type="submit">6</Button></li>
                    <li className="page-item"><Button
                        onClick={()=>setPage("120:140")}
                        className="pageButton"
                        type="submit">7</Button></li>
                    <li className="page-item"><Button
                        onClick={()=>setPage("140:160")}
                        className="pageButton"
                        type="submit">8</Button></li>
                    <li className="page-item"><Button
                        onClick={()=>setPage("160:180")}
                        className="pageButton"
                        type="submit">9</Button></li>
                    <li className="page-item"><Button
                        onClick={()=>setPage("180:200")}
                        className="pageButton"
                        type="submit">10</Button></li>


                    {/*<li className="page-item">*/}
                    {/*    <a className="page-link"  aria-label="Next">*/}
                    {/*        <span aria-hidden="true">&raquo;</span>*/}
                    {/*    </a>*/}
                    {/*</li>*/}

                </ul>
                </form>: null}


            <Table striped bordered hover variant="dark">
                <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Brand</th>
                    <th>Calories</th>
                    <th>Serving (grams)</th>
                    {/*<th>Total Fat</th>*/}
                    {/*<th>Total Carbs</th>*/}
                    {/*<th>Protein</th>*/}
                    {/*<th>Sugars</th>*/}
                    {/*<th>Fibre</th>*/}
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
