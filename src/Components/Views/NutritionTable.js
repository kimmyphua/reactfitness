import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {Button, Modal,Row} from "react-bootstrap";
import axios from "axios";
import AddFoodProfile from "./AddFoodProfile";

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export default function NutritionTable({user}) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const [food, setFood] = useState([])
    const [key, setKey] = useState("chicken")
    const [page, setPage] = useState("0:20")
    const [visible, setVisible] = useState(false)

    function handleShow() {
        setShow(true)
        getFood()

    }

    async function getFood() {
        setFood([])
        let {data} = await axios.get(`https://api.nutritionix.com/v1_1/search/${key}?results=${page}&fields=item_name,brand_name,item_id,nf_calories,nf_total_fat,nf_total_carbohydrate,nf_protein,nf_sugars,nf_dietary_fiber,nf_serving_size_unit,nf_serving_weight_grams&appId=e9bdcdb2&appKey=2cab49db86772f05225147a46fc2cba2`)
        console.log(data)
        data.hits.forEach(item => {
            setFood(prevState => [...prevState, item.fields]) })

    }
    function handleSubmit(e) {

        e.preventDefault()
        setVisible(true)
        getFood()
    }



    const classes = useStyles();

    return (

        <>
            <button onClick={handleShow}>Add Food</button>
            <Modal show={show} onHide={handleClose} size="xl">
                <Row className="mx-5">
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
                </Row>
                {visible ?
                    <form onSubmit={handleSubmit}>


                        <ul className="pagination justify-content-center w-100 ">

                            {/*<li className="page-item">*/}
                            {/*    <a className="page-link" aria-label="Previous">*/}
                            {/*        <span aria-hidden="true">&laquo;</span>*/}
                            {/*    </a>*/}
                            {/*</li>*/}

                            <li className="page-item "><Button
                                onClick={()=>setPage("0:20")}
                                className="pageButton text-dark"
                                type="submit">1</Button></li>
                            <li className="page-item"><Button
                                onClick={()=>setPage("20:40")}
                                className="pageButton text-dark "
                                type="submit">2</Button></li>
                            <li className="page-item"><Button
                                onClick={()=>setPage("40:60")}
                                className="pageButton text-dark "
                                type="submit">3</Button></li>
                            <li className="page-item"><Button
                                onClick={()=>setPage("60:80")}
                                className="pageButton text-dark "
                                type="submit">4</Button></li>
                            <li className="page-item"><Button
                                onClick={()=>setPage("80:100")}
                                className="pageButton text-dark "
                                type="submit">5</Button></li>
                            <li className="page-item"><Button
                                onClick={()=>setPage("100:120")}
                                className="pageButton text-dark "
                                type="submit">6</Button></li>
                            <li className="page-item"><Button
                                onClick={()=>setPage("120:140")}
                                className="pageButton text-dark "
                                type="submit">7</Button></li>
                            <li className="page-item"><Button
                                onClick={()=>setPage("140:160")}
                                className="pageButton text-dark "
                                type="submit">8</Button></li>
                            <li className="page-item"><Button
                                onClick={()=>setPage("160:180")}
                                className="pageButton text-dark "
                                type="submit">9</Button></li>
                            <li className="page-item"><Button
                                onClick={()=>setPage("180:200")}
                                className="pageButton text-dark "
                                type="submit">10</Button></li>


                            {/*<li className="page-item">*/}
                            {/*    <a className="page-link"  aria-label="Next">*/}
                            {/*        <span aria-hidden="true">&raquo;</span>*/}
                            {/*    </a>*/}
                            {/*</li>*/}

                        </ul>
                    </form>: null}




                <TableContainer component={Paper}>
            <Table className={classes.table} size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        <TableCell>#</TableCell>
                        <TableCell align="left">Name</TableCell>
                        <TableCell align="left">Brand </TableCell>
                        <TableCell align="left">Calories (kcal)</TableCell>
                        <TableCell align="left">Serving (g)</TableCell>
                        <TableCell align="left">  </TableCell>
                    </TableRow>


                </TableHead>
                <TableBody>
                    {food.map((item, i) => (
                        <TableRow key={i}>
                            <TableCell component="th" scope="row">
                        {i + 1}
                            </TableCell>
                            <TableCell align="left">{item.item_name}</TableCell>
                            <TableCell align="left">{item.brand_name}</TableCell>
                            <TableCell align="left">{item.nf_calories}</TableCell>
                            <TableCell align="left">{item.nf_serving_weight_grams}</TableCell>
                            <TableCell align="left"><AddFoodProfile item={item} user={user} i={i} /> </TableCell>
                        </TableRow>
                    ))}


                </TableBody>
            </Table>
        </TableContainer>

            </Modal>
            </>
    );
}
