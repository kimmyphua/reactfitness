import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';
import {Button, Col, Modal, Row} from "react-bootstrap";
import axios from "axios";
import AddFood from "./AddFood";

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});


export default function Home() {
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
        let {data} = await axios.get(`https://api.nutritionix.com/v1_1/search/${key}?results=${page}&fields=item_name,brand_name,item_id,nf_calories,nf_total_fat,nf_total_carbohydrate,nf_protein,nf_sugars,nf_dietary_fiber,nf_serving_size_unit,nf_serving_weight_grams&appId=${process.env.REACT_APP_APPID}&appKey=${process.env.REACT_APP_NUTRIX_KEY}`)
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

        <div>
            <Button className="bg-white border-dark border-1 text-dark" onClick={handleShow}>Try Food Demo</Button>
            <Modal show={show} onHide={handleClose} size="xl">
                <Row className="mx-5">
                    <Col md={8}>
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
                    </Col>
                    <Col md={4}>
                        <Row className=" justify-content-end mt-2">
                            <button className="bg-white border-0 text-end" onClick={()=>setShow(false)}> <CloseOutlinedIcon /> </button>
                        </Row>
                    </Col>
                </Row>
                {visible ?
                    <form onSubmit={handleSubmit}>


                        <ul className="pagination justify-content-center w-100 ">


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
                                    <TableCell align="left">
                                        <AddFood
                                            item={item}
                                            i={i}
                                            />
                                    </TableCell>
                                </TableRow>
                            ))}


                        </TableBody>
                    </Table>
                </TableContainer>

            </Modal>
        </div>
    );
}
