import React from 'react';
import axios from "axios";
import makeToast from "../Toaster/toaster"
import { Link } from 'react-router-dom';

const RegisterPage = (props) => {
    const nameRef = React.createRef();
    const emailRef = React.createRef();
    const passwordRef = React.createRef();

    const registerUser = () => {
        const name = nameRef.current.value;
        const email = emailRef.current.value;
        const password = passwordRef.current.value;

        axios.post("http://localhost:8000/user/register", {
            name,
            email,
            password,
        })
            .then((response) => {

                makeToast("success", response.data.message);
                props.history.push("/login");
            }).catch((err) => {
                if (err &&
                    err.response &&
                    err.response.data &&
                    err.response.data.message
                )

                    makeToast("error", err.response.data.message);
            });
    }

    return (
        <div>
            <div className="title">ChisMe</div>
            <Link  to={"/login"} >
                                <span className="join leave" >Login</span>
                            </Link>
            <div className="card">
                <div className="cardHeader">REGISTER</div>
                <div className="cardBody">
                    <div className="inputGroup">
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Your Name"
                            ref={nameRef}
                        />
                    </div>
                    <div className="inputGroup">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="abc@example.com"
                            ref={emailRef}
                        />
                    </div>
                    <div className="inputGroup">
                        <label htmlFor="">Password</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Your Password"
                            ref={passwordRef}
                        />
                    </div>
                    <button onClick={registerUser}>Register</button>


                </div>
            </div>
        </div>

    )
};

export default RegisterPage
