import React,{useState} from 'react'
import Layout from "../components/layout/Layout.js"

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = e => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    alert("Form submitted:\n" + JSON.stringify(formData, null, 2));
    // Normally, you'd send formData to a backend or API here
    setFormData({ name: '', email: '', message: '' });
  };
  return ( 
    <Layout>
      <div className="container py-5 mt-5">
      <h2 className="text-center mb-4">Contact Us</h2>
      <div className="row">
        {/* Contact Form */}
        <div className="col-md-6 mb-4">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Name</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Message</label>
              <textarea
                className="form-control"
                name="message"
                rows="4"
                value={formData.message}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary w-100">Send Message</button>
          </form>
        </div>

        {/* Contact Info */}
        <div className="col-md-6 mb-4">
          <h5>Contact Information</h5>
          <p><strong>Email:</strong> support@myshop.com</p>
          <p><strong>Phone:</strong> +91 9876543210</p>
          <p><strong>Address:</strong> Lucknow, UP, India</p>
          <hr />
          <h6>Follow us</h6>
          <p>
            <a href="#" className="text-decoration-none me-2">Facebook</a> |
            <a href="#" className="text-decoration-none mx-2">Instagram</a> |
            <a href="#" className="text-decoration-none">Twitter</a>
          </p>
        </div>
      </div>
    </div>
    </Layout>
   );
}

export default Contact;