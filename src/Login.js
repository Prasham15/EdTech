import React, { useState } from "react";
import axios from "axios"

export default function Login({ login }) {
    let [info, setInfo] = useState({
        email: "",
        password: ""
    });

    function handleChange(e) {
        const { name, value } = e.target
        setInfo(prev => {
            prev[name] = value;
            return { ...prev }
        })

    }

    function handleSubmit(e) {
        e.preventDefault()

        axios.post("http://localhost:4005/login", {
            email: info.email,
            password: info.password
        }).then(res => {
            console.log(res.data)
            if (res.data.success){
                setInfo(prev => {
                    prev.name = res.data.name;
                    return {...prev}
                })
                login({...info, name: res.data.name})
            } else {
                alert(res.data.message)
                setInfo({
                    email: "",
                    password: ""
                })
            }
        })
    }

    return (
        <div className="login_container">
            <form className="login_container" onSubmit={handleSubmit} >
                <h3 className="login_title">Login</h3>

                <div className="input_container">
                    <label htmlFor="email" className="input_label">Email address</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        value={info.email}
                        onChange={handleChange}
                        className="input_input"
                        placeholder="name123@gmail.com"
                        required
                    />
                </div>

                <div className="input_container">
                    <label htmlFor="password" className="input_label">Password</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        value={info.password}
                        onChange={handleChange}
                        className="input_input"
                        placeholder="Password"
                        required
                    />
                </div>

                <div className="input_container">
                    <button className="form_button">Submit</button>
                </div>

            </form>

            <p className="text-center mt-2">
                <a href="#">Forgot password?</a>
            </p>

        </div>
    );
}
