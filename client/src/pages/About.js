import React from 'react'
import Layout from "../components/layout/Layout.js"

function About() {
  return ( 
    <Layout>
    <div className="container mt-5 py-5">
      <div className="row align-items-center">

        {/* 🔹 Left: Image */}
        <div className="col-md-6 mb-4 mb-md-0">
          <img
            src="https://images.unsplash.com/photo-1542831371-29b0f74f9713" // You can replace with local image
            alt="About MyShop"
            className="img-fluid rounded shadow"
          />
        </div>

        {/* 🔹 Right: Info */}
        <div className="col-md-6">
          <h2 className="mb-3">About MyShop</h2>
          <p>
            Welcome to <strong>myShop</strong> – your one-stop destination for everything you need. Inspired by industry leaders like <strong>Flipkart</strong> and <strong>Amazon</strong>, we bring you an intuitive shopping experience with a wide range of products.
          </p>
          <p>
            Whether you're looking for electronics, fashion, home essentials, or groceries, we've got it all. We focus on <strong>customer satisfaction</strong>, <strong>fast delivery</strong>, and <strong>best prices</strong>. Our goal is to redefine online shopping in India by delivering value right to your doorstep.
          </p>
          <p>
            With secure payments, easy returns, and 24/7 support, shopping with myShop is as smooth as it gets.
          </p>
          <a href="/" className="btn btn-outline-primary mt-3">Explore Products</a>
        </div>

      </div>
    </div>
    </Layout>
   );
}

export default About;