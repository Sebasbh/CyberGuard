import React, { useState, useEffect } from "react";
import FooterUser from "../components/footer/FooterUser";
import HeaderUser from "../components/header/HeaderUser";
import { createUser, getUserById, updateUser, deleteUser, getUsers, setAuthToken } from "../context/Api.js";
import { Link } from "react-router-dom";

function HomeAdmin() {
  const [users, setUsers] = useState([]);
  const [userForm, setUserForm] = useState({
    username: "",
    password: "",
    email: "",
    name: "",
    role: "user",
  });

  const [selectedUserId, setSelectedUserId] = useState(null);

  const fetchUsers = async () => {
    const tokenFromlocalStorage = localStorage.getItem('token');
    setAuthToken(tokenFromlocalStorage);
    try {
      const userList = await getUsers();
      setUsers(userList);
    } catch (error) {
      alert("Error fetching users");
    }
  };

  const handleCreateUser = async () => {
    try {
      const newUser = await createUser(userForm);
      setUsers([...users, newUser]);
      setUserForm({
        username: "",
        password: "",
        email: "",
        name: "",
        role: "user",
      });
    } catch (error) {
      alert("Error creating user");
    }
  };

  const handleEditUser = async (userId) => {
    try {
      const selectedUser = await getUserById(userId);
      setUserForm(selectedUser);
      setSelectedUserId(userId);
    } catch (error) {
      alert("Error fetching user for edit")
    }
  };

  const handleUpdateUser = async () => {
    try {
      const updatedUser = await updateUser(selectedUserId, userForm);
      const updatedUsersList = users.map((user) =>
        user._id === selectedUserId ? updatedUser : user
      );
      setUsers(updatedUsersList);
      setSelectedUserId(null);
      setUserForm({
        username: "",
        password: "",
        email: "",
        name: "",
        role: "user",
      });
    } catch (error) {
      alert("Error updating user");
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      await deleteUser(userId);
      const updatedUsersList = users.filter((user) => user._id !== userId);
      setUsers(updatedUsersList);
    } catch (error) {
      alert("Error deleting user");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="home-admin" >
      <HeaderUser />
      <div className="container mt-5" style={{ minHeight: "79vh" }}>
      <Link to="/listformsadmin">forms</Link>
        <div className="row">
          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <h2 className="card-title">User List</h2>
                <ul className="list-group">
                  {users.map((user) => (
                    <li key={user._id} className="list-group-item d-flex justify-content-between align-items-center">
                      <div>
                        {user.username} ({user.email})
                      </div>
                      <div>
                        <button
                          onClick={() => handleEditUser(user._id)}
                          className="btn btn-sm btn-primary mr-2"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteUser(user._id)}
                          className="btn btn-sm btn-danger"
                        >
                          Delete
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <h2 className="card-title">
                  {selectedUserId ? "Edit User" : "Create User"}
                </h2>
                <form>
                  <div className="form-group">
                    <input
                      type="text"
                      placeholder="Username"
                      className="form-control"
                      value={userForm.username}
                      onChange={(e) =>
                        setUserForm({ ...userForm, username: e.target.value })
                      }
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="password"
                      placeholder="Password"
                      className="form-control"
                      value={userForm.password}
                      onChange={(e) =>
                        setUserForm({ ...userForm, password: e.target.value })
                      }
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      placeholder="Email"
                      className="form-control"
                      value={userForm.email}
                      onChange={(e) =>
                        setUserForm({ ...userForm, email: e.target.value })
                      }
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      placeholder="Name"
                      className="form-control"
                      value={userForm.name}
                      onChange={(e) =>
                        setUserForm({ ...userForm, name: e.target.value })
                      }
                    />
                  </div>
                  <button
                    type="button"
                    className={selectedUserId ? "btn btn-warning" : "btn btn-success"}
                    onClick={selectedUserId ? handleUpdateUser : handleCreateUser}
                  >
                    {selectedUserId ? "Update User" : "Create User"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <FooterUser />
    </div>
  );
}

export default HomeAdmin;
