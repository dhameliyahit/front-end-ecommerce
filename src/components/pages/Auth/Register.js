import React, { useState } from 'react'
import Layout from './../../layout/Layout';
import './styles/AuthRegister.css'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

const Register = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [phone, setPhone] = useState("")
    const [address, setAddress] = useState("")
    const [answer, setAnswer] = useState("")


    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post(`${process.env.REACT_APP_API}api/v1/auth/register`, {
                name,
                email,
                password,
                phone,
                address,
                answer
            })
            if (res && res.data.success) {
                navigate("/login")
                toast.success("user register Successfully")
            }
            else {
                toast.error(res.data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error('Somthing went wrong')
        }
    }
    console.log(process.env.REACT_APP_API)
    return (
        <Layout title={'register page'}>
            <div className="padd">
                <div className="form">
                    <div className="register ">
                        <h1>Register Here</h1>
                        <br />
                        <form onSubmit={handleSubmit}>
                            <div className="form-group my-3 inputDiv">
                                <label htmlFor="exampleInputEmail1">Name</label>
                                <input
                                    value={name}
                                    onChange={(e) => setName(e.target.value)} required
                                    type="text" className="form-control" aria-describedby="emailHelp" placeholder="Enter Your Name" />
                            </div>

                            <div className="form-group my-3">
                                <label htmlFor="exampleInputEmail1">Email</label>
                                <input onChange={(e) => setEmail(e.target.value)} required value={email} type="email" className="form-control" aria-describedby="emailHelp" placeholder="Enter Your Email" />
                            </div>

                            <div className="form-group">
                                <label htmlFor="exampleInputPassword1">Password</label>
                                <input onChange={(e) => setPassword(e.target.value)} required value={password} type="password" className="form-control" placeholder="Password" />
                            </div>

                            <div className="form-group my-3">
                                <label htmlFor="exampleInputEmail1">Phone number</label>
                                <input onChange={(e) => setPhone(e.target.value)} required value={phone} type="number" className="form-control" aria-describedby="emailHelp" placeholder="Enter Mobile Number" />
                            </div>

                            <div className="form-group my-3">
                                <label htmlFor="exampleInputEmail1">Address</label>
                                <textarea onChange={(e) => setAddress(e.target.value)} required value={address} type="text" className="form-control" aria-describedby="emailHelp" placeholder="Enter Your Address" />
                            </div>

                            <div className="form-group my-3">
                                <label htmlFor="exampleInputEmail1">Enter your Favorite Sport  <small>  (for password reset)</small></label>
                                <textarea onChange={(e) => setAnswer(e.target.value)} required value={answer} type="text" className="form-control" aria-describedby="anwserHelp" placeholder="What is Your Favorite sport" />
                            </div>

                            <button type="submit" className="btn btn-primary my-3">Register</button>
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Register
