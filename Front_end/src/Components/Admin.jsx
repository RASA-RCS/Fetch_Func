import React, { useEffect, useState } from "react";

const API_KEY = "EVQYITSKKJY8DUYDLH0X805YDLH0X"; // Replace with your MetalPriceAPI key
const API_URL = `https://api.metalpriceapi.com/v1/latest?api_key=${API_KEY}&base=USD&currencies=XAU,XAG`;

export default function Admin() {
  const [gold, setGold] = useState(null);
  const [silver, setSilver] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchPrices = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();

      if (data && data.rates) {
        setGold(data.rates.XAU); // gold price
        setSilver(data.rates.XAG); // silver price
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching metal prices:", error);
    }
  };

  useEffect(() => {
    fetchPrices(); // Initial load

    const interval = setInterval(() => {
      fetchPrices();
    }, 5000); // Refresh every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Live Gold & Silver Price</h1>

      {loading ? (
        <p style={styles.loading}>Loading data…</p>
      ) : (
        <div style={styles.card}>
          <p style={styles.price}>
            <strong>Gold (XAU):</strong> ${gold}
          </p>
          <p style={styles.price}>
            <strong>Silver (XAG):</strong> ${silver}
          </p>
        </div>
      )}

      <p style={styles.refresh}>Auto-refresh every 5 seconds</p>
    </div>
  );
}

const styles = {
  container: {
    padding: "30px",
    textAlign: "center",
    fontFamily: "Arial",
  },
  title: {
    fontSize: "28px",
    marginBottom: "20px",
  },
  loading: {
    fontSize: "20px",
    color: "#555",
  },
  card: {
    background: "#f5f5f5",
    padding: "20px",
    borderRadius: "10px",
    width: "350px",
    margin: "auto",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  },
  price: {
    fontSize: "22px",
    margin: "10px 0",
  },
  refresh: {
    marginTop: "10px",
    fontSize: "14px",
    color: "gray",
  },
};
