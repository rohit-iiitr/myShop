import React from "react";

const Footer = () => {
  return (
    <footer className="bg-dark text-white pt-4 pb-3 mt-5">
      <div className="container">
        {/* 🔹 Row 2: 2 Columns - Links and Contact */}
        <div className="row">
          {/* Useful Links */}
          <div className="footer text-center  mb-3">
            <a href="/about" className="text-white text-decoration-none p-3">
              About
            </a>|
            <a href="/policy" className="text-white text-decoration-none p-3">
              Privacy & Policy
            </a>|
            <a href="/contact" className="text-white text-decoration-none p-3">
              Contact
            </a>
          </div>
        </div>

        <hr className="border-top border-secondary" />

        {/* Copyright */}
        <div className="text-center">
          <p className="mb-0">
            &copy; {new Date().getFullYear()} MyShop. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
