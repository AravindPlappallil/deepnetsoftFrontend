import React, { useState, useEffect } from "react";
import './Categories.css'
import axios from "axios";
import { Modal, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Card} from 'react-bootstrap';
import BASE_URL from "../service/baseurl";

function Categories() {


     const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [categoryName, setCategoryName] = useState("");
    const [showModal, setShowModal] = useState(false);

    

    const navigate = useNavigate();
    const handleShowModal = () => {
      setShowModal(true);
    };
  
    const handleCloseModal = () => {
      setShowModal(false);
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      try {
        const response = await fetch(`${BASE_URL}/api/categories/create-category`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name: categoryName }),
        });
  
        if (response.status === 201) {
          alert("Category created successfully");
          setCategoryName("");
          handleCloseModal();
          navigate("/");
          axios
        .get(`${BASE_URL}/api/categories/viewCategories`)
        .then((response) => {
          setCategories(response.data.categories);
        })
        .catch((error) => {
          console.error("Error fetching categories:", error);
        });

        } else {
          alert("Category creation failed");
        }
      } catch (error) {
        console.error("Error creating category", error);
        alert("Category creation failed");
      }
    };
     useEffect(() => {
       axios
         .get(`${BASE_URL}/api/categories/viewCategories`)
         .then((response) => {
           setCategories(response.data.categories);
           console.log(response.data.categories);
           setLoading(false);
         })
         .catch((error) => {
           console.error("Error fetching categories:", error);
           setLoading(false);
         });
     }, []);

    


  if (loading) {
    return <div>Loading...</div>;
  }
if (!categories) {
  return <div>Category not found</div>;
}

  return (
    <div className="container">
      <Button onClick={handleShowModal} className="btn btn-primary mb-3">
        Add Category
      </Button>

      <div className="row">
        <h2>Categories ({categories.length})</h2>
      {categories.map((category) => (
        <div className="col-md-4" key={category._id}>
          
          <Card className="m-3"> 
            <Card.Body>
              <Card.Text>{category.name}</Card.Text>
              <Button variant="primary" href={`/category/${category._id}`}>
                View
              </Button>
            </Card.Body>
          </Card>
        </div>
      ))}
    </div>

      {/* add category modal */}
      
      <Modal
       show={showModal} onHide={handleCloseModal}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
      <Modal.Title>Create a Category</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <Form onSubmit={handleSubmit}>
            <Form.Group controlId="categoryName">
              <Form.Label>Category Name:</Form.Label>
              <Form.Control
                type="text"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
              />
            </Form.Group>
          </Form>
      </Modal.Body>
      <Modal.Footer>
      <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Create Category
          </Button>
      </Modal.Footer>
    </Modal>

    </div>
  );
}

export default Categories;