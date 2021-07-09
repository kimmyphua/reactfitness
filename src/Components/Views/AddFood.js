import React, {useState} from 'react';
import axios from "axios";
import {Form} from "react-bootstrap";

function AddFood({item,i,user}) {
const [foodLog, setFoodLog] = useState({})

    async function settingFood(){
    setFoodLog({
        creator:user._id,
        name:item.item_name,
        brand: item.brand_name,
        calories: item.nf_calories,
        serving_size: item.nf_serving_size_unit,
        serving_weight: item.nf_serving_weight_grams_ })
    }

    async function logFood(e){
        e.preventDefault()
        console.log(foodLog)
        try{
            await axios.post(`/api/food/create`, foodLog);

        }catch (e) {
            console.log(e.response)
        }
    }

    console.log("hihuhuhuhu")
    return (
        <>
            <td> {i + 1}</td>
            <td>{item.item_name}</td>
            <td>{item.brand_name}</td>
            <td>{item.nf_calories}</td>
            <td>{item.nf_serving_size_unit}</td>
            <td>{item.nf_serving_weight_grams}</td>
            <td>
                <Form id="form" onSubmit={logFood}>
                    <button onClick={settingFood} type="submit" className="btn btn-light"> Add </button>
                </Form></td>



        </>
    );
}

export default AddFood;
