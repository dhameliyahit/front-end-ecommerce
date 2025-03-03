import React, { useState, useEffect } from 'react'
import AdminMenu from '../../layout/AdminMenu'
import Layout from '../../layout/Layout'
import toast from 'react-hot-toast'
import axios from 'axios'
import { Link } from 'react-router-dom'
import '../../../index.css'
const Products = () => {
    const [products, setProducts] = useState([])
    const getAllProducts = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}api/v1/product/get-product`)
            setProducts(data.products)

        } catch (error) {
            console.log(error)
            toast.error('Somthing wents wrong')
        }
    }
    //life cyclemethd
    useEffect(() => {
        getAllProducts();
        // eslint-diable-next-line
    }, [])
    return (
        <Layout>
            <div className="container-fluid m-3 p-3">
                <div className="row">
                    <div className="col-md-3">
                        <AdminMenu />
                    </div>
                    <div className="col-md-9">
                        <h1 className='text-center'>All Products</h1>
                        <div className="d-flex warp">

                            {products?.map(p => (
                                <Link key={p._id} to={`/dashboard/admin/product/${p.slug}`} className='Product-list'>
                                    <div className="card m-2 p-1" style={{ width: '18rem' }} >
                                        <img src={`${process.env.REACT_APP_API}api/v1/product/product-photo/${p._id}`} className="card-img-top" alt={p.name} />
                                        <div className="card-body">
                                            <h5 className="card-title">{p.name}</h5>
                                            <p className="card-text">{p.description}</p>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>

            </div>
        </Layout>
    )
}

export default Products
