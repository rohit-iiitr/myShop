import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { ToastContainer} from "react-toastify";

function layout(props) {
  return (
    <>
      <Header />
      <main style={{ minHeight: "70vh" }}>
        <ToastContainer/>
        {props.children}
        </main>
      <Footer />
    </>
  );
}

export default layout;
