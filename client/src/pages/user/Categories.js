import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useCategory from "../../hooks/useCategory";
import Layout from "../../components/layout/Layout";
const Categories = () => {
  const categories = useCategory();
  return (
    <Layout>
      <div className="container" style={{ marginTop: "150px" }}>
        <div className="row container">
          {categories.map((c) => (
            <div className="col-md-4 mt-5 mb-3 gx-3 gy-3" key={c._id} >
              <div className="card">
                <Link to={`/category/${c.slug}`} className="btn cat-btn">
                  {c.name}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Categories;