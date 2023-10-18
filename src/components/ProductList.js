
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom"

const ProductList = () => {

  const [product, setProduct] = useState([]);


  useEffect(() => {
    getProducts();
  }, [])

  const getProducts = async () => {
    //console.log(username, email, password);


    let result = await fetch("http://localhost:5000/products", {
      headers: {
        Authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
      }
    });
    result = await result.json();
    setProduct(result)
    console.log(result)
  };

  const deleteProduct = async (id) => {
    try {
      console.log(id);
      let result = await fetch(`http://localhost:5000/product/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
        }// Use uppercase DELETE for HTTP DELETE request
      });
      result = await result.json();
      console.log(result);
      if (result) {
        alert("item deleted successfully")
      }
      // Refresh the product list after deletion
      getProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const serchHandle = async (event) => {
    console.warn(event.target.value)
    let key = event.target.value;
    if (key) {
      let result = await fetch(`http://localhost:5000/search/${key}`, {
        headers: {
          Authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
        }
      })
      result = await result.json();
      if (result) {
        setProduct(result);
      }
    }
    else {
      getProducts();
    }

  }

  return (
    <div>
      <h2 style={{ textAlign: 'center' }}>Products</h2>
      <div className='search-box'>
        <input type='text' placeholder='Search' onChange={serchHandle} />
      </div>
      {product.length > 0 ? (
        product.map((item, index) => (
          <ul className='product-box nav-ul' key={item.product_id}>
            <li>{item.name}</li>
            <li>{item.company}</li>
            <li>{item.category}</li>
            <li>{item.price}</li>
            <div className='update-delete'>
              <Link className='update-link' to={'/update/' + item.product_id}>
                Update
              </Link>
              <button
                className='delete-button'
                onClick={() => deleteProduct(item.product_id)}
              >
                Delete
              </button>
            </div>
          </ul>
        ))
      ) : (
        <h3>Product not found</h3>
      )}
    </div>
  );
}

export default ProductList;