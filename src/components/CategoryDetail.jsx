import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import '../App.css'
import { Link } from 'react-router-dom'
import Table from "react-bootstrap/Table";
import Button from 'react-bootstrap/Button';
import BASE_URL from "../service/baseurl";





function CategoryDetail() {
    const [category, setCategory] = useState(null);
    const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const { categoryId } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${BASE_URL}/api/categories/${categoryId}`)
      .then((response) => {
        // console.log(categoryId);
          setCategory(response.data);
          // console.log(response.data);
        setLoading(false);
      }) 
      .catch((error) => {
        console.error("Error fetching category:", error);
        setLoading(false);
      });
    //   products
      axios
        .get(`${BASE_URL}/api/products/get-products-by-category/${categoryId}`)
        .then((response) => {
          setProducts(response.data);
        })
        .catch((error) => {
          console.error("Error fetching products:", error);
        });
  
  }, [categoryId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!category) {
    return <div>Category not found</div>;
  }

  return (
    <div className="container">
      <div className="buttons_top w-100">
        <Link
          to={`/category/${categoryId}/create-Subcategory`}
          className="btn btn-primary justify-content-end"
        >
          Add SubCategory
        </Link>
      </div>
      <br/>
      <h1 className="">{category.name}</h1>
      <br/>
      <h4>Subcategories({category.subcategories.length})</h4>
      <ul className="subcat_list">
        {category.subcategories.map((subcategory) => (
          <Button variant="outline-danger" onClick={()=>{navigate(`/category/${categoryId}/${subcategory._id}`)}}>
            <li key={subcategory._id}>{subcategory.name}</li>
          </Button>
        ))}
      </ul>
      

      <Table striped>
        <thead>
          <tr>
            <th>Products</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td>{product.name}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default CategoryDetail;
