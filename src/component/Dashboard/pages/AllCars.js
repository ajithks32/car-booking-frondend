import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AllCars.css"; // Import CSS file

const AllCars = () => {
  const [taxis, setTaxis] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/taxis")
      .then((response) => setTaxis(response.data))
      .catch((error) => console.error("Error fetching taxis:", error));
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this taxi?")) {
      try {
        await axios.delete(`http://localhost:5000/taxis/${id}`);
        setTaxis(taxis.filter((taxi) => taxi._id !== id));
      } catch (error) {
        console.error("Error deleting taxi:", error);
      }
    }
  };

  return (
    <div className="taxi-container">
      <h2 className="taxi-title">Available Taxis</h2>
      <div className="taxi-grid">
        {taxis.map((taxi) => (
          <div className="taxi-card" key={taxi._id}>
            <img src={`http://localhost:5000${taxi.image}`} className="taxi-img" alt={taxi.model} />
            <div className="taxi-info">
              <div className="taxi-header">
                <h5>{taxi.model}</h5>
                {taxi.icon && (
                  <img src={`http://localhost:5000${taxi.icon}`} className="taxi-icon" alt="Taxi Icon" />
                )}
              </div>
              <p>🚗 Gear: {taxi.gear}</p>
              <p>👥 Capacity: {taxi.capacity}</p>
              <p>⛽ Fuel: {taxi.fuel}</p>
              <p>💰 Price (8hr): ₹{taxi.price8hr}</p>
              <p>💰 Price (24hr): ₹{taxi.price24hr}</p>
              <button className="delete-btn" onClick={() => handleDelete(taxi._id)}>❌ Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllCars;
