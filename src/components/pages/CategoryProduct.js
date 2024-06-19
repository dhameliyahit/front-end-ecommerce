import React,{useState,useEffect} from 'react'
import Layout from '../layout/Layout'
import axios from 'axios'
import { useParams,useNavigate} from 'react-router-dom'
const CategoryProduct = () => {
    const [products,setProducts] =useState([])
    const [category,setCategory] = useState([])
    const params = useParams()
    const navigate = useNavigate()
useEffect(()=>{
    if(params?.slug) getProductByCat();
},[params.slug])
    const getProductByCat = async()=>{
        try {
            const {data} = await axios.get(`${process.env.REACT_APP_API}api/v1/product/product-category/${params.slug}`)
            setProducts(data?.products)
            setCategory(data?.category)
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <Layout>
      <div className="container">
        <h4 className='text-center mt-3'>Category - {category?.name}</h4>
        <h6 className='text-center mt-3'>{products?.length} result  found</h6>
        <div className="row">
        <div className="d-flex flex-wrap">
            {products?.map(p => (
              <div className="card m-2 p-1" style={{ width: '18rem' }} >
                <img src={`${process.env.REACT_APP_API}api/v1/product/product-photo/${p._id}`} className="card-img-top" alt={p.name} />
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">{p.description.substring(0,30)}...</p>
                  <p className="card-text"> $ {p.price}</p>
                  <div className="d-flex">
                    <button class="btn btn-primary mx-2" onClick={()=>navigate(`/product/${p.slug}`)}>More</button>
                    <button class="btn btn-secondary w-100">Add to Card</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* <div className="m-2 p-3">
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
            </div> */}
        </div>
      </div>
    </Layout>
  )
}

export default CategoryProduct
