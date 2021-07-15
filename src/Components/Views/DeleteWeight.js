import React, {useEffect, useRef,useState} from 'react';
import {Button} from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import axios from "axios";

function DeleteWeight({data,setGraphData}) {

const [weightToDelete, setWeightToDelete]= useState([])
const [user, setUser] =useState({})
    const form = useRef(null)

    async function setUserStats() {
        await setWeightToDelete(data)
        try {
            let {data} = await axios.get("/api/auth/user", {
                headers: {
                    authorization: `Bearer ${localStorage.token}`
                }
            })
            setUser(data.user)
            // setMyFood(data.user.food_log)
            // setMyExercise(data.user.exercise_log)
            // console.log(data.user.exercise_log)
        } catch (e) {
            setUser({})
            localStorage.removeItem("token")
        }
    }
    useEffect(() => {
        setUserStats()
    }, [])

    // console.log(data)
    async function weightInitialize() {
        let {data} = await axios.get("/api/auth/user", {
            headers: {
                authorization: `Bearer ${localStorage.token}`
            }
        })

        setGraphData(data.user.weight_log)

    }

    async function deleteWeight(e) {
        e?.preventDefault(e)
        console.log(weightToDelete)
        try {
            await axios.put(`/api/user/delete-weight/${user._id}`, weightToDelete);
            console.log('Delete successful');

        } catch (e) {
            console.log(e)
        }
        weightInitialize()
    }


    return (
        <div>

            <DeleteIcon
                onClick={deleteWeight}
                style={{cursor:"pointer"}}
            />


        </div>
    );
}

export default DeleteWeight;
