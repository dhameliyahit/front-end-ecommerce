import {Routes , Route} from 'react-router-dom'
import HomePage from './components/pages/HomePage';
import { Toaster } from 'react-hot-toast';
import About from './components/pages/About';
import Contact from './components/pages/Contact';
import Policy from './components/pages/Policy';
import PageNotFound from './components/pages/PageNotFound';
import Register from './components/pages/Auth/Register';
import Login from './components/pages/Auth/Login';
import Dashboard from './components/pages/user/Dashboard';
import PrivateRoute from './components/Routes/Private';
import ForgotPassword from './components/pages/Auth/ForgotPassword';
import AdminRoute from './components/Routes/AdminRoute';
import AdminDashboard from './components/pages/Admin/AdminDashboard';
import CreateCategory from './components/pages/Admin/CreateCategory';
import CreateProduct from './components/pages/Admin/CreateProduct';
import User from './components/pages/Admin/User';
import Order from './components/pages/user/Order';
import Profile from './components/pages/user/Profile';
import Products from './components/pages/Admin/Products';
import UpdateProduct from './components/pages/Admin/UpdateProduct';
import Search from './components/pages/Search';
import ProductDetails from './components/pages/ProductDetails';
import Categories from './components/pages/Categories';
import CategoryProduct from './components/pages/CategoryProduct';
import { Card } from 'antd';
import CardPage from './components/pages/CardPage';
import AdminOrders from './components/pages/Admin/AdminOrders';
import './index.css'



function App() {
  return (
    <>
      <Toaster/>
      <Routes>
        <Route path='/' element={<HomePage/>} ></Route>
        <Route path='/product/:slug' element={<ProductDetails/>} ></Route>
        <Route path='/categories' element={<Categories/>} ></Route>
        <Route path='/card' element={<CardPage/>} ></Route>
        <Route path='/category/:slug' element={<CategoryProduct/>} ></Route>
        <Route path='/search' element={<Search/>} ></Route>
        <Route path='/dashboard' element={<PrivateRoute/>} >
            <Route path="user" element={<Dashboard/>} ></Route>
            <Route path="user/orders" element={<Order/>} ></Route>
            <Route path="user/profile" element={<Profile />} ></Route>
        </Route>
        <Route path='/dashboard' element={<AdminRoute/>} >
            <Route path="admin" element={<AdminDashboard/>} ></Route>
            <Route path="admin/create-category" element={<CreateCategory/>} ></Route>
            <Route path="admin/create-product" element={<CreateProduct/>} ></Route>
            <Route path="admin/product/:slug" element={<UpdateProduct/>} ></Route>
            <Route path="admin/products" element={<Products/>} ></Route>
            <Route path="admin/users" element={<User/>} ></Route>
            <Route path="admin/orders" element={<AdminOrders/>} ></Route>
        </Route>
        <Route path='/register' element={<Register/>} ></Route>
        <Route path='/forgot-password' element={<ForgotPassword/>} ></Route>
        <Route path='/login' element={<Login/>} ></Route>
        <Route path='/about' element={<About/>} ></Route>
        <Route path='/contact' element={<Contact/>} ></Route>
        <Route path='/policy' element={<Policy/>} ></Route>
        <Route path='/*' element={<PageNotFound/>} ></Route>

      </Routes>
    </>
  );
}

export default App;
