import React, { useState } from "react";
import Layout from "../components/layout/Layout.js";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/AuthStyle.css";
import { useAuth } from "../context/Auth.js";
import ForgetPassword from "./user/ForgetPassword.js";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/v1/auth/login`,
        {
          password,
          email,
        }
      );

      if (res && res.status === 200) {
        toast.success(res.data.message);
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        setTimeout(() => {
          navigate(location.state ||"/");
        }, 2000);
      } else {
        toast.error(res.data.message || "Login failed");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout>
      <div className="form-container mt-3" style={{ minHeight: "70vh" }}>
        <h1 className="mb-4 pb-3">Login</h1>
        <form onSubmit={handleSubmit}>
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
              // autoFocus
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
          
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
          <div className="mt-3">
            <button  type="button" onClick={()=>{navigate("/forgot-password")}} className="btn btn-primary">
            Forget Password
          </button>
          </div>
        </form>
      </div>
    </Layout>
  );
}

export default Login;
