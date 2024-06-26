// providers/FetchProvider.jsx
import React, { createContext, useState, useContext } from "react";
import axios from "axios";

const FetchContext = createContext(null);

export const FetchProvider = ({ children }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async (url) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/dl", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      });
      const result = await response.json();
      if (response.ok) {
        setData(result);
      } else {
        setError(result);
      }
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const clearData = () => {
    setData(null);
  };

  return (
    <FetchContext.Provider
      value={{ data, loading, error, fetchData, clearData }}
    >
      {children}
    </FetchContext.Provider>
  );
};

export const useFetch = () => {
  return useContext(FetchContext);
};
