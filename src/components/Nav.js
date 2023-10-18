import React from 'react'
import { Link, useNavigate } from "react-router-dom"
const Nav = () => {
    const auth = localStorage.getItem('user');
    console.log(auth);
    const navigate = useNavigate();
    const logout = () => {
        localStorage.clear();
        navigate('/');
    }

    return (

        <div>
            <img src="image/Kaya.png"
                alt="Kaya"
                className='image'
            ></img>
            {auth ?
                <ul className='nav-ul'>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/products">All Product</Link></li>
                    <li><Link to="/add-product">Add Product</Link></li>
                    <li><Link to="/Profile">Profile</Link></li>
                    <li><Link onClick={logout} to='./login'>LogOut({JSON.parse(auth)})</Link></li>
                </ul>
                :
                <ul className='nav-ul nav-right'>
                    <li>
                        <Link to="/login">Login</Link></li>
                </ul>

            }
        </div>
    )
}
//<li>{auth?<Link onClick={logout} to="/signup">Logout</Link> :<Link to="/SignUp">SignUp</Link>}</li>

export default Nav