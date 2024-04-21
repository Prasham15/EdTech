import React, { useState } from "react";
import axios from "axios"

export default function Register({}) {
    let [info, setInfo] = useState({
        name: "",
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
        axios.post("http://localhost:4005/register", {
            name: info.name,
            email: info.email,
            password: info.password
        }).then(res => {
            console.log(res.data)
            alert(res.data.message)
            setInfo({
                name: "",
                email: "",
                password: ""
            }) 
        })
    }

    return (
        <form onSubmit={handleSubmit} className="register_container">
            <h3 className="register_title">Register</h3>

            <div className="input_container">
                <label htmlFor="name" className="input_label">Full Name</label>
                <input
                    type="text"
                    name="name"
                    id="name"
                    value={info.name}
                    onChange={handleChange}
                    className="input_input"
                    placeholder="e.g Virat Kohli"
                    required
                />
            </div>
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
    );
}
