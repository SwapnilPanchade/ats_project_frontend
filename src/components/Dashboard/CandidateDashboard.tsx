import React, { useState, useEffect } from "react";
import { api } from "../../services/api";
import { Organization, CV } from "../../types";

const CandidateDashboard: React.FC = () => {
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [applications, setApplications] = useState<CV[]>([]);
  const [selectedOrganization, setSelectedOrganization] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [uploadSuccess, setUploadSuccess] = useState("");
  const [uploadError, setUploadError] = useState("");

  useEffect(() => {
    fetchOrganizations();
    fetchApplications();
  }, []);

  const fetchOrganizations = async () => {
    try {
      const response = await api.get<Organization[]>("/organizations");
      setOrganizations(response.data);
      if (response.data.length > 0) {
        setSelectedOrganization(response.data[0].id);
      }
      setLoading(false);
    } catch (error) {
      setError("Failed to fetch organizations");
      setLoading(false);
    }
  };

  const fetchApplications = async () => {
    try {
      const response = await api.get<CV[]>("/applications");
      setApplications(response.data);
    } catch (error) {
      setError("Failed to fetch applications");
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploadError("");
    setUploadSuccess("");

    if (!file) {
      setUploadError("Please select a file");
      return;
    }

    const formData = new FormData();
    formData.append("cv", file);
    formData.append("organizationId", selectedOrganization);

    try {
      await api.post("/applications", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setUploadSuccess("CV uploaded successfully");
      setFile(null);

      const fileInput = document.getElementById("cv") as HTMLInputElement;
      if (fileInput) {
        fileInput.value = "";
      }

      fetchApplications();
    } catch (error: any) {
      setUploadError(error.response?.data?.message || "Failed to upload CV");
    }
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case "accepted":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      case "reviewed":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Candidate Dashboard</h2>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h3 className="text-xl font-semibold mb-4">Upload CV</h3>
        {uploadError && (
          <div className="bg-red-100 text-red-700 p-3 mb-4 rounded">
            {uploadError}
          </div>
        )}
        {uploadSuccess && (
          <div className="bg-green-100 text-green-700 p-3 mb-4 rounded">
            {uploadSuccess}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="organization"
              className="block text-gray-700 font-medium mb-2"
            >
              Organization
            </label>
            <select
              id="organization"
              value={selectedOrganization}
              onChange={(e) => setSelectedOrganization(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              {loading ? (
                <option value="">Loading organizations...</option>
              ) : organizations.length === 0 ? (
                <option value="">No organizations available</option>
              ) : (
                organizations.map((org) => (
                  <option key={org.id} value={org.id}>
                    {org.name}
                  </option>
                ))
              )}
            </select>
          </div>
          <div className="mb-4">
            <label
              htmlFor="cv"
              className="block text-gray-700 font-medium mb-2"
            >
              CV (PDF or DOCX)
            </label>
            <input
              type="file"
              id="cv"
              accept=".pdf,.docx"
              onChange={handleFileChange}
              className="w-full"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Upload CV
          </button>
        </form>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-semibold mb-4">Your Applications</h3>
        {loading ? (
          <p>Loading applications...</p>
        ) : error ? (
          <p className="text-red-600">{error}</p>
        ) : applications.length === 0 ? (
          <p>No applications found.</p>
        ) : (
          <div className="space-y-4">
            {applications.map((application) => {
              const organization = organizations.find(
                (org) => org.id === application.organizationId
              );
              return (
                <div key={application.id} className="border rounded-lg p-4">
                  <div className="flex justify-between">
                    <div>
                      <h4 className="font-semibold">{application.filename}</h4>
                      <p className="text-sm text-gray-500">
                        Applied to:{" "}
                        {organization
                          ? organization.name
                          : "Unknown Organization"}
                      </p>
                      <p className="text-sm text-gray-500">
                        Date:{" "}
                        {new Date(application.uploadDate).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${getStatusClass(
                          application.status
                        )}`}
                      >
                        {application.status.charAt(0).toUpperCase() +
                          application.status.slice(1)}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default CandidateDashboard;
