
import React from 'react'
import { useSearch } from '../../contex/Search.js';
import Layout from '../layout/Layout.js';
import { useNavigate } from 'react-router-dom';

const Search = () => {
    const [values,setValues] =useSearch()
    const navigate = useNavigate()
  return (
   <Layout title={'Seach Result'}>
     <div className="container">
        <div className="text-center">
            <h1>Search result</h1>
            <h6>{values?.results.length < 1 ?  'No Found Product':`found ${values?.results.length}`}</h6>
            <div className="d-flex flex-wrap mt-4">
            {values?.results.map(p => (
              <div className="card m-2 p-1" style={{ width: '18rem' }} >
                <img src={`${process.env.REACT_APP_API}api/v1/product/product-photo/${p._id}`} className="card-img-top" alt={p.name} />
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">{p.description.substring(0,30)}...</p>
                  <p className="card-text text-success"> $ {p.price}</p>
                  <div className="d-flex">
                    <button class="btn btn-primary mx-2" onClick={()=>navigate(`/product/${p.slug}`)}>More</button>
                    <button class="btn btn-secondary w-100">Add to Card</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
     </div>
   </Layout>
  )
}

export default Search
