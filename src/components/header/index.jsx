import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './main.css'; 

const Header = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState(''); 

  useEffect(() => {
    axios.get('https://fakestoreapi.com/products')
      .then((response) => {
        setProducts(response.data);
        const uniqueCategories = ['all', ...new Set(response.data.map((product) => product.category))];
        setCategories(uniqueCategories);
      })
      .catch((error) => console.error('Error:', error));
  }, []);

  
  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="container">
      <h1 className="title">AMAZON</h1>

      <div className="tabs">
        {categories.map((category) => (
          <button
            key={category}
            className={`tab-button ${selectedCategory === category ? 'active' : ''}`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="input_div">
        <input 
          className="input"
          placeholder="Search here"
          type="text"
          value={searchQuery} 
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="products-grid">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div className="product-card" key={product.id}>
              <img src={product.image} alt={product.title} className="product-image" />
              <h4 className="product-title">{product.title}</h4>
              <div className="price-div">
                <p className="product-price">$ {product.price}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="no-results">No products found.</p>
        )}
      </div>
    </div>
  );
};

export default Header;
