import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Message from "../components/Message";
import { Button, Table } from "react-bootstrap";
import { getUserList } from "../actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { deleteUser } from "../actions/userAction";

const UserListScreen = () => {
  const dispatch = useDispatch();
  const { users, error, loading } = useSelector((state) => state.userList);
  const { userInfo } = useSelector(state => state.userLogin)
  const navigate = useNavigate()

  const { success } = useSelector(state => state.userDelete)


  useEffect(() => {
    if(userInfo && userInfo.isAdmin) dispatch(getUserList());
    else navigate('/login')
  }, [dispatch, success]);


  const deleteHandler = (id) => {
    dispatch(deleteUser(id))
  };

  return (
    <div>
      <h1>Users</h1>
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
              <th>EMAIL</th>
              <th>ADMIN</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  {user.isAdmin ? (
                    <i className="fas fa-check" />
                  ) : (
                    <i className="fas fa-times" />
                  )}
                </td>
                <td>
                  <LinkContainer to={`/user/edit/${user._id}`}>
                    <Button variant="light" className="btn-sm">
                      <i className="fas fa-edit"></i>
                    </Button>
                  </LinkContainer>
                  <Button
                    variant="warning"
                    className="btn-sm mx-2"
                    onClick={() => deleteHandler(user._id)}
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

export default UserListScreen;
