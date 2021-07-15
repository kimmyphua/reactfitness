import React, {useState} from 'react';
import {useParams, Redirect} from 'react-router-dom'
import axios from "axios";
import {Button, Col, Row} from "react-bootstrap";

function ResetPwd(props) {
    const [password, setPassword] = useState("")
    const {token} = useParams()
    const [success, setSuccess] = useState(false)
    console.log(password)


    async function reset(){
        try{
            await axios.post(`/api/auth/reset-password/${token}`, {password})
            console.log("success")
            setSuccess(true)
        }catch (e) {
            console.log(e.response)
        }
    }

if(success){
    return <Redirect to="/login" />
}
    // function change()

    return (
        <div>

            <Row className="form-floating my-3 py-1 justify-content-center">
                <Col md={4}>
                    <h4> Reset Password</h4>
                    <input
                        onChange={(e)=>setPassword(e.target.value)}
                        type="password"
                        className=" form-control py-3"
                        placeholder="Please Enter New Password"
                        id="floatingSelect"
                        required={true}
                    />

                <Button className="border-dark border-1 bg-white text-dark mt-3" onClick={reset}> Reset </Button>
                </Col>
            </Row>





        </div>
    );
}

export default ResetPwd;
