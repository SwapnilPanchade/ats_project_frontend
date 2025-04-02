import React from "react";
import { useAuth } from "../../context/AuthContext";
import OrganizationDashboard from "./OrganizationDashboard";
import RecruiterDashboard from "./RecruiterDashboard";
import CandidateDashboard from "./CandidateDashboard";

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {user.role === "organization" && <OrganizationDashboard />}
      {user.role === "recruiter" && <RecruiterDashboard />}
      {user.role === "candidate" && <CandidateDashboard />}
    </div>
  );
};

export default Dashboard;
