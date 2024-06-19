import React, { useState } from 'react'
import Layout from './../../layout/Layout';
import './styles/AuthRegister.css'
import toast from 'react-hot-toast';
import { useNavigate , useLocation } from 'react-router-dom';
import axios from 'axios'
import { useAuth } from '../../../contex/auth.js';


const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [auth,setAuth] = useAuth() 

    const navigate = useNavigate()
    const location = useLocation()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post(`${process.env.REACT_APP_API}api/v1/auth/login`, {
                email,
                password,
            })
            if (res && res.data.success) {
                navigate("/")
                toast.success("User Login successfully")
                setAuth({
                    ...auth,
                    user: res.data.user,
                    token: res.data.token,
                  });
                localStorage.setItem('auth',JSON.stringify(res.data))
                navigate(location.state ||"/")
            }
            else {
                toast.error(res.data.message || 'User not register')
            }
        } catch (error) {
            console.log(error)
            toast.error('user Not Found')
        }
    }
    return (
        <Layout title={'register page'}>
            <div className="padd">
                <div className="form">
                    <div className="register ">
                        <h1>Login Here</h1>
                        <br />
                        <form onSubmit={handleSubmit}>
                           

                            <div className="form-group my-3">
                                <label htmlFor="exampleInputEmail1">Email</label>
                                <input onChange={(e) => setEmail(e.target.value)} required value={email} type="email" className="form-control" aria-describedby="emailHelp" placeholder="Enter Your Email" />
                            </div>

                            <div className="form-group">
                                <label htmlFor="exampleInputPassword1">Password</label>
                                <input onChange={(e) => setPassword(e.target.value)} required value={password} type="password" className="form-control" placeholder="Password" />
                            </div>
                            <button type="button" className="btn btn-dark my-1" onClick={()=>{navigate('/forgot-password')}}>Forgot Password?</button>
                            
                            <button type="submit" className="btn btn-primary my-3">Login</button>
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    )
}


export default Login
