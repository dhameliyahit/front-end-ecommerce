import React, { useState } from 'react'
import Layout from './../../layout/Layout';
import './styles/AuthRegister.css'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

const ForgotPassword = () => {

    const [email, setEmail] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [answer, setAnswer] = useState("")

    const navigate = useNavigate()
    
    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const res = await axios.post(`${process.env.REACT_APP_API}api/v1/auth/forgot-password`, {
                email,
                answer,
                newPassword
            })
            if (res && res.data.success) {
                navigate("/")
                toast.success("User Login successfully")
               
                navigate("/login")
            }
            else {
                toast.error(res.data.message)
            }
            console.log(email, answer, newPassword)
        } catch (error) {
            console.log(error)
            toast.error('Somthing went wrong')
        }
    }

  return (
    <Layout title={'forgot-password-ecommerce'}>
              <div className="padd">
                <div className="form">
                    <div className="register ">
                        <h1>Forget password</h1>
                        <br />
                        <form onSubmit={handleSubmit}>
                           

                            <div className="form-group my-3">
                                <label htmlFor="exampleInputEmail1">Email</label>
                                <input onChange={(e) => setEmail(e.target.value)} required value={email} type="email" className="form-control" aria-describedby="emailHelp" placeholder="Enter Your Email" />
                            </div>
                            
                            <div className="form-group my-3">
                                <label htmlFor="exampleInputEmail1">Favorite Sport</label>
                                <input onChange={(e) => setAnswer(e.target.value)} required value={answer} type="text" className="form-control"  placeholder="Enter Your Favorite Sport" />
                            </div>

                            <div className="form-group">
                                <label htmlFor="exampleInputPassword1"> New Password</label>
                                <input onChange={(e) => setNewPassword(e.target.value)} required value={newPassword} type="password" className="form-control" placeholder="Password" />
                            </div>
    
                              <button type="submit" className="btn btn-primary my-3">Reset</button>
                        </form>
                    </div>
                </div>
            </div>
    </Layout>
  )
}

export default ForgotPassword
