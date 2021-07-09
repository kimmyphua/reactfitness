import React, {useState, useRef} from "react";
import {Container, Row, Form} from "react-bootstrap";
import styles from "./Register.module.css";
import axios from 'axios'
import {Link, Redirect} from "react-router-dom";


function Register({auth, setAuth}) {
    const [data, setData] = useState({})
    const form = useRef(null)


    async function submitForm(e) {
        e.preventDefault()
        try {
            let {data: {token}} = await axios.post("/api/auth/register", data)
            console.log(token)
            localStorage.setItem("token", token)
            setAuth(true)

        } catch (e) {
            console.log(e)
            alert(e)
        }
    }

    function change(e) {
        setData(prevState => ({...prevState, [e.target.name]: e.target.value}))
    }

    if (auth) {
        return < Redirect to="/home"/>
    }

    console.log("123")
    return (
        <div>
            <Container>

                <div className={`${styles.container} text-center container-fluid d-flex align-items-center justify-content-center`}>
                    <div className={styles.registrationFormContainer}>
                        <fieldset className="border p-3 rounded">
                            <legend
                                className={`${styles.registrationFormLegend} border rounded p-1 text-center text-dark`}
                            >
                                Registration Form
                            </legend>
                            <Form ref={form} onSubmit={submitForm} method="post">
                                <div className="form-group">
                                    <label htmlFor="inputForEmail">Email address *</label>
                                    <input onChange={change}
                                           id="inputForEmail"
                                           type="email"
                                           name="email"
                                           className={`${styles.inputStyle} form-control`}
                                           aria-describedby="Enter email address"
                                           placeholder="Enter email address"
                                           required={true}/>


                                </div>
                                <div className="form-group">
                                    <label htmlFor="inputForName">Your Name</label>
                                    <input onChange={change}
                                           id="inputForName"
                                           type="text"
                                           name="name"
                                           className={`${styles.inputStyle} form-control`}
                                           aria-describedby="Enter your name"
                                           placeholder="Enter your name"
                                           required={true}
                                           minLength={3}
                                    />

                                </div>
                                <div className="form-group">
                                    <label htmlFor="inputForPassword">Password *</label>
                                    <input onChange={change}
                                           type="password"
                                           name="password"
                                           className={`${styles.inputStyle} form-control`}
                                           id="inputForPassword"
                                           placeholder="Enter password"
                                           required={true}
                                           minLength={6}
                                    />
                                </div>


                                <div className="d-flex align-items-center justify-content-center">
                                    <button type="submit" className="btn border-dark navButton mx-2">
                                        Submit
                                    </button>
                                    <button className="btn border-dark navButton mx-2">
                                        <Link to="/login">Cancel</Link>
                                    </button>
                                </div>
                            </Form>

                        </fieldset>
                    </div>
                </div>




            </Container>

        </div>

    )
}


export default Register
