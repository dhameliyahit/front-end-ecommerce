import React, { useState, useEffect } from 'react'
import Layout from '../layout/Layout'
import axios from 'axios'
import { Checkbox, Radio } from 'antd'
import Prices from './../Prices';
import { useNavigate } from 'react-router-dom';
import { useCard } from '../../contex/Card';
import toast from 'react-hot-toast';

const HomePage = () => {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [checked, setChecked] = useState([])
  const [radio, setRadio] = useState([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [cart, setCart] = useCard()
  const navigate = useNavigate()
  //get all category
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API}api/v1/category/get-category`)
      if (data?.success) {
        setCategories(data?.category)
      }

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getAllCategory();
    getTotal();

  }, [])

  //get all products
  const getAllProducts = async () => {
    try {
      setLoading(true)
      const { data } = await axios.get(`${process.env.REACT_APP_API}api/v1/product/product-list/${page}`)
      setLoading(false)
      console.log(`${process.env.REACT_APP_API}api/v1/product/product-list/${page}`)
      setProducts(data.products)
    } catch (error) {
      setLoading(false)
      console.log(error)
      setLoading(false)
    }
  }

  useEffect(() => {
    if (page === 1) return;
    LoadMore();
  }, [page])
  //load more
  const LoadMore = async () => {
    try {
      setLoading(true)
      const { data } = await axios.get(`${process.env.REACT_APP_API}api/v1/product/product-list/${page}`)
      setLoading(false)
      setProducts([...products, ...data?.products])
    } catch (error) {
      setLoading(false)
      console.log(error)
      setLoading(false)
    }
  }

  //category filter
  const handleFilter = async (value, id) => {
    let all = [...checked]
    if (value) {
      all.push(id)
    } else {
      all = all.filter(c => c !== id)
    }
    setChecked(all)
  }

  const getTotal = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API}api/v1/product/product-count`)
      setTotal(data)
    } catch (error) {
      console.log(error)
    }
  }


  // get filtered product
  const filterProduct = async () => {
    try {
      const { data } = await axios.post(`${process.env.REACT_APP_API}api/v1/product/product-filters`, { checked, radio })
      setProducts(data?.products)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (!checked.length || !checked.length) {
      getAllProducts();
    }
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);

  return (
    <Layout title={'All | product best Offers'}>
      <div className="row mt-2 w-100">
        <div className="col-md-3 element border border-right">
          <h4 className='text-center'>Filter By  Category</h4>
          <div className="d-flex flex-column mx-3">
            {categories?.map(c => (
              <Checkbox key={c._id} onChange={(e) => handleFilter(e.target.checked, c._id)}>
                {c.name}
              </Checkbox>
            ))}

          </div>
          {/* price filter */}
          <h4 className='text-center mt-3'>Filter By  Price</h4>
          <div className="d-flex flex-column mx-3">
            <Radio.Group onChange={e => setRadio(e.target.value)}>
              {Prices?.map((p) => (
                <div key={p._id}>
                  <Radio value={p.array}>{p.name}</Radio>
                </div>
              ))}
            </Radio.Group>
          </div>
          <button className='btn btn-danger m-2 w-80' onClick={() => window.location.reload()}>RESET</button>
        </div>
        <div className="col-md-9">
          <h1 className='text-center'>All Product</h1>
          <hr />
          <div className="d-flex flex-wrap justify-content-center">
            {products?.map((p) => (
              <div
                key={p._id} // Add a key prop for unique identification
                className="api-card card mx-4 my-3 p-1 col-md-3"
                style={{ transition: 'transform 0.2s, box-shadow 0.2s' }} // Smooth transition for hover effects
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.05)';
                  e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <img
                  src={`${process.env.REACT_APP_API}api/v1/product/product-photo/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
                  style={{ objectFit: 'cover', height: '300px' }} // Consistent image size and fit
                />
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">
                    {p.description.substring(0, 30)}...
                  </p>
                  <p className="card-text fw-bold text-success">$ {p.price}</p> {/* Bold and colored price */}
                  <div className="d-flex">
                    <button
                      className="btn btn-primary mx-1 w-50 "
                      onClick={() => navigate(`/product/${p.slug}`)}
                    >
                      More
                    </button>
                    <button
                      className="btn btn-warning w-50 "
                      onClick={() => {
                        setCart([...cart, p]);
                        localStorage.setItem('cart', JSON.stringify([...cart, p]));
                        toast.success('Item added to cart');
                      }}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="m-2 p-3">
            {products && products.length < total.total && (
              <button
                className="btn btn-warning"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? "Loading ..." : "Loadmore"}
              </button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default HomePage
