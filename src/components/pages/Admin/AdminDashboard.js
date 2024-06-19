import React from 'react'
import Layout from './../../layout/Layout';
import AdminMenu from '../../layout/AdminMenu';
import { useAuth } from '../../../contex/auth';
const AdminDashboard = () => {
  const [auth] = useAuth()

  return (
    <Layout>
      <div className="container-fluid">
        <div className="row my-3">
          <div className="col-md-3"><AdminMenu/></div>
          <div className="col-md-9 p-3">
            <div className="card w-75">
              <h3>Admin Name : {auth?.user?.name}</h3>
              <h3>Admin Email : {auth?.user?.email}</h3>
              <h3>Admin Number : {auth?.user?.phone  }</h3>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default AdminDashboard
