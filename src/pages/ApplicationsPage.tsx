import React from "react";
import Layout from "../components/Layout/Layout";
import CandidateDashboard from "../components/Dashboard/CandidateDashboard";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const ApplicationsPage: React.FC = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-64">
          <p className="text-lg">Loading...</p>
        </div>
      </Layout>
    );
  }

  if (!user || user.role !== "candidate") {
    return <Navigate to="/dashboard" />;
  }

  return (
    <Layout>
      <CandidateDashboard />
    </Layout>
  );
};

export default ApplicationsPage;
