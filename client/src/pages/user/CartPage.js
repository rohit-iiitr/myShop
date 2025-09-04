import React, { useState, useEffect } from "react";
import Layout from "../../components/layout/Layout";
import { useCart } from "../../context/cart";
import { useAuth } from "../../context/Auth";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "../../styles/CartStyles.css";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";

const CartPage = () => {
  const [auth] = useAuth();
  const [cart, setCart] = useCart();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const stripe = useStripe();
  const elements = useElements();
  useEffect(() => {
    try {
      const productData = JSON.parse(localStorage.getItem("cart"));
      if (productData) {
        setCart(productData); // or stringify if you truly need a string
      }
    } catch (err) {
      console.error("Invalid cart JSON in localStorage:", err);
      setCart([]); // or setCart("") based on your type
    }
  }, []);

  // total price
  const totalPrice = () => {
    try {
      let total = 0;
      cart?.forEach((item) => {
        total += item.price;
      });
      return total.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
    } catch (error) {
      console.log(error);
    }
  };

  // delete item
  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };

  // handle payments
const handlePayment = async () => {
    // console.log("Cart: ", cart);

    if (!stripe || !elements) {
      toast.error("Stripe not loaded yet.");
      return;
    }

    try {
      setLoading(true);
        console.log("🧾 Sending cart to backend for payment processing...");
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
      const { data } = await axios.post(
        "http://localhost:8080/api/v1/product/payment",
        { cart }
      );

      // console.log("🧾 Response from backend:", data);

      const clientSecret = data.clientSecret;

      if (!clientSecret) {
        console.error("Client secret not received from backend");
        toast.error("Payment setup failed. Try again.");
        return;
      }

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });
      console.log("payment Status :", result.paymentIntent.status === "succeeded");
      // console.log("Payment Result: ", result);
      if (result.error) {
        toast.error(result.error.message);
      }
      else if (result.paymentIntent.status === "succeeded") {
        const { data } = await axios.post("process.env.REACT_APP_API_URL/api/v1/product/paymentConfirm", {
    cart,
    payment: {
      id: result.paymentIntent.id,
      amount: result.paymentIntent.amount,
      success: true, // ✅ explicitly mark success
    },
  });
        localStorage.removeItem("cart");
        setCart([]);
        toast.success("✅ Payment Completed Successfully");
        navigate("/dashboard/user/orders");
      }
    } catch (error) {
      console.error("Payment Error: ", error);
      toast.error("❌ Payment Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="cart-page mt-5">
        <div className="row">
          <div className="col-md-12">
            <h1 className="text-center bg-light p-2 mb-1">
              {!auth?.user ? "Hello Guest" : `Hello ${auth?.user?.name}`}
              <p className="text-center">
                {cart?.length
                  ? `You have ${cart.length} item(s) in your cart`
                  : "Your Cart Is Empty"}
              </p>
            </h1>
          </div>
        </div>

        <div className="container">
          <div className="row">
            <div className="col-md-7 p-0 m-0">
              {cart?.map((p) => (
                <div className="row card flex-row" key={p._id}>
                  <div className="col-md-4">
                    <img
                      src={`${process.env.REACT_APP_API_URL}/api/v1/product/product-photo/${p._id}`}
                      className="card-img-top"
                      alt={p.name}
                      width="100%"
                      height={"130px"}
                    />
                  </div>
                  <div className="col-md-4">
                    <p>{p.name}</p>
                    <p>{p.description.substring(0, 30)}...</p>
                    <p>Price: ${p.price}</p>
                  </div>
                  <div className="col-md-4 cart-remove-btn">
                    <button
                      className="btn btn-danger"
                      onClick={() => removeCartItem(p._id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="col-md-5 cart-summary">
              <h2>Cart Summary</h2>
              <p>Total | Checkout | Payment</p>
              <hr />
              <h4>Total : {totalPrice()}</h4>

              {auth?.user?.address ? (
                <>
                  <div className="mb-3">
                    <h4>Shipping Address</h4>
                    <h5>{auth?.user?.address}</h5>
                    <button
                      className="btn btn-outline-warning"
                      onClick={() => navigate("/dashboard/user/profile")}
                    >
                      Update Address
                    </button>
                  </div>
                </>
              ) : (
                <div className="mb-3">
                  <button
                    className="btn btn-outline-warning"
                    onClick={() =>
                      navigate("/login", {
                        state: "/cart",
                      })
                    }
                  >
                    Please login to checkout
                  </button>
                </div>
              )}

              <div className="mt-3">
                <CardElement />
              </div>

              <div className="mt-2">
                <button
                  className="btn btn-primary mt-3"
                  onClick={handlePayment}
                  disabled={!stripe || !elements ||loading}
                >
                  {loading ? "Processing..." : "Make Payment"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
