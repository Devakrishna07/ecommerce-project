import { useState } from "react";
import "../styles/payment.css";

const Payment = () => {
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Payment Submitted Successfully!");
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-4 mb-3">
          <div className="card p-3">
            <div className="img-box">
              <img src="/visa.png" alt="Visa" />
            </div>
            <div className="number">
              <label className="fw-bold">**** **** **** 1060</label>
            </div>
            <div className="d-flex justify-content-between">
              <small><span className="fw-bold">Expiry:</span> 10/26</small>
              <small><span className="fw-bold">Name:</span> Kumar</small>
            </div>
          </div>
        </div>

        <div className="col-12 mt-4">
          <div className="card p-3">
            <h4 className="mb-3">Payment Methods</h4>
            <div className="form-container">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Card Number</label>
                  <input type="text" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} required />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Expiry</label>
                    <input type="text" value={expiry} onChange={(e) => setExpiry(e.target.value)} required />
                  </div>
                  <div className="form-group">
                    <label>CVV</label>
                    <input type="password" value={cvv} onChange={(e) => setCvv(e.target.value)} required />
                  </div>
                </div>
                <div className="form-group">
                  <label>Name on Card</label>
                  <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <button type="submit" className="btn btn-primary w-100">Submit Payment</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
