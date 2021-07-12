import React from 'react';
import axios from "axios";
import DeleteIcon from "@material-ui/icons/Delete";

function SingleExercise({exercise, setUser, setMyExercise}) {
// console.log(food)

    async function setUserStats() {
        try {
            let {data} = await axios.get("/api/auth/user", {
                headers: {
                    authorization: `Bearer ${localStorage.token}`
                }
            })
            setUser(data.user)
            setMyExercise(data.user.exercise_log)

        } catch (e) {
            setUser({})
            localStorage.removeItem("token")
        }
    }



    async function deleteExercise() {

        await axios.delete(`/api/user/delete-exercise/${exercise._id}`);
        console.log('Delete successful');
        setUserStats()

    }
    return (
        <div>
            <DeleteIcon onClick={()=>deleteExercise()} />

        </div>
    );
}

export default SingleExercise;
