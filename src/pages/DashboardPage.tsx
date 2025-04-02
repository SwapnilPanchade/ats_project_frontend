import React from "react";
import Layout from "../components/Layout/Layout";
import Dashboard from "../components/Dashboard/Dashboard";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const DashboardPage: React.FC = () => {
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

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <Layout>
      <Dashboard />
    </Layout>
  );
};

export default DashboardPage;
