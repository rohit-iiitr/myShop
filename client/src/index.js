import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/Auth";
import { CartProvider } from "./context/cart";
import { SearchProvider } from "./context/search";
import "antd/dist/reset.css";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";


const stripePromise = loadStripe("pk_test_51RmajpGfHoSOLlgVPnXfCw3rksghhF2ikFR7GaQh1lDDqLORZ5GLaYo0Sjjx6s73cHx1BkInqykI4REMHTQeHG2v004adVEt4h");

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Elements stripe={stripePromise}>
  <AuthProvider>
    <SearchProvider>
      <CartProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </CartProvider>
    </SearchProvider>
  </AuthProvider>
  </Elements>
);
