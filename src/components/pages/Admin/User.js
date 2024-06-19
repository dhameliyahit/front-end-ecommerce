import React from 'react'
import Layout from '../../layout/Layout'
import AdminMenu from '../../layout/AdminMenu'

const User = () => {
    return (
        <Layout title={'Admin | All user'}>
            <div className="container-fluid m-3 p-3">

            <div className="row">
                <div className="col-md-3">
                    <AdminMenu />
                </div>
                <div className="col-md-9">
                    <h1>All User</h1>

                </div>
            </div>
            </div>

        </Layout>
    )
}

export default User
