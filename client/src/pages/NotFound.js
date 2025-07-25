import React from 'react'
import Layout from "../components/layout/Layout.js"

function NotFound() {
  return ( 
    <>
    <Layout>
    <div className="d-flex flex-column justify-content-center align-items-center vh-100 bg-light text-center">
      <h1 className="display-1 fw-bold text-danger">404</h1>
      <h3 className="mb-3">Page Not Found</h3>
      <p className="mb-4">Sorry, the page you’re looking for doesn’t exist or has been moved.</p>
      <a href="/" className="btn btn-primary">Go to Home</a>
    </div>
    </Layout>
    </>
   );
}

export default NotFound;