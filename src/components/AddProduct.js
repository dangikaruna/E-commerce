import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [company, setCompany] = useState('');
  const [error, setError] = useState(false);
  const [intPriceError, setIntPriceError] = useState(false);
  const navigate = useNavigate(); // Corrected function name

  /*useEffect(()=>{
    const auth=localStorage.getItem('user')
    if(auth){
      navigate("/");
    }s
})*/
  const addProduct = async () => {
    if (!name || !price || !category || !company) {
      setError(true)
      return false;
    }
    const parsedPrice = parseInt(price, 10);
    if (isNaN(parsedPrice) || parsedPrice <= 0) {
      setIntPriceError(true);
      return false;
    }

   

    console.log(name, price, category, company);
    const user = JSON.parse(localStorage.getItem('user'));
    console.log(user)
    const userid = user.id;
    console.log(userid)
    let result = await fetch("http://localhost:5000/add-product", {
      method: 'post',
      body: JSON.stringify({ userid, name, price, category, company }),
      headers: {
        Authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`,
        'Content-Type': 'application/json'
      },
    });
    result = await result.json();
    console.log(result);
    //const data={username,email}
    //localStorage.setItem('user', JSON.stringify(data));
    navigate('/');
  };

  return (
    <div className='signup-container'>
      <div className='signup-box'>
        <h1 style={{ textAlign: 'center' }}>Add New Product</h1>
        <input
          className='inputBox'
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder='Product Name'
        />
        { error && <span className='spam-text'>Enter valid name</span>}

        <input
          className='inputBox'
          type="text"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder='Product Price'
        />
         { error && <span className='spam-text'>Enter price</span> }
         {intPriceError && <span className='spam-text'>Price must be a valid integer</span>}
        <input
          className='inputBox'
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder='Product Category'
        /> 
         { error && <span className='spam-text'>Enter category</span>}
        <input
          className='inputBox'
          type="text"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          placeholder='Product Company'
        />
         { error && <span className='spam-text'>Enter componant name</span>}
        <button
          className='appButton'
          type='button'
          onClick={addProduct}
          style={{ color: "white" }}
        >
          Add Product
        </button>

      </div>
    </div>
  );
}









export default AddProduct;