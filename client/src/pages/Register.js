import React, { useState } from "react";
import Layout from "../components/layout/Layout.js";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/AuthStyle.css";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [question, setQuestion] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/v1/auth/register`,
        {
          name,
          password,
          email,
          phone,
          address,
          question,
        }
      );

      if (res && res.status === 201) {
        toast.success("Registration successful");
        setTimeout(() => {
          navigate("/login");
        }, 2500);
      } else {
        toast.error("Already registered, please login");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout>
      <div className="form-container mt-5" style={{ minHeight: "70vh" }}>
        <h1 className="mb-4 pb-3">New User! Register</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              className="form-control "
              id="exampleInputName"
              style={{ width: "400px" }}
              placeholder="Enter your name"
              required
              autoFocus
            />
          </div>
          <div className="mb-3">
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="Email"
              className="form-control"
              id="exampleInputEmail"
              style={{ width: "400px" }}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-3">
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="form-control"
              id="exampleInputPassword"
              style={{ width: "400px" }}
              placeholder="Enter your password"
              required
            />
          </div>
          <div className="mb-3">
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              type="text"
              className="form-control"
              id="exampleInputPhone"
              style={{ width: "400px" }}
              placeholder="Enter your phone no."
              required
            />
          </div>
          <div className="mb-3">
            <input
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              type="text"
              className="form-control"
              id="exampleInputAddress"
              style={{ width: "400px" }}
              placeholder="Enter your address"
              required
            />
          </div>
          <div className="mb-3">
            <input
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              type="text"
              className="form-control"
              id="exampleInputquestion"
              style={{ width: "400px" }}
              placeholder="What is you favourite sport"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </Layout>
  );
}

export default Register;
