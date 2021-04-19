import React from 'react';
import axios from "axios";
import makeToast from "../Toaster/toaster";
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';

function LoginPage(props) {
    const emailRef = React.createRef();
    const passwordRef = React.createRef();

    const loginUser = () => {
        const email = emailRef.current.value;
        const password = passwordRef.current.value;

        axios.post("http://localhost:8000/user/login", {
            email,
            password,
        })
            .then((response) => {

                makeToast("success", response.data.message);
                localStorage.setItem("U_Token", response.data.token);
                props.history.push("/dashboard");
            }).catch((err) => {
                if (
                    err &&
                    err.response &&
                    err.response.data &&
                    err.response.data.message
                   

                ) {  makeToast("error", err.response.data.message); }
            });
    };
    return (
        <div>
            <div className="title">ChisMe</div>
            <Link  to={"/register"} >
                                <span className="join leave" >Register</span>
                            </Link>
            <div className="card">
                <div className="cardHeader">LOGIN</div>
                <div className="cardBody">
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
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Your Password"
                            ref={passwordRef}
                        />
                    </div>
                    <button onClick={loginUser}>Login</button>


                </div>
            </div>
        </div>
    )
}

export default withRouter(LoginPage);
