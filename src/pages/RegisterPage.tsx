import React from "react";
import Layout from "../components/Layout/Layout";
import RegisterForm from "../components/Auth/RegisterForm";
import { Link } from "react-router-dom";

const RegisterPage: React.FC = () => {
  return (
    <Layout>
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">
          Create an Account
        </h1>
        <RegisterForm />
        <p className="text-center mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </Layout>
  );
};

export default RegisterPage;
