import React, { useState, useEffect } from "react";
import { api } from "../../services/api";
import { Recruiter } from "../../types";

const OrganizationDashboard: React.FC = () => {
  const [recruiters, setRecruiters] = useState<Recruiter[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [recruiterName, setRecruiterName] = useState("");
  const [recruiterEmail, setRecruiterEmail] = useState("");
  const [recruiterPassword, setRecruiterPassword] = useState("");
  const [formError, setFormError] = useState("");
  const [formSuccess, setFormSuccess] = useState("");

  useEffect(() => {
    fetchRecruiters();
  }, []);

  const fetchRecruiters = async () => {
    try {
      const response = await api.get<Recruiter[]>("/recruiters");
      setRecruiters(response.data);
      setLoading(false);
    } catch (error) {
      setError("Failed to fetch recruiters");
      setLoading(false);
    }
  };

  const handleCreateRecruiter = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");
    setFormSuccess("");

    try {
      await api.post("/recruiters", {
        name: recruiterName,
        email: recruiterEmail,
        password: recruiterPassword,
      });
      setFormSuccess("Recruiter created successfully");
      setRecruiterName("");
      setRecruiterEmail("");
      setRecruiterPassword("");
      fetchRecruiters();
    } catch (error: any) {
      setFormError(
        error.response?.data?.message || "Failed to create recruiter"
      );
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Organization Dashboard</h2>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h3 className="text-xl font-semibold mb-4">Create Recruiter</h3>
        {formError && (
          <div className="bg-red-100 text-red-700 p-3 mb-4 rounded">
            {formError}
          </div>
        )}
        {formSuccess && (
          <div className="bg-green-100 text-green-700 p-3 mb-4 rounded">
            {formSuccess}
          </div>
        )}
        <form onSubmit={handleCreateRecruiter}>
          <div className="mb-4">
            <label
              htmlFor="recruiterName"
              className="block text-gray-700 font-medium mb-2"
            >
              Name
            </label>
            <input
              type="text"
              id="recruiterName"
              value={recruiterName}
              onChange={(e) => setRecruiterName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="recruiterEmail"
              className="block text-gray-700 font-medium mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="recruiterEmail"
              value={recruiterEmail}
              onChange={(e) => setRecruiterEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="recruiterPassword"
              className="block text-gray-700 font-medium mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="recruiterPassword"
              value={recruiterPassword}
              onChange={(e) => setRecruiterPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              minLength={6}
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Create Recruiter
          </button>
        </form>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-semibold mb-4">Your Recruiters</h3>
        {loading ? (
          <p>Loading recruiters...</p>
        ) : error ? (
          <p className="text-red-600">{error}</p>
        ) : recruiters.length === 0 ? (
          <p>No recruiters found.</p>
        ) : (
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="text-left py-2">Name</th>
                <th className="text-left py-2">Email</th>
              </tr>
            </thead>
            <tbody>
              {recruiters.map((recruiter) => (
                <tr key={recruiter.id}>
                  <td className="py-2">{recruiter.name}</td>
                  <td className="py-2">{recruiter.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default OrganizationDashboard;
