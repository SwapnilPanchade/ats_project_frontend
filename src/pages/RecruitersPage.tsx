import React from "react";
import Layout from "../components/Layout/Layout";
import OrganizationDashboard from "../components/Dashboard/OrganizationDashboard";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const RecruitersPage: React.FC = () => {
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

  if (!user || user.role !== "organization") {
    return <Navigate to="/dashboard" />;
  }

  return (
    <Layout>
      <OrganizationDashboard />
    </Layout>
  );
};

export default RecruitersPage;
