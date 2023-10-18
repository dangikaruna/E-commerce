import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
const UpdateProduct = () => {

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [company, setCompany] = useState('');
  const [error, setError] = useState(false);
  const [intPriceError, setIntPriceError] = useState(false);
  const navigate = useNavigate(); // Corrected function name
  const params = useParams();
  useEffect(() => {
    console.log(params);
    console.log("useeffect")
    getProdutDetails();

  }, [])

  const getProdutDetails = async () => {
    console.log(params);
    let result = await fetch(`http://localhost:5000/product/${params.id}`, {
      headers: {
        Authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
      }// Use uppercase DELETE for HTTP DELETE request
    })
    result = await result.json();
    console.log(result)
    setName(result[0].name)
    setPrice(result[0].price)
    setCategory(result[0].category)
    setCompany(result[0].company)
  }
  const updateProduct = async () => {
    if (!name || !price || !category || !company) {
      setError(true)
      return false;
    }
    const parsedPrice = parseInt(price, 10);
    if (isNaN(parsedPrice) || parsedPrice <= 0) {
      setIntPriceError(true);
      return false;
    }


    let result = await fetch(`http://localhost:5000/updateProduct/${params.id}`, {
      method: 'PUT',
      body: JSON.stringify({ name, price, category, company }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
      },
    });
    result = await result.json();
    console.log(result);

    navigate('/products');
  };

  return (
    <div className='signup-container'>
      <div className='signup-box'>
        <h1 style={{ textAlign: 'center' }}>Update Product</h1>
        <input
          className='inputBox'
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder='Product Name'
        />
        {error && <span className='spam-text'>Enter valid name</span>}

        <input
          className='inputBox'
          type="text"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder='Product Price'
        />
        {error && <span className='spam-text'>Enter price</span>}
        {intPriceError && <span className='spam-text'>Price must be a valid integer</span>}
        <input
          className='inputBox'
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder='Product Category'
        />
        {error && <span className='spam-text'>Enter category</span>}
        <input
          className='inputBox'
          type="text"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          placeholder='Product Company'
        />
        {error && <span className='spam-text'>Enter componant name</span>}
        <button
          className='appButton'
          type='button'
          onClick={updateProduct}
          style={{ color: "white" }}
        >
          Update Product
        </button>

      </div>
    </div>
  );
}









export default UpdateProduct;