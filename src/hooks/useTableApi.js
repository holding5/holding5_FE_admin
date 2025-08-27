// src/hooks/useTableApi.js
import { useEffect, useState } from "react";
import axios from "../utils/axiosInstance"; // axios 인스턴스

const useTableApi = ({ url, initialParams = {} }) => {
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [params, setParams] = useState(initialParams);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        const res = await axios.get(url, { params });
        setData(res.data.content || []);
        setTotal(res.data.totalElements || 0);
      } catch (err) {
        setError(err);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url, JSON.stringify(params)]);

  return {
    data,
    total,
    loading,
    error,
    params,
    setParams,
  };
};

export default useTableApi;
