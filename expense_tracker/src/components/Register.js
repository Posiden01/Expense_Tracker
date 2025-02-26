import React, { useEffect, useState } from 'react'
import '../asset/css/Register.css'
import { Link, useNavigate } from 'react-router-dom'
import api from '../api/api.json';
function Register() {
    const [inputs, setInputs] = useState({})
    const [showerror, setShowError] = useState(false)
    const [error, setError] = useState("")
    const navigate = useNavigate();
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }))
    }
    const doRegister = async (event) => {
        event.preventDefault();
        if (inputs.pass == inputs.cnfpass) {
            console.log("Clicked", inputs);
            var paramsjson = {
                name: inputs.name,
                email: inputs.email,
                password: inputs.pass
            }
            var params = JSON.stringify(paramsjson);
            try{
                const res = await fetch(api.baseurl + "auth/signup",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: params
    
                    }
                )
                const data = await res.json();
                if (data.success == true) {
                    setError("Account Created Successfully. Please Login")
                    setInputs({})
                    setShowError(true);
                }
                else {
                    setError("User already exist or network issue")
                    setShowError(true);
                }

            }
            catch (error) {
                console.log("Error ", error);
                setShowError(true);
                setError("Failed to connect with server");
            }
        }
        else{
            setError("Password and confirm password do not match")
            setShowError(true);
        }
    }
    return (
        <div className='mainContainer'>
            <div className='formcard'>
                <div>
                    <h2 style={{ alignSelf: 'center' }}>Register</h2>
                </div>
                <form onSubmit={doRegister}>
                    <div>
                        <label>
                            Name
                        </label>
                        <input
                            required
                            type="text"
                            placeholder='Enter your name'
                            value={inputs.name || ''}
                            onChange={handleChange}
                            name='name'

                        />
                    </div>
                    <div>
                        <label>
                            Email
                        </label>
                        <input
                            required
                            type="email"
                            placeholder='Enter your email'
                            value={inputs.email || ''}
                            onChange={handleChange}
                            name='email'

                        />
                    </div>
                    <div>
                        <label>
                            Password
                        </label>
                        <input
                            required
                            type="password"
                            placeholder='Enter your password'
                            value={inputs.pass || ''}
                            onChange={handleChange}
                            name='pass'

                        />
                    </div>
                    <div>
                        <label>
                            Confirm Password
                        </label>
                        <input
                            required
                            type="password"
                            placeholder='Confirm your password'
                            value={inputs.cnfpass || ''}
                            onChange={handleChange}
                            name='cnfpass'

                        />
                    </div>
                    {
                        showerror ?
                            <div>
                                <span style={{ color: 'red', alignSelf: 'center' }}>{error}</span>
                            </div> : null
                    }
                    <div>
                        <button>Submit</button>
                    </div>
                    <div>
                        <span style={{ alignSelf: 'center' }}>Already a user ?<Link to="/">Login</Link> </span>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Register