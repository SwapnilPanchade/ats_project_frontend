import React, { useState, useEffect } from "react";
import { api } from "../../services/api";
import { CV } from "../../types";
import { websocketService } from "../../services/websocket";
import { useAuth } from "../../context/AuthContext";

const RecruiterDashboard: React.FC = () => {
  const [cvs, setCvs] = useState<CV[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [cvAnalysis, setCvAnalysis] = useState<{ [key: string]: string }>({});
  const [analyzingCvId, setAnalyzingCvId] = useState<string | null>(null);
  const { token } = useAuth();

  useEffect(() => {
    fetchCVs();

    if (token) {
      websocketService.connect(token);

      websocketService.on(
        "cv_analysis_update",
        (data: { cvId: string; chunk: string }) => {
          setCvAnalysis((prev) => ({
            ...prev,
            [data.cvId]: (prev[data.cvId] || "") + data.chunk,
          }));
        }
      );

      websocketService.on("cv_analysis_complete", (data: { cvId: string }) => {
        setAnalyzingCvId(null);
      });
    }

    return () => {
      websocketService.disconnect();
    };
  }, [token]);

  const fetchCVs = async () => {
    try {
      const response = await api.get<CV[]>("/cvs");
      setCvs(response.data);
      setLoading(false);
    } catch (error) {
      setError("Failed to fetch CVs");
      setLoading(false);
    }
  };

  const handleAnalyzeCV = async (cvId: string) => {
    try {
      setAnalyzingCvId(cvId);
      setCvAnalysis((prev) => ({ ...prev, [cvId]: "Analyzing..." }));

      await api.post(`/cvs/${cvId}/analyze`);

      // The actual analysis updates will come through the WebSocket connection
    } catch (error) {
      setCvAnalysis((prev) => ({ ...prev, [cvId]: "Failed to analyze CV" }));
      setAnalyzingCvId(null);
    }
  };

  const handleUpdateStatus = async (
    cvId: string,
    status: "pending" | "reviewed" | "rejected" | "accepted"
  ) => {
    try {
      await api.patch(`/cvs/${cvId}`, { status });

      // Update the local state with the new status
      setCvs(
        cvs.map((cv) => {
          if (cv.id === cvId) {
            return { ...cv, status };
          }
          return cv;
        })
      );
    } catch (error) {
      setError("Failed to update CV status");
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Recruiter Dashboard</h2>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-semibold mb-4">Candidate CVs</h3>
        {loading ? (
          <p>Loading CVs...</p>
        ) : error ? (
          <p className="text-red-600">{error}</p>
        ) : cvs.length === 0 ? (
          <p>No CVs found.</p>
        ) : (
          <div className="space-y-6">
            {cvs.map((cv) => (
              <div key={cv.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="font-semibold">{cv.filename}</h4>
                    <p className="text-sm text-gray-500">
                      Uploaded on {new Date(cv.uploadDate).toLocaleDateString()}
                    </p>
                    <div className="mt-2">
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          cv.status === "accepted"
                            ? "bg-green-100 text-green-800"
                            : cv.status === "rejected"
                            ? "bg-red-100 text-red-800"
                            : cv.status === "reviewed"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {cv.status.charAt(0).toUpperCase() + cv.status.slice(1)}
                      </span>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <a
                      href={`http://localhost:5000/cvs/${cv.id}/download`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-blue-600 text-white py-1 px-3 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    >
                      Download
                    </a>
                    <button
                      onClick={() => handleAnalyzeCV(cv.id)}
                      disabled={analyzingCvId === cv.id}
                      className="bg-purple-600 text-white py-1 px-3 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm disabled:bg-purple-300"
                    >
                      {analyzingCvId === cv.id ? "Analyzing..." : "Analyze"}
                    </button>
                  </div>
                </div>

                {cvAnalysis[cv.id] && (
                  <div className="mt-4">
                    <h5 className="font-medium mb-2">Analysis</h5>
                    <div className="bg-gray-50 p-3 rounded-md">
                      <p className="whitespace-pre-line">{cvAnalysis[cv.id]}</p>
                    </div>
                  </div>
                )}

                <div className="mt-4">
                  <h5 className="font-medium mb-2">Update Status</h5>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleUpdateStatus(cv.id, "pending")}
                      className="bg-gray-300 text-gray-800 py-1 px-2 rounded-md hover:bg-gray-400 text-sm"
                    >
                      Pending
                    </button>
                    <button
                      onClick={() => handleUpdateStatus(cv.id, "reviewed")}
                      className="bg-yellow-300 text-yellow-800 py-1 px-2 rounded-md hover:bg-yellow-400 text-sm"
                    >
                      Reviewed
                    </button>
                    <button
                      onClick={() => handleUpdateStatus(cv.id, "accepted")}
                      className="bg-green-300 text-green-800 py-1 px-2 rounded-md hover:bg-green-400 text-sm"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => handleUpdateStatus(cv.id, "rejected")}
                      className="bg-red-300 text-red-800 py-1 px-2 rounded-md hover:bg-red-400 text-sm"
                    >
                      Reject
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RecruiterDashboard;
