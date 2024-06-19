import React, { useState, useEffect } from 'react'
import Layout from '../layout/Layout'
import { useCard } from '../../contex/Card'
import { useAuth } from '../../contex/auth'
import { useNavigate } from 'react-router-dom'
import DropIn from "braintree-web-drop-in-react";
import axios from 'axios'
import toast from 'react-hot-toast'

const CardPage = () => {
  const [clientToken, setClientToken] = useState("")
  const [cart, setCart] = useCard()
  const [auth, setAuth] = useAuth()
  const navigate = useNavigate()
  const [instance, setInstance] = useState("")
  const [loading, setLoading] = useState(false)

  //calucate total 
  const totalPrice = () => {
    try {
      let total = 0
      cart?.map(item => total = total + item.price)
      return total.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
    } catch (error) {
      console.log(error)
    }
  }

  //remove item
  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart]
      let index = myCart.findIndex(item => item._id === pid)
      myCart.splice(index, 1)
      setCart(myCart);
      localStorage.setItem('cart', JSON.stringify(myCart))
    } catch (error) {
      console.log(error)
    }
  }
  // get payment getway token
  const getToken = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API}api/v1/product/braintree/token`)
      setClientToken(data?.clientToken)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getToken()
  }, [auth?.token])
  //handle payment
  const handlePayment = async () => {
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post(`${process.env.REACT_APP_API}api/v1/product/braintree/payment`, {
        nonce,
        cart,
      });
      setLoading(false);
      localStorage.removeItem("cart");
      setCart([]);
      toast.success("Payment Completed Successfully ");
      navigate("/dashboard/user/orders");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className='text-center bg-light p-2 mb-1'>
              {`Hello ${auth?.token && auth?.user.name}`}
            </h1>
            <h4 className='text-center'>
              {cart?.length ? `You have ${cart.length} item in your cart ${auth?.token ? "" : "please Login for checkout .."}` : "Your cart is empty"}
            </h4>
          </div>
        </div>
        <div className="row">
          <div className="col-md-8">
            <div className="row">
              {
                cart?.map(p => (
                  <div className="row mb-2 p-3 card flex-row">
                    <div className="col-md-4 my-1">
                      <img src={`${process.env.REACT_APP_API}api/v1/product/product-photo/${p._id}`} className="card-img-top" alt={p.name} width={'100px'} height={'auto'} />
                    </div>
                    <div className="col-md-8">
                      <p>{p.name}</p>
                      <p>{p.description.substring(0, 30)}</p>
                      <p>Price : $ {p.price}</p>
                      <button className='btn btn-danger'
                        onClick={() => removeCartItem(p._id)}
                      >Remove</button>
                    </div>
                  </div>
                ))
              }
            </div>
          </div>
          <div className="col-md-4 text-center">
            <h2>Cart Summary</h2>
            <p>Total | Ckeckout | Payment</p>
            <hr />
            <h4>Total : {totalPrice()} </h4>
            {auth?.user?.address ? (
              <>
                <div className="mb-3">
                  <h4>Current address</h4>
                  <h5>{auth?.user?.address}</h5>
                  <button
                    className='btn btn-outline-warning text-dark'
                    onClick={() => navigate('/dashboard/user/profile')}
                  >Update Address
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="mb-3">
                  {
                    auth?.user?.token ? (
                      <button className='btn btn-outline-warning' onClick={() => navigate('/dashboard/user/profile')}> Update address</button>
                    ) : (
                      <>
                        <button className='btn btn-outline-warning'
                          onClick={() => navigate('/login', {
                            state: "/card",
                          })}
                        >Please Login to Checkout</button>
                      </>
                    )
                  }
                </div>
              </>
            )}
            <div className="mt-2">
              {
                !clientToken || !cart?.length ?  ("") :(
                  <>
                      <DropIn
                options={{
                  authorization: clientToken,
                  paypal: {
                    flow: 'vault'
                  },
                }}
                onInstance={(instance) => setInstance(instance)}
              />
              <button
                className='btn btn-primary'
                onClick={handlePayment}
                disabled={loading || !instance || !auth?.user?.address}
              >
                {loading ? "processing...." : "make Payment"}
              </button>   
                  </>
                )
              }
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default CardPage
