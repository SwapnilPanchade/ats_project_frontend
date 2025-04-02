import React from "react";
import Layout from "../components/Layout/Layout";
import { Link } from "react-router-dom";

const NotFoundPage: React.FC = () => {
  return (
    <Layout>
      <div className="text-center py-16">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-xl mb-6">Page not found</p>
        <Link
          to="/"
          className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
        >
          Go Home
        </Link>
      </div>
    </Layout>
  );
};

export default NotFoundPage;
