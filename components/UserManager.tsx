"use client";
import { useState } from "react";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { addUser, updateUser, deleteUser } from "@/store/slices/userSlice";

export default function UserManager() {
  // Form state - this is the object we'll send to Redux
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "user" as "admin" | "user",
  });

  const [editId, setEditId] = useState<number | null>(null);

  // READ: Get users from Redux
  const users = useAppSelector((state) => state.users.items);
  const dispatch = useAppDispatch();

  // CREATE - Add new user
  const handleCreate = () => {
    if (formData.name.trim() && formData.email.trim()) {
      dispatch(
        addUser({
          name: formData.name,
          email: formData.email,
          role: formData.role,
        })
      );
      // Reset form
      setFormData({ name: "", email: "", role: "user" });
    }
  };

  // UPDATE - Update existing user
  const handleUpdate = (id: number) => {
    dispatch(
      updateUser({
        id,
        name: formData.name,
        email: formData.email,
        role: formData.role,
      })
    );
    setEditId(null);
    setFormData({ name: "", email: "", role: "user" });
  };

  // DELETE - Remove user
  const handleDelete = (id: number) => {
    dispatch(deleteUser(id));
  };

  // Load user data into form for editing
  const startEdit = (user: any) => {
    setEditId(user.id);
    setFormData({
      name: user.name,
      email: user.email,
      role: user.role,
    });
  };

  return (
    <div className="py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-cyan-600 mb-8 text-center">
          User Management System
        </h1>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          
          {/* LEFT COLUMN - CREATE/UPDATE FORM */}
          <div className="bg-white rounded-lg p-6 shadow-lg h-fit sticky top-4 self-start">
            <h2 className="text-xl font-bold mb-4 text-gray-800">
              {editId ? "Edit User" : "Add New User"}
            </h2>

            <div className="space-y-4">
              {/* Name Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="Enter..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 text-black"
                />
              </div>

              {/* Email Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="email@example.com"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 text-black"
                />
              </div>

              {/* Role Select */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Role *
                </label>
                <select
                  value={formData.role}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      role: e.target.value as "admin" | "user",
                    })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 text-black"
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 mt-6">
              {editId ? (
                <>
                  <button
                    onClick={() => handleUpdate(editId)}
                    className="flex-1 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
                  >
                    Update User
                  </button>
                  <button
                    onClick={() => {
                      setEditId(null);
                      setFormData({ name: "", email: "", role: "user" });
                    }}
                    className="flex-1 px-6 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition-colors font-medium"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  onClick={handleCreate}
                  className="w-full px-6 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 hover:cursor-pointer transition-colors font-medium"
                >
                  Add User
                </button>
              )}
            </div>
          </div>

          {/* RIGHT COLUMN - Display Users */}
          <div className="space-y-3">
            <div className="bg-white rounded-lg p-4 shadow-md mb-3">
              <h2 className="text-xl font-bold text-gray-800">Users List</h2>
              <p className="text-gray-600 text-sm">
                {users.length === 0 ? "No users yet" : `${users.length} user(s) found`}
              </p>
            </div>

            {users.length === 0 ? (
              <div className="bg-white rounded-lg p-8 text-center shadow-md">
                <p className="text-gray-400 text-lg">
                  No users yet. Add one using the form! 👈
                </p>
              </div>
            ) : (
              users.map((user) => (
                <div
                  key={user.id}
                  className="bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-800 mb-2">
                        {user.name}
                        <span
                          className={`ml-3 px-3 py-1 text-xs rounded-full ${
                            user.role === "admin"
                              ? "bg-red-100 text-red-800"
                              : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {user.role.toUpperCase()}
                        </span>
                      </h3>
                      <p className="text-gray-600">📧 {user.email}</p>
                      <p className="text-gray-400 text-sm mt-1">ID: {user.id}</p>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => startEdit(user)}
                        className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 hover:cursor-pointer transition-colors text-sm"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 hover:cursor-pointer transition-colors text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Stats - Below both columns */}
        {users.length > 0 && (
          <div className="mt-8 bg-white rounded-lg p-4 shadow-md">
            <p className="text-center text-gray-700 font-medium">
              Total Users: <span className="text-cyan-600 font-bold">{users.length}</span> | 
              Admins: <span className="text-red-600 font-bold">{users.filter((u) => u.role === "admin").length}</span> | 
              Regular Users: <span className="text-blue-600 font-bold">{users.filter((u) => u.role === "user").length}</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}