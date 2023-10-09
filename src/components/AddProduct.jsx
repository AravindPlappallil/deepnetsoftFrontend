import React, { useState } from "react";
import { Button } from "react-bootstrap";
import "./CategoryForm.css";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import BASE_URL from "../service/baseurl";

const AddProduct = () => {
  const [productName, setProductName] = useState("");
  // const [categoryId, setCategoryId] = useState("");
  // const [subcategoryId, setSubcategoryId] = useState("");
  const { categoryId, subcategoryId } = useParams();
  const navigate = useNavigate();
  // console.log(categoryId);
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${BASE_URL}/api/products/addproduct`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: productName,
          category: categoryId,
          subcategory: subcategoryId,
        }),
      });

      if (response.status === 201) {
        alert("Product added successfully");
        setProductName("");
        navigate(`/category/${categoryId}/${subcategoryId}`);
      } else {
        alert("Product creation failed");
        navigate(`/category/${categoryId}/${subcategoryId}`);
      }
    } catch (error) {
      console.error("Error creating product", error);
      alert("produt creation failed");
    }
  };

  return (
    <div className="container bg-dark text-white mt-3 category-form-container ">
      <h2>Create a Product</h2>
      <form onSubmit={handleSubmit}>
        <label>Product Name:</label>
        <input
          type="text"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />
        <Button className="btn-danger"
          onClick={() => navigate(`/category/${categoryId}/${subcategoryId}`)}
        >
          Cancel
        </Button>
        <br /><br />
        <Button type="submit">Add Product</Button>
        
        
      </form>
    </div>

  );
};

export default AddProduct;
