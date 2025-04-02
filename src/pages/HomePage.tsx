import React from "react";
import Layout from "../components/Layout/Layout";
import { Link } from "react-router-dom";

const HomePage: React.FC = () => {
  return (
    <Layout>
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-6">Welcome to the ATS System</h1>
        <p className="text-xl mb-8">
          An Applicant Tracking System for Organizations, Recruiters, and
          Candidates
        </p>

        <div className="max-w-3xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">For Organizations</h2>
              <p className="mb-4">
                Create and manage recruiter accounts to handle your hiring
                process efficiently.
              </p>
              <Link
                to="/register"
                className="inline-block bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
              >
                Get Started
              </Link>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">For Recruiters</h2>
              <p className="mb-4">
                Access and analyze candidate CVs with AI-powered insights for
                better hiring decisions.
              </p>
              <Link
                to="/login"
                className="inline-block bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
              >
                Get Started
              </Link>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">For Candidates</h2>
              <p className="mb-4">
                Upload your CV and apply to multiple organizations in one place.
              </p>
              <Link
                to="/register"
                className="inline-block bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
