import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Message from "../components/Message";
import { Button, Table } from "react-bootstrap";
import { getUserList } from "../actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { deleteUser } from "../actions/userAction";
import { listProducts, deleteProduct } from "../actions/productActions";

const ProductListScreen = () => {

  const dispatch = useDispatch();
  const { products, error, loading } = useSelector((state) => state.productList);
  const { userInfo } = useSelector(state => state.userLogin)
  const navigate = useNavigate()

  const { success } = useSelector(state => state.productDelete)
  useEffect(() => {
    if(userInfo && userInfo.isAdmin) dispatch(listProducts());
    else navigate('/login')
  }, [dispatch, success]);


  const deleteHandler = (id) => {
    dispatch(deleteProduct(id))
  };

  return (
    <div>
      <h1>Products</h1>
      {loading ? (
        "Loading Users"
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>PRICE</th>
              <th>CATEGORY</th>
              <th>BRAND</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.category}</td>
                <td>{product.brand}</td>
               
                <td>
                  <LinkContainer to={`/product/edit/${product._id}`}>
                    <Button variant="light" className="btn-sm">
                      <i className="fas fa-edit"></i>
                    </Button>
                  </LinkContainer>
                  <Button
                    variant="warning"
                    className="btn-sm mx-2"
                    onClick={() => deleteHandler(product._id)}
                  >
                    <i className="fas fa-trash"></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default ProductListScreen;
