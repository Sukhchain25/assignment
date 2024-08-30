import React, { useState, useEffect } from "react";
import axios from "axios";
import "./LicensePlans.css";

const LicensePlans = () => {
  const [plans, setPlans] = useState([]);
  const [selectedPlanId, setSelectedPlanId] = useState(null);
  const [message, setMessage] = useState("");
  const [buttonText, setButtonText] = useState("Confirm Plan");
  const [countLeft, setCountLeft] = useState(null);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await axios.get("http://localhost:3002/api/licenses/");
        setPlans(response.data);
      } catch (error) {
        setMessage("Failed to fetch license plans.");
      }
    };
    fetchPlans();
  }, []);

  const handleSelectPlan = (id) => {
    setSelectedPlanId(id);
  };

  const handleButtonClick = async () => {
    const token = localStorage.getItem("jwtToken");
    if (!token) {
      setMessage("No token found, please log in.");
      return;
    }

    if (buttonText === "Confirm Plan") {
      try {
        const response = await axios.put(
          "http://localhost:3002/api/users/select-plan",
          { planId: selectedPlanId },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setMessage(response.data.message);
        setButtonText("Test Plan");
      } catch (error) {
        setMessage("Failed to update the plan.");
      }
    } else if (buttonText === "Test Plan") {
      try {
        if (countLeft === 0) {
          setMessage("API count limit exhausted as per the plan");
          return; // Prevent further API calls if the limit is reached
        }

        const response = await axios.get(
          "http://localhost:3002/api/usage/demo-endpoint",
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (response.data.countLeft === 0) {
          setMessage("API count limit exhausted as per the plan");
        } else {
          setMessage(`API Calls Left: ${response.data.countLeft}`);
        }

        setCountLeft(response.data.countLeft);
      } catch (error) {
        console.error("Error:", error.response?.data || error.message);
        setMessage("Failed to test the plan.");
      }
    }
  };

  return (
    <div className="license-plans-container">
      <h2>Select a Plan</h2>
      <div className="cards-container">
        {plans.map((plan) => (
          <div
            key={plan._id}
            className={`card ${selectedPlanId === plan._id ? "selected" : ""}`}
            onClick={() => handleSelectPlan(plan._id)}
          >
            <h3>{plan.name}</h3>
            <p>Max API Calls: {plan.maxApiCalls}</p>
            <p className="price">Price: ${plan.price}</p>
          </div>
        ))}
      </div>
      {selectedPlanId && (
        <button className="select-plan-button" onClick={handleButtonClick}>
          {buttonText}
        </button>
      )}
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default LicensePlans;
