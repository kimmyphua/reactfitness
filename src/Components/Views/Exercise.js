import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Table} from "react-bootstrap";
import ExerciseView from "./ExerciseView";
import * as exercise_list from "../../data/exercise_dataset.json"

function Exercise({user}) {

const [exercise, setExercise] = useState([])
const [keyword, setKeyword] = useState("cycling")

console.log(exercise_list)


    async function getExercise() {
        setExercise(exercise_list.default)
    }

    useEffect(() => {
    getExercise()
    }, [])
console.log(exercise)


    let filtered = exercise.filter( ex => ex.activity_hour.toLowerCase().includes(keyword.toLowerCase()))

    return (
        <div>

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
                        user={user}/>
                </tr>
                </tbody>
                </>
            ))}
            </Table>
        </div>
    );
}

export default Exercise;
