import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "../../config/axios";

// MUI
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import "./Admin.css";

export default function AdminHome() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const userInfo = useSelector((state) => state.user.userInfo.data);

  const filteredUsers = userInfo.users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const deleteUser = async (userId) => {
    try {
      const response = await axios.put(`/api/admin/change-user-status/${userId}`);
      alert(response.data.message);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <div className="table-wrapper">
        <div className="table-title">
          <div className="row">
            <div className="col-sm-8">
              <h4>
                User <b>Details</b>
              </h4>
              <input
                type="text"
                placeholder="Search users"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="col-sm-4">
              <Link to={"/add/user"} className="btn btn-info add-new">
                <i className="fa fa-plus"></i> Add New+
              </Link>
            </div>
          </div>
        </div>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>
                  <Link
                    to={`/admin/edit/user/${user._id}`}
                    className="edit"
                    title="Edit"
                    data-toggle="tooltip"
                  >
                    <EditIcon />
                  </Link>
                  <a
                    className="delete"
                    title="Delete"
                    data-toggle="tooltip"
                    onClick={() => deleteUser(user._id)}
                  >
                    <DeleteIcon />
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
