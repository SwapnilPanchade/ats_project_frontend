import React from "react";
import Layout from "../components/Layout/Layout";
import LoginForm from "../components/Auth/LoginForm";
import { Link } from "react-router-dom";

const LoginPage: React.FC = () => {
  return (
    <Layout>
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Login to ATS</h1>
        <LoginForm />
        <p className="text-center mt-4">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-600 hover:underline">
            Register here
          </Link>
        </p>
      </div>
    </Layout>
  );
};

export default LoginPage;
