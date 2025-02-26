import React, { useState } from 'react'
import img1 from '../asset/img/dashboard.png'
import { Link, useNavigate } from 'react-router-dom'
import api from '../api/api.json'
function Homepage() {

    const navigate = useNavigate();
    const [inputs, setInputs] = useState({})
    const [inputs1, setInputs1] = useState({})
    const [inputs2, setInputs2] = useState({})
    const [showerror, setShowError] = useState(false)
    const [error, setError] = useState("")

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }))
    }
    const handleChange1 = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs1(values => ({ ...values, [name]: value }))
    }
    const handleChange2 = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs2(values => ({ ...values, [name]: value }))
    }
    const openModal3 = () => {

        var modal2 = document.getElementById("forgetModal");
        console.log("CC")
        modal2.style.display = "block";
    }
    const closeModal3 = (event) => {


        var modal2 = document.getElementById("forgetModal");
        modal2.style.display = "none";
    }
    const openModal4 = () => {

        var modal4 = document.getElementById("forgetModal1");
        console.log("CC")
        modal4.style.display = "block";
    }
    const closeModal4 = (event) => {
        var modal4 = document.getElementById("forgetModal1");
        modal4.style.display = "none";
    }
    const forgetEmail = (event) => {
        event.preventDefault();
        console.log("Clicked", inputs);
        closeModal3();
        openModal4();
    }


    const doLogin = async (event) => {
        event.preventDefault();
        console.log("Clicked", inputs);
        var paramsjson = {
            email: inputs.email,
            password: inputs.pass
        }
        var params = JSON.stringify(paramsjson);
        try {
            const res = await fetch(api.baseurl + "auth/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: params

                }
            )
            const data = await res.json()


            if (data.success == true) {
                localStorage.setItem("name", data.name);
                localStorage.setItem("email", data.email);
                localStorage.setItem("token", data.token);
                localStorage.setItem("islogin", true);
                navigate('/dashboard');
            }
            else {
                setShowError(true);
                setError("Invalid Credentials")
            }


        }
        catch (error) {
            console.log("Error ", error);
            setShowError(true);
            setError("Failed to connect with server");
        }
    }
    const updatePass = (event) => {
        event.preventDefault();
        closeModal4();
    }
    return (
        <div className='container'>
            <div className='leftcontainer'>
                <p>Welcome to Expense Tracker</p>
                <p>Manage all your expenses here</p>
                <img src={img1} />

            </div>
            <div className='rightcontainer'>
                <div id="forgetModal" className="modal3">
                    <div className='formcard'>
                        <div>
                            <h2 style={{ alignSelf: 'center' }}>Forgot Password ?</h2>
                        </div>
                        <form onSubmit={forgetEmail}>
                            <div>
                                <label>
                                    Email
                                </label>
                                <input
                                    required
                                    type="email"
                                    placeholder='Enter your Email ID'
                                    value={inputs1.fmail || ''}
                                    onChange={handleChange1}
                                    name='fmail'

                                />
                            </div>

                            <div>
                                <button>Submit</button>
                            </div>
                            <div>
                                <button onClick={closeModal3}>Cancel</button>
                            </div>

                        </form>
                    </div>
                </div>
                <div id="forgetModal1" className="modal4">
                    <div className='formcard'>
                        <div>
                            <h2 style={{ alignSelf: 'center' }}>Update Password</h2>
                        </div>
                        <form onSubmit={updatePass}>
                            <div>
                                <label>
                                    OTP
                                </label>
                                <input
                                    required
                                    type="number"
                                    placeholder='Enter your OTP'
                                    value={inputs2.otp || ''}
                                    onChange={handleChange2}
                                    name='otp'

                                />
                            </div>
                            <div>
                                <label>
                                    New Password
                                </label>
                                <input
                                    required
                                    type="password"
                                    placeholder='Enter your new password'
                                    value={inputs2.fnpsw || ''}
                                    onChange={handleChange2}
                                    name='fnpsw'

                                />
                            </div>
                            <div>
                                <label>
                                    Confirm New Password
                                </label>
                                <input
                                    required
                                    type="password"
                                    placeholder='Confirm your new password'
                                    value={inputs2.fcnfpsw || ''}
                                    onChange={handleChange2}
                                    name='fcnfpsw'

                                />
                            </div>
                            <div>
                                <button>Submit</button>
                            </div>
                            <div>
                                <button onClick={closeModal4}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
                <div className='formcard'>
                    <div>
                        <h2 style={{ alignSelf: 'center' }}>Login</h2>
                    </div>
                    <form onSubmit={doLogin}>
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
                                placeholder='Enter your Password'
                                value={inputs.pass || ''}
                                onChange={handleChange}
                                name='pass'

                            />
                        </div>
                        {
                            showerror ?
                                <div>
                                    <span style={{ color: 'red', alignSelf: 'center' }}>{error}</span>
                                </div> : null
                        }

                        <div>
                            <button>Login</button>
                        </div>


                    </form>
                    <div>
                        <button onClick={openModal3} style={{ backgroundColor: 'white', color: 'black', border: '2px solid black' }}>Forgot Password</button>
                    </div>
                    <div>
                        <span style={{ alignSelf: 'center' }}>Not a user ?<Link to="/register">Register</Link> </span>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default Homepage
