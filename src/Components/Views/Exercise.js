import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Table, Modal, Button, Row} from "react-bootstrap";
import ExerciseView from "./ExerciseView";
import * as exercise_list from "../../data/exercise_dataset.json"
import CloseOutlinedIcon from "@material-ui/icons/CloseOutlined";

function Exercise({user,setUser,setMyExercise}) {

const [exercise, setExercise] = useState([])
const [keyword, setKeyword] = useState("cycling")
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);


    async function getExercise() {
        setExercise(exercise_list.default)
    }

    useEffect(() => {
    getExercise()
    }, [])
// console.log(exercise)


    let filtered = exercise.filter( ex => ex.activity_hour.toLowerCase().includes(keyword.toLowerCase()))

    return (
        <div>
            <Button className="bg-white border-dark border-1 text-dark" onClick={()=>setShow(true)}>Log Exercise</Button>
            <Modal show={show} onHide={handleClose} >
                <div className="px-2 py-2">
                    <Row className=" mx-2 mt-2 ">
                        <button className="bg-white border-0 text-end " onClick={()=>setShow(false)}> <CloseOutlinedIcon /> </button>
                    </Row>
                <input
                    type="text"
                    placeholder="Search Exercise"
                    className="py-1 px-2 rounded-1-lg mt-2"
                    onChange={(e) => setKeyword(e.target.value)}
                />



            <Table striped bordered hover variant="dark">
                <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Calories per hour</th>
                    <th>  </th>

                </tr>
                </thead>
            {filtered.map((ex, i) => (
                <>
                <tbody>
                <tr>
                    <ExerciseView
                        i={i}
                        ex={ex}
                        user={user}
                        setUser={setUser}
                        setMyExercise={setMyExercise}/>
                </tr>
                </tbody>
                </>
            ))}
            </Table>
                </div>
            </Modal>
        </div>
    );
}

export default Exercise;
