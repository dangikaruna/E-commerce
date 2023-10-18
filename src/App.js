
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Nav from './components/Nav'
import Footer from './components/Footer';
import SignUp from './components/SignUp';
import LogIn from './components/LogIn';
import PrivateComponents from './components/PrivateComponents';
import AddProduct from './components/AddProduct';
import ProductList from './components/ProductList';
import UpdateProduct from './components/UpdateProduct';
import Profile from './components/Profile';
import Home from './components/Home';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <Routes>


          <Route element={<PrivateComponents />}>
            <Route path='/' element={<Home/>} />
            <Route path='/products' element={<ProductList/>} />
            <Route path='/add-product' element={<AddProduct/>} />
            <Route path="/update/:id" element={<UpdateProduct/>} />
            <Route path='/Logout' element={<h1>Logout</h1>} />
            <Route path='/Profile' element={<h1>{<Profile/>}</h1>} />
          
          </Route>
          <Route path='/login' element={<LogIn />} />
          <Route path='/signup' element={<SignUp />} />
        </Routes>
      </BrowserRouter>
      <Footer/>
    </div>
  );
}

         
export default App;
