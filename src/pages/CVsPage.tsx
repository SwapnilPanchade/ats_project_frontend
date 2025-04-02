import React from "react";
import Layout from "../components/Layout/Layout";
import RecruiterDashboard from "../components/Dashboard/RecruiterDashboard";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const CVsPage: React.FC = () => {
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

  if (!user || user.role !== "recruiter") {
    return <Navigate to="/dashboard" />;
  }

  return (
    <Layout>
      <RecruiterDashboard />
    </Layout>
  );
};

export default CVsPage;
