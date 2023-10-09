import React, { useState } from "react";
import {  useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import {Button}from 'react-bootstrap'
import "./CategoryForm.css";
import BASE_URL from "../service/baseurl";



const SubCategoryForm = () => {
    const [subCategory, setSubCategory] = useState("");
    const { categoryId } = useParams();
const navigate=useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${BASE_URL}/api/categories/subcategory/create-subcategories`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: subCategory,
            parentCategory: categoryId,
          }),
        }
      );

      if (response.status === 201) {
        alert("SubCategory created successfully");
          setSubCategory("");
          navigate(`/category/${categoryId}`);
      } else {
        alert("SubCategory creation failed");
      }
    } catch (error) {
      console.error("Error creating Subcategory", error);
      alert("SubCategory creation failed");
    }
  };

  return (
    <div className="container mt-3 category-form-container ">
      <h2>Create SubCategory</h2>
      <form onSubmit={handleSubmit}>
        <label>SubCategory Name:</label>
        <input
          type="text"
          value={subCategory}
          onChange={(e) => setSubCategory(e.target.value)}
        />
        <Button  type="submit">Create </Button>
        &nbsp;
        <Button className="btn-danger" onClick={() => navigate(`/category/${categoryId}`)}>
          Cancel
        </Button>
      </form>
    </div>
  );
};

export default SubCategoryForm;
