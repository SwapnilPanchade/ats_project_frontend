import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { api } from "../../services/api";

const Profile: React.FC = () => {
  const { user } = useAuth();
  const [name, setName] = useState(user?.name || "");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [updateSuccess, setUpdateSuccess] = useState("");
  const [updateError, setUpdateError] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState("");
  const [passwordError, setPasswordError] = useState("");

  if (!user) {
    return <div>Loading...</div>;
  }

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setUpdateSuccess("");
    setUpdateError("");

    try {
      await api.patch("/users/profile", { name });
      setUpdateSuccess("Profile updated successfully");
    } catch (error: any) {
      setUpdateError(
        error.response?.data?.message || "Failed to update profile"
      );
    }
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordSuccess("");
    setPasswordError("");

    if (newPassword !== confirmNewPassword) {
      setPasswordError("New passwords do not match");
      return;
    }

    try {
      await api.patch("/users/password", {
        currentPassword,
        newPassword,
      });
      setPasswordSuccess("Password updated successfully");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
    } catch (error: any) {
      setPasswordError(
        error.response?.data?.message || "Failed to update password"
      );
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Your Profile</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold mb-4">Profile Information</h3>
          {updateSuccess && (
            <div className="bg-green-100 text-green-700 p-3 mb-4 rounded">
              {updateSuccess}
            </div>
          )}
          {updateError && (
            <div className="bg-red-100 text-red-700 p-3 mb-4 rounded">
              {updateError}
            </div>
          )}
          <form onSubmit={handleUpdateProfile}>
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-gray-700 font-medium mb-2"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-700 font-medium mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={user.email}
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
                disabled
              />
              <p className="text-sm text-gray-500 mt-1">
                Email cannot be changed
              </p>
            </div>
            <div className="mb-4">
              <label
                htmlFor="role"
                className="block text-gray-700 font-medium mb-2"
              >
                Role
              </label>
              <input
                type="text"
                id="role"
                value={user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
                disabled
              />
            </div>
            <button
              type="submit"
              className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Update Profile
            </button>
          </form>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold mb-4">Change Password</h3>
          {passwordSuccess && (
            <div className="bg-green-100 text-green-700 p-3 mb-4 rounded">
              {passwordSuccess}
            </div>
          )}
          {passwordError && (
            <div className="bg-red-100 text-red-700 p-3 mb-4 rounded">
              {passwordError}
            </div>
          )}
          <form onSubmit={handleUpdatePassword}>
            <div className="mb-4">
              <label
                htmlFor="currentPassword"
                className="block text-gray-700 font-medium mb-2"
              >
                Current Password
              </label>
              <input
                type="password"
                id="currentPassword"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="newPassword"
                className="block text-gray-700 font-medium mb-2"
              >
                New Password
              </label>
              <input
                type="password"
                id="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                minLength={6}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="confirmNewPassword"
                className="block text-gray-700 font-medium mb-2"
              >
                Confirm New Password
              </label>
              <input
                type="password"
                id="confirmNewPassword"
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Update Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
