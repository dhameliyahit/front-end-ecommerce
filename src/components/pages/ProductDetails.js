import React, { useState, useEffect } from 'react'
import Layout from '../layout/Layout'
import axios from 'axios'
import { Link, useParams ,useNavigate} from 'react-router-dom'
import { useCard } from '../../contex/Card'
import '../../index.css'
const ProductDetails = () => {
    const params = useParams()
    const [product, setProduct] = useState([])
    const [reletedProducts, setReletedProducts] = useState([])
    const [cart,setCart] = useCard()
    const navigate = useNavigate()
    useEffect(() => {
        if (params?.slug) getProduct();
    }, [params.slug])

    const getProduct = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}api/v1/product/get-product/${params.slug}`)
            setProduct(data?.product)
            getSimilerProduct(data?.product._id, data?.product.category._id)
        } catch (error) {
            console.log(error)
        }
    }

    //get similer profuct
    const getSimilerProduct = async (pid, cid) => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}api/v1/product/related-product/${pid}/${cid}`)
            setReletedProducts(data?.products)
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <Layout>
            <div className="row container mt-3">
                <div className="col-md-6">
                    <img src={`${process.env.REACT_APP_API}api/v1/product/product-photo/${product._id}`} className="card-img-top" alt={product.name}
                        height={'450'}
                        width={'100'}
                    />
                </div>
                <div className="col-md-6">
                    <h3 className='text-center'>Produt deatils</h3>
                    <hr />
                    <h6>Name : {product.name}</h6>
                    <h6>Description : {product.description}</h6>
                    <h6>price : $ {product.price}</h6>
                    <h6>price : {product.category?.name}</h6>
                    <button className='btn btn-warning mt-2'>Add to Card</button>
                </div>
            </div>
            <hr />
            <div className="row container">
                <h6>smiler product</h6>
                {reletedProducts.length < 1 && <p className='text-center'>No smiler product Found</p> }
                <div className="d-flex flex-wrap">
            {reletedProducts?.map(p => (
              <div className="card m-2 p-1" style={{ width: '18rem' }} >
                <img src={`${process.env.REACT_APP_API}api/v1/product/product-photo/${p._id}`} className="card-img-top" alt={p.name} />
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">{p.description.substring(0,30)}...</p>
                  <p className="card-text"> $ {p.price}</p>
                  <div className="d-flex">
                    <button class="btn btn-primary mx-2 w-50" onClick={()=>navigate(`/product/${p.slug}`)}>More</button>
                    <button class="btn btn-warning w-50">Add to Card</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
            </div>
        </Layout>
    )
}

export default ProductDetails
